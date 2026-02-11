# Antigravity Project Workflow

This document outlines the standardized workflow for introducing changes and new features to the **Aim Small** project using Antigravity agents.

## Roles & Resources

- **Product Owner (PO)**: The human user. responsible for high-level direction, feature requests, and final approval.
- **Agent**: The Antigravity AI assistant. Responsible for analysis, planning, implementation, and verification.
- **Skills**: Specialized capabilities available to the Agent (located in `.agent/skills`).
    - `expo-app-design`: For UI/UX design and component planning.
    - `expo-deployment`: For deployment tasks.
    - `upgrading-expo`: For maintaining the Expo environment.

## Workflow Phases

### 1. Discovery & Definition
**Trigger**: A new refined idea, feature request, or bug report from the PO.

1.  **Agent Analysis**:
    - Analyze the request against existing documentation (`.docs/roadmap.md`, `.docs/app-flow.md`).
    - Check for existing relevant Knowledge Items (KIs) or previous conversations.
2.  **Artifact Creation**:
    - Create or update **`task.md`** to track the initiative.
    - This provides a checklist for the PO to monitor progress.

### 2. Planning & Design
**Goal**: Create a blueprint for execution that the PO can review.

1.  **Technical Assessment**:
    - Verify tech stack compatibility (check `package.json`, `app.json`).
    - Identify necessary dependencies or configuration changes.
2.  **Data Modeling & Type Definition**:
    - Identify core entities and data structures involved in the feature.
    - Define TypeScript interfaces in `types/domain.ts` (or relevant location).
    - Ensure new types align with `technical-design.md`.
3.  **Design & Prototyping** (if applicable):
    - Use `generate_image` or the `expo-app-design` skill to draft UI concepts.
    - Update `color-semantics.md` if new colors are introduced.
4.  **Implementation Plan**:
    - Create **`implementation_plan.md`**.
    - **MUST** include:
        - **Goal Description**: What and Why.
        - **User Review Required**: Breaking changes, critical decisions.
        - **Proposed Changes**: File-level details ([MODIFY], [NEW], [DELETE]).
        - **Verification Plan**: How the change will be tested (Manual/Automated).
5.  **Review Loop**:
    - Notify PO to review `implementation_plan.md`.
    - Iterate based on feedback until approved.



### 3. Execution
**Goal**: Implement the approved plan.

1.  **Type Check & Setup** (Crucial First Step):
    - Verify that `types/domain.ts` and `utils/storage/types.ts` are up to date.
    - Run `tsc --noEmit` ensures no initial type errors before writing logic.
2.  **Development**:
    - Write code following the `implementation_plan.md`.
    - Use specialized skills where appropriate (e.g., `expo-app-design` for UI components).
    - Maintain code quality and separate concerns (UI vs Core Logic).
3.  **Progress Tracking**:
    - Mark items as effectively completed in `task.md`.
    - Use `task_boundary` to keep the PO informed of current activity.

### 4. Verification & Delivery
**Goal**: Ensure the feature works as intended.

1.  **Verification**:
    - **Automated**: Run tests (if available/implemented).
    - **Manual**: Verify locally using `expo start` (if instructed) or by analyzing code logic.
2.  **Proof of Work**:
    - Create **`walkthrough.md`**.
    - Include:
        - Summary of changes.
        - Validation results (logs, test outputs).
        - **Screenshots/Videos** of the new feature (essential for UI changes).
3.  **Final Review**:
    - Ask the PO to review the `walkthrough.md` and the actual implementation.

### 5. Documentation & Cleanup
**Goal**: Keep the project brain healthy.

1.  **Update Documentation**:
    - Update `.docs/app-flow.md` with new user flows.
    - Update `.docs/technical-design.md` with architecture changes.
    - Update `.docs/roadmap.md` to mark features as complete.
2.  **Cleanup**:
    - Remove temporary files.
    - Ensure no debug artifacts are left in the codebase.

## Artifact Standards

| Artifact | Purpose | update Frequency |
| :--- | :--- | :--- |
| `task.md` | High-level checklist | Continuous |
| `implementation_plan.md` | Technical blueprint | Once per feature (iterative during planning) |
| `walkthrough.md` | Proof of completion | End of Execution |
| `.docs/*.md` | Long-term knowledge | End of Project |

## Handling Blockers
If the Agent is stuck or encounters an error it cannot resolve after **3 attempts**:
1.  Stop execution.
2.  Notify the PO with a clear summary of the error and potential solutions.
3.  Await guidance.
