# PRD — Aim Small (v1)

> **Aim Small** is a calm, local-first iOS app that helps people make progress by deliberately planning *less* — so missing never feels fatal and returning always feels possible.

This PRD defines **product intent, philosophy, and experience rules**. System behavior is specified separately in the *Core Logic Specification*.

---

## 1. Problem statement

People don’t fail because they don’t care.
They fail because they plan too much.

Modern life makes it easy to:
- overestimate daily capacity
- set plans that collapse under real-world friction
- miss a day and quietly disengage
- feel guilt instead of orientation

Most productivity tools increase the *cost of missing*.
Aim Small reduces that cost.

---

## 2. Product vision

Help users make progress by **aiming smaller than they think they should**.

By planning fewer, smaller actions:
- failure becomes survivable
- consistency becomes easier
- return becomes natural

Aim Small is not about doing more.
It is about making progress **cheap**, **repeatable**, and **forgiving**.

---

## 3. Target user

- People who care about self-improvement but struggle with consistency
- Users who feel overwhelmed by traditional productivity systems
- Individuals who want structure without pressure
- People who want to return without explaining themselves

Aim Small is a **private, reflective tool**, not a social or competitive product.

---

## 4. Core principles

1. **Aim small by default**  
   Smaller plans reduce cognitive load and lower the cost of missing.

2. **Continuity over performance**  
   Staying in the loop matters more than completing everything.

3. **Fast, finishable rituals**  
   Daily interactions should feel easy to complete, even on bad days.

4. **Recovery is first-class**  
   Missing days should not break trust or momentum.

5. **Focus is limited by design**  
   Constraints create clarity and reduce overwhelm.

---

## 5. Core user loop

1. User opens the app
2. User executes **1–3 small focus tasks**
3. In the evening, user is prompted to **Close the day**
4. User sees a neutral, factual recap
5. User **plans tomorrow** by choosing one goal and a few small steps
6. Continuity is maintained as long as planning happens

If the user skips steps:
- The system allows an easy fallback
- Returning is prioritized over compliance

---

## 6. Key features (v1)

### 6.1 Today
- Shows a single focus goal
- Shows **1–3 small focus tasks** only
- Shows today’s habits
- Displays continuity (streak) subtly
- Optimized for execution, not planning

### 6.2 Close the day
- Evening ritual that closes the loop
- Neutral recap of tasks and habits
- Allows closing or skipping without penalty
- Immediately transitions to planning

### 6.3 Plan
- Used to plan tomorrow or recover today
- Requires exactly one goal
- Requires **1–3 small tasks**
- Encourages under-planning over over-planning

### 6.4 Goals
- Maximum of 3 active goals
- Enforces focus through explicit limits

### 6.5 Habits
- Manual, honest tracking
- No streaks or scoring

### 6.6 Continuity indicator
- Measures engagement with the daily loop
- Rewards return, not task volume

---

## 7. What this product is NOT

- Not a task manager
- Not a habit gamification app
- Not a productivity dashboard
- Not a performance tracker

Aim Small intentionally avoids systems that punish inconsistency.

---

## 8. Success criteria (v1)

The product succeeds if:
- Users feel safe aiming smaller
- Users can miss days without disengaging
- Planning becomes easier over time
- Returning feels natural, not heavy

---

## 9. Relationship to other documents

- **Core Logic Specification** defines behavior and invariants
- **Color Semantics Rules** define how progress is signaled
- **UI / Stitch Instructions** must respect this philosophy

---

## 10. Phase boundaries

### v1
- Local-first
- No AI
- No cloud sync
- No social features

### Future phases
- Optional cloud sync
- Web access
- AI-assisted reflection and planning

All future phases must preserve the **Aim Small** principle.

