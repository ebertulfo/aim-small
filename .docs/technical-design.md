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
- **Storage Strategy**: Interface-based (Repository Pattern).
  - Implementation: `AsyncStorage` (or simple JSON file) for v1 MVP/Web testing.
  - Future-proof: Easy swap to `expo-sqlite` or Cloud.

---

## 2. Core Concepts (from Product Logic)

### 2.1 Day & Focus
- **Day**: identified by local date key `YYYY-MM-DD`. No implicit Date object comparisons.
- **Focus**: Each day has exactly **one focus goal** and **1–3 focus tasks**. These are the only tasks shown on the Today screen.

### 2.2 Rituals
The system rewards **showing up to the ritual**, not performance.
1. **Close the day** (evening)
2. **Plan** (tomorrow or fallback)

---

## 3. Data Model (TypeScript Interfaces)

Since we are prioritizing web-testability and simplicity (v1), we will use **TypeScript Interfaces** as our source of truth, backed by a replaceable storage layer.

### 3.1 Core Types

```typescript
type Goal = {
  id: string;
  title: string;
  why?: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  isPinned: boolean;
  lastFocusedAt?: string; // ISO Date String
  createdAt: string;
  updatedAt: string;
}

type Habit = {
  id: string;
  title: string;
  scheduleType: 'DAILY' | 'WEEKDAYS' | 'CUSTOM';
  scheduleDays: number[]; // e.g. [1, 3, 5] for Mon, Wed, Fri
  status: 'ACTIVE' | 'PAUSED';
  createdAt: string;
  updatedAt: string;
}

type Task = {
  id: string;
  title: string;
  dueDate: string; // YYYY-MM-DD
  linkedGoalId?: string;
  isFocusTask: boolean;
  plannedSource: 'EVENING' | 'MORNING' | 'MANUAL';
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

type DailyPlan = {
  date: string; // YYYY-MM-DD
  focusGoalId?: string;
  closedStatus: 'OPEN' | 'CLOSED' | 'SKIPPED_CLOSE';
  closedAt?: string;
  note?: string;
}

type HabitLog = {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  status: 'DONE' | 'MISSED';
}
```

### 3.2 Storage Interface (Repository)

To support future migration (to SQLite or Cloud), all data access must go through this interface:

```typescript
interface DataStore {
  // Goals
  getActiveGoals(): Promise<Goal[]>;
  getGoal(id: string): Promise<Goal | null>;
  saveGoal(goal: Goal): Promise<void>;

  // Tasks
  getTasksForDate(date: string): Promise<Task[]>;
  saveTask(task: Task): Promise<void>;

  // Daily Plan
  getPlan(date: string): Promise<DailyPlan | null>;
  savePlan(plan: DailyPlan): Promise<void>;

  // Habits
  getHabits(): Promise<Habit[]>;
  getHabitLogs(date: string): Promise<HabitLog[]>;
  logHabit(log: HabitLog): Promise<void>;
}
```
**v1 Implementation**: A simple class wrapping `AsyncStorage` that serializes these objects to JSON strings.

---

## 4. Day + time handling

### 4.1 Day keys
- All logic uses explicit `YYYY-MM-DD` keys in **local timezone**
- No implicit Date comparisons

### 4.2 Evening window
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

## 5. Global gatekeeper logic

### 5.1 Gate evaluation order
On app start / resume:
1. Compute `todayKey`
2. Compute `closeDateKey = getEffectiveCloseDate(now)`
3. Load `daily_plans[closeDateKey]`
4. If `isInEveningWindow(now)` AND `closed_status == 'OPEN'`
   → route to CloseDay (hard gate)
5. Else allow normal navigation

### 5.2 Morning fallback check
- If no focus tasks exist for `todayKey`
  → surface Quick Plan entry (not a gate)

---

## 6. Close Day flow (hard gate)

### 6.1 CloseDay.GATED(date)
- Build recap from:
  - focus_goal_id
  - tasks where due_date = date AND is_focus_task = 1
  - habit_logs for date

### 6.2 CloseDay.LOG_AND_CLOSE
- Upsert habit_logs
- Save optional note
- Set:
  - closed_status = 'CLOSED'
  - closed_at = now

Transition → PlanTomorrow

### 6.3 CloseDay.SKIP_CLOSE
- closed_status = 'SKIPPED_CLOSE'
- closed_at = now

Transition → PlanTomorrow

---

## 7. Plan Tomorrow flow

### 7.1 PlanTomorrow.GATED(targetDate)
- Load active goals (≤3)
- Preselect:
  - last focused active goal
  - else carry-forward today’s focus if still active

Rules:
- exactly 1 goal
- 1–3 tasks

### 7.2 PlanTomorrow.COMMIT
- Upsert daily_plans[targetDate].focus_goal_id
- Insert tasks:
  - due_date = targetDate
  - is_focus_task = 1
  - planned_source = 'EVENING'

---

## 8. Morning Quick Plan

### Condition
- No tasks where due_date = todayKey AND is_focus_task = 1

### Flow
- Preselect last focused goal
- Create 1–3 tasks for today
- planned_source = 'MORNING'

---

## 9. Notification responsibilities

- expo-notifications (local only)
- Two repeating schedules:
  - Morning: execution reminder
  - Evening: close + plan reminder

- Store notification IDs locally
- On time change: cancel + reschedule

---

## 10. Planning Streak Logic

A **planning streak** measures consecutive days where the user **engaged with planning**, not task completion.

- **Streak increments**: If the day has at least one focus task.
- **Streak breaks**: If no focus tasks exist for that day.
- **Properties**:
  - Streak starts at 1.
  - Derived from `tasks` table (count of consecutive days with `is_focus_task=1`).
  - Skipping Close Day does **not** break streak if planning occurs.

---

## 11. Definition of Success (v1)

The app is successful if:
- A user can miss days without quitting.
- A user can return after absence without friction.
- Planning becomes habitual, not forced.

---

## 12. Non-goals (explicit)
- No sync
- No analytics
- No AI suggestions
- No background processing

---

## 13. Why this separation matters

- PRD answers **"why" and "what"**
- This doc answers **"how" and "with what constraints"**
- Enables future AI agents or collaborators to work without polluting product intent
