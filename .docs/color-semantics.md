# UI & Design Semantics — Aim Small (v1)

> **Purpose**: Define the visual language, color semantics, and interaction rules for the Aim Small iOS application.

---

## 0. Platform Context

**Native iOS App (iPhone, Portrait)**

- **Input**: Touch-first, one-handed usage.
- **Constraint**: No desktop or web-specific patterns (hover, sidebars, multi-column grids).
- **Environment**: Designed for usage while tired or distracted (large touch targets, clear typography).

---

## 1. Core Constraints

- **Minimalism**: No charts, progress bars, heatmaps, scorecards, or analytics dashboards.
- **Tone**: No mascots, characters, or celebratory/guilt-inducing language.
- **Scope**: Implement only the features explicitly listed.
- **Fidelity**: No animations unless explicitly requested.


## 2. Philosophy

Color is used to **reinforce small, survivable progress**, not to reward achievement or punish failure.

In **Aim Small**, color exists to lower the emotional cost of engagement:
- Doing a little should feel sufficient
- Missing should never feel loud
- Returning should always feel safe

The system prioritizes:
- Aiming smaller than feels necessary
- Continuity over performance
- Return over perfection

Color must support these values.

---

## 3. Global context (apply to all screens)

Design a minimalist **native iOS mobile app** focused on daily execution, reflection, and planning.

This product values **CONTINUITY OVER PERFORMANCE**.
The UI must encourage users to stay in the loop even on difficult days.

### Visual style
- Calm, neutral, distraction‑free
- Light background, soft contrast
- Large, readable typography
- One‑column layouts only
- Text‑first layouts preferred
- No cards that imply scoring or evaluation

### Mobile constraints
- No sidebars
- No multi‑column grids
- No tables
- No hover states
- No dense dashboards
- No KPI panels
- No desktop navigation patterns

### Color semantics (STRICT)
- Green indicates engagement or effort, never success or failure
- Green must be muted and low‑saturation
- Green must always be achievable on hard days
- Green must NEVER be used for totals, summaries, or celebration
- Neutral colors represent incomplete, skipped, or untouched states
- Red must not be used anywhere in v1

### Tone
- Supportive but firm
- Adult, grounded, non‑playful
- No guilt language
- No hype or celebration language

### Interaction principles
- One primary action per screen
- Each flow completable in under 20 seconds
- Prioritize re‑entry and recovery over optimization
- Avoid secondary navigation or hidden features

---

## 4. Screen — Today

**Purpose**: Execution only. No planning ceremony here.

Layout (top to bottom):
1. Header: “Today”
   - Top‑right: subtle streak indicator (small, non‑celebratory)

2. Focus Goal section
   - Goal title
   - Optional short “why” text (muted)

3. Focus Tasks list (1–3 items only)
   - Checkbox to mark done
   - Completed task may use subtle green check
   - NO progress bars or percentages
   - Swipe actions: Edit, Delete

4. Habits Today list
   - Tap cycles: Unset → Done → Missed → Unset
   - Done may use subtle green indicator
   - Missed must remain neutral

5. Optional daily note (collapsed by default)

6. Conditional fallback banner (ONLY if no focus tasks exist)
   - Copy: “No plan for today — add one thing to get moving.”

Rules:
- Show ONLY focus tasks
- Do NOT include planning UI

---

## 5. Screen — Close the Day (hard gate)

**Purpose**: Close today consciously and transition forward.

Header:
- Title: “Close the day”
- Framing line (EXACT COPY):
  “Let’s take a moment to close today.”

Layout:
1. Today summary (TEXT ONLY)
   - Focus tasks: X of Y
   - Habits: A of B

2. Habit confirmation list
   - Same cycle interaction as Today
   - Green allowed ONLY on individual habit rows

3. Optional reflection note
   - Placeholder: “Anything worth noting?”

4. Primary CTA
   - “Close the day & plan tomorrow”

5. Secondary action
   - “Skip closing today”

Rules:
- No charts
- No streak visuals
- No celebratory language

---

## 6. Screen — Plan (Tomorrow / Fallback)

**Purpose**: Convert intention into 1–3 executable tasks.

Modes:
- Tomorrow mode (after Close Day)
- Fallback mode (no plan exists today)

Header copy:
- Tomorrow:
  - Title: “Plan tomorrow”
  - Subtitle: “What’s the next step?”
- Fallback:
  - Title: “No plan for today”
  - Subtitle: “Add one thing to get moving.”

Layout:
1. Focus Goal selector (radio list, max 3)
2. Task creation (inline input, max 3)
   - Placeholder: “Smallest step that moves this goal…”
3. Primary CTA
   - Tomorrow: “Confirm tomorrow”
   - Fallback: “Start today”
4. Secondary action
   - “Skip planning”

Rules:
- No dates shown
- No habits here

---

## 7. Usability Reminder

This app should feel usable **while tired, distracted, or lying in bed**.
If a screen feels like it needs a mouse, keyboard, or large monitor, redesign it.

