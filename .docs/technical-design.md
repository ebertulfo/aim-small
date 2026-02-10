# Aim Small Technical Design (v1)

> **Purpose**: Translate the `Aim Small` PRD into concrete technical decisions, schemas, and state machines. This document is implementation-focused and opinionated.

---

## 1. Architectural stance

### 1.1 Principles
- **Local-first**: app must fully function offline
- **Deterministic state**: day-based logic must be explicit and testable
- **Opinionated flows**: guardrails enforced in code, not copy
- **No premature abstraction**: single-user, single-device

### 1.2 Platform
- iOS only (v1)
- Expo (React Native)
- Managed workflow + dev build

---

## 2. Core data model (SQLite)

### 2.1 Tables

#### goals
- id TEXT PRIMARY KEY
- title TEXT NOT NULL
- why TEXT
- status TEXT CHECK(status IN ('ACTIVE','PAUSED','COMPLETED')) NOT NULL
- is_pinned INTEGER DEFAULT 0
- last_focused_at TEXT
- created_at TEXT NOT NULL
- updated_at TEXT NOT NULL

Constraint:
- At most **3 goals** where status = 'ACTIVE' (enforced at application layer)

---

#### habits
- id TEXT PRIMARY KEY
- title TEXT NOT NULL
- schedule_type TEXT CHECK(schedule_type IN ('DAILY','WEEKDAYS','CUSTOM')) NOT NULL
- schedule_days TEXT            -- e.g. bitmask or JSON array
- status TEXT CHECK(status IN ('ACTIVE','PAUSED')) NOT NULL
- created_at TEXT NOT NULL
- updated_at TEXT NOT NULL

---

#### tasks
- id TEXT PRIMARY KEY
- title TEXT NOT NULL
- due_date TEXT NOT NULL         -- YYYY-MM-DD
- linked_goal_id TEXT
- is_focus_task INTEGER DEFAULT 0
- planned_source TEXT CHECK(planned_source IN ('EVENING','MORNING','MANUAL'))
- is_done INTEGER DEFAULT 0
- created_at TEXT NOT NULL
- updated_at TEXT NOT NULL

Indexes:
- idx_tasks_due_date
- idx_tasks_focus_due_date (due_date, is_focus_task)

---

#### daily_plans
- date TEXT PRIMARY KEY           -- YYYY-MM-DD
- focus_goal_id TEXT
- closed_status TEXT CHECK(closed_status IN ('OPEN','CLOSED','SKIPPED_CLOSE')) DEFAULT 'OPEN'
- closed_at TEXT
- note TEXT

---

#### habit_logs
- id TEXT PRIMARY KEY
- habit_id TEXT NOT NULL
- date TEXT NOT NULL              -- YYYY-MM-DD
- status TEXT CHECK(status IN ('DONE','MISSED')) NOT NULL

Unique constraint:
- (habit_id, date)

---

## 3. Day + time handling

### 3.1 Day keys
- All logic uses explicit `YYYY-MM-DD` keys in **local timezone**
- No implicit Date comparisons

### 3.2 Evening window
Default:
- start: 19:00
- end: 02:00 (cross-midnight)

Rules:
- If now ∈ [00:00, end), closing applies to **yesterday**
- Else closing applies to **today**

Helper functions:
- `isInEveningWindow(now)`
- `getEffectiveCloseDate(now)`

---

## 4. Global gatekeeper logic

### 4.1 Gate evaluation order
On app start / resume:
1. Compute `todayKey`
2. Compute `closeDateKey = getEffectiveCloseDate(now)`
3. Load `daily_plans[closeDateKey]`
4. If `isInEveningWindow(now)` AND `closed_status == 'OPEN'`
   → route to CloseDay (hard gate)
5. Else allow normal navigation

### 4.2 Morning fallback check
- If no focus tasks exist for `todayKey`
  → surface Quick Plan entry (not a gate)

---

## 5. Close Day flow (hard gate)

### 5.1 CloseDay.GATED(date)
- Build recap from:
  - focus_goal_id
  - tasks where due_date = date AND is_focus_task = 1
  - habit_logs for date

### 5.2 CloseDay.LOG_AND_CLOSE
- Upsert habit_logs
- Save optional note
- Set:
  - closed_status = 'CLOSED'
  - closed_at = now

Transition → PlanTomorrow

### 5.3 CloseDay.SKIP_CLOSE
- closed_status = 'SKIPPED_CLOSE'
- closed_at = now

Transition → PlanTomorrow

---

## 6. Plan Tomorrow flow

### 6.1 PlanTomorrow.GATED(targetDate)
- Load active goals (≤3)
- Preselect:
  - last focused active goal
  - else carry-forward today’s focus if still active

Rules:
- exactly 1 goal
- 1–3 tasks

### 6.2 PlanTomorrow.COMMIT
- Upsert daily_plans[targetDate].focus_goal_id
- Insert tasks:
  - due_date = targetDate
  - is_focus_task = 1
  - planned_source = 'EVENING'

---

## 7. Morning Quick Plan

### Condition
- No tasks where due_date = todayKey AND is_focus_task = 1

### Flow
- Preselect last focused goal
- Create 1–3 tasks for today
- planned_source = 'MORNING'

---

## 8. Notification responsibilities

- expo-notifications (local only)
- Two repeating schedules:
  - Morning: execution reminder
  - Evening: close + plan reminder

- Store notification IDs locally
- On time change: cancel + reschedule

---

## 9. Non-goals (explicit)
- No sync
- No analytics
- No AI suggestions
- No background processing

---

## 10. Why this separation matters

- PRD answers **"why" and "what"**
- This doc answers **"how" and "with what constraints"**
- Enables future AI agents or collaborators to work without polluting product intent

