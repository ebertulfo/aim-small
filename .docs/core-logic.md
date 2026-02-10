# Aim Small Core Logic (v1)

> **Purpose**: Define **what must be built** and the invariant logic rules. This spec is the source of truth for system behavior, state transitions, and data integrity.

---

## 1. Scope & intent

This spec covers **core logic only**:
- Time handling
- Daily lifecycle (morning → day → evening)
- Planning, closing, fallback behavior
- Streak computation
- Data contracts and invariants

Out of scope:
- UI layout details
- Animations
- Cloud sync
- AI features (planned for future phase)

---

## 2. Core concepts

### 2.1 Day
- A **day** is identified by a local date key: `YYYY-MM-DD`
- All logic operates on explicit day keys, never implicit Date comparisons

### 2.2 Focus
- Each day may have **exactly one focus goal**
- Each day may have **1–3 focus tasks**
- Focus tasks are the only tasks shown on the Today screen

### 2.3 Rituals
There are two core rituals:
1. **Close the day** (evening)
2. **Plan** (for tomorrow or as a fallback for today)

The system is designed to reward **showing up to the ritual**, not performance.

---

## 3. Time rules

### 3.1 Configurable times (user-defined)
- `eveningStartTime` (default 21:00)
- `cutoffTime` (one of: 00:00, 01:00, 02:00; default 02:00)
- `morningReminderTime` (default 09:00)

### 3.2 Evening window
- Evening window starts at `eveningStartTime`
- Evening window ends at `cutoffTime`
- Window may cross midnight

### 3.3 Effective close date
When inside the evening window:
- If current time < cutoffTime → close **yesterday**
- Else → close **today**

After cutoffTime, yesterday can no longer be closed.

---

## 4. Daily plan

### 4.1 DailyPlan record
For each dateKey:
- `focus_goal_id` (nullable)
- `closed_status`: OPEN | CLOSED | SKIPPED_CLOSE
- `closed_at` (nullable)
- `note` (optional)

### 4.2 Invariants
- A day may be OPEN, CLOSED, or SKIPPED_CLOSE
- Closing is allowed regardless of task or habit completion
- Skipping close does **not** imply failure

---

## 5. Close Day ritual (evening hard gate)

### 5.1 Trigger
On app open or resume:
- If within evening window
- AND effective close date has `closed_status = OPEN`
→ user must be routed to Close Day

### 5.2 Close Day behavior
User must choose one:
- **Close the day**
- **Skip close for today**

Both actions:
- Set `closed_status`
- Set `closed_at`
- Transition immediately to Plan (for next day)

### 5.3 Recap data (read-only)
- Focus goal (if any)
- Focus tasks completed: X / Y
- Habits completed: A / B

No evaluation or scoring.

---

## 6. Plan ritual

### 6.1 Plan modes
- **Tomorrow mode**: entered after Close Day
- **Fallback mode**: entered when no plan exists for today

### 6.2 Plan rules
- Exactly **one goal** must be selected
- **1–3 tasks** must be created
- Tasks are:
  - Linked to selected goal
  - Marked as focus tasks
  - Assigned to target date

### 6.3 Skip behavior
- User may skip planning
- Skipping does not block app usage
- Skipping may affect streak continuity

---

## 7. Morning fallback

### 7.1 Condition
- If no focus tasks exist for today

### 7.2 Behavior
- Surface non-blocking CTA to Plan (fallback mode)
- Never hard-gate in the morning

---

## 8. Tasks

### 8.1 Task properties
- Belong to exactly one date
- May be focus or non-focus (v1 only focus tasks are used)

### 8.2 Task operations
- Toggle done / not done
- Edit title
- Delete task

Constraints:
- Focus tasks cannot change date or unlink from goal

---

## 9. Habits

### 9.1 Tracking model
- Habits are tracked manually per day
- Daily status cycles:
  `UNSET → DONE → MISSED → UNSET`

### 9.2 Logging rules
- DONE or MISSED creates/updates a log
- UNSET deletes the log for that day

No streaks or scoring for habits in v1.

---

## 10. Planning streak

### 10.1 What the streak represents
A **planning streak** measures consecutive days where the user **engaged with planning**, not task completion.

### 10.2 Day counts toward streak if
- The day has at least one focus task

### 10.3 Day breaks the streak if
- No focus tasks exist for that day

### 10.4 Properties
- Streak starts at 1
- Streak is derived, not stored
- Skipping Close Day does not break streak if planning occurs

---

## 11. Gatekeeper responsibilities

The gatekeeper is the single authority that:
- Routes to onboarding until completed
- Enforces evening Close Day hard gate
- Allows normal navigation otherwise

It must not:
- Force planning outside the evening gate
- Decide task or habit logic

---

## 12. Future-proofing constraints

All logic must:
- Be storage-agnostic (local DB today, cloud DB later)
- Use explicit date keys
- Avoid UI-coupled decisions

Planned future phases:
- Cloud sync (multi-device)
- Web access
- AI-assisted reflection and planning

These must be additive, not rewriting core logic.

---

## 13. Non-goals (explicit)

- No social features
- No gamification beyond streak
- No habit streaks
- No performance analytics

---

## 14. Definition of success (v1)

The app is successful if:
- A user can miss days without quitting
- A user can return after absence without friction
- Planning becomes habitual, not forced

