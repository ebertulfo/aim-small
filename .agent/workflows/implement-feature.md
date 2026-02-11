---
description: Implement a new feature or change request following the project standards.
---
# Feature Implementation Workflow

This workflow guides the agent through the standard process of implementing a feature, ensuring all documentation and verification steps are followed.

## 1. Analysis & Task Creation

1.  **Understand the Request**: Read the user's prompt carefully.
2.  **Check Context**:
    -   Read `.docs/project-workflow.md` to refresh on the process.
    -   Read `.docs/roadmap.md` and `.docs/app-flow.md` for context.
3.  **Create Task**:
    -   Use the `project-planning` skill to create or update `task.md`.
    -   **Command**: `Use the project-planning skill to create a task list for [Feature Name]`.

## 2. Technical Planning

1.  **Draft Plan**:
    -   Use the `project-planning` skill to draft `implementation_plan.md`.
    -   **Command**: `Use the project-planning skill to create an implementation plan for [Feature Name]`.
2.  **Data Modeling**:
    -   Identify necessary type changes or new interfaces.
    -   Ensure alignment with `.docs/technical-design.md`.
3.  **Review**:
    -   **STOP**: Use `notify_user` to present the `implementation_plan.md` for review.
    -   **Iterate**: If the user requests changes, update the plan and re-request review.

## 3. Execution



1.  **Type Check**:
    -   Ensure `types/domain.ts` and `utils/storage/types.ts` are up to date.
    -   Run `tsc --noEmit` if possible to catch type errors early.
2.  **Implement**:
    -   Execute the changes outlined in `implementation_plan.md`.
    -   Use `task_boundary` to track progress against `task.md`.
    -   **UI Work**: If building UI, use the `expo-app-design` skill.
3.  **Update Task**:
    -   Mark items in `task.md` as `[x]` as you complete them.

## 4. Verification

1.  **Verify**:
    -   Run manual or automated tests as defined in the plan.
2.  **Document**:
    -   Use the `project-planning` skill to create `walkthrough.md`.
    -   **Command**: `Use the project-planning skill to create a walkthrough for [Feature Name]`.
    -   **CRITICAL**: Embed screenshots/videos for any UI changes.

## 5. Finalization

1.  **Update Docs**:
    -   Update `.docs/app-flow.md` if flows changed.
    -   Update `.docs/technical-design.md` if architecture changed.
2.  **Notify**:
    -   Use `notify_user` to present the `walkthrough.md` and confirm completion.
// turbo
3.  **Cleanup**:
    -   Ask the user if they want to delete any temporary files.
