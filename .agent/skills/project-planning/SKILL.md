---
name: project-planning
description: Expert skill for creating and maintaining project documentation artifacts (Task List, Implementation Plan, Walkthrough).
---

# Project Planning Skill

This skill provides standard templates and instructions for the core artifacts used in the **Aim Small** project workflow.

## 1. Task List (`task.md`)

When creating or updating `task.md`, use the following format. Ensure task breakdown is granular enough to be actionable.

```markdown
# [Feature Name]

- [ ] [Phase 1: Analysis/Planning] <!-- id: 0 -->
    - [ ] [Subtask 1]
- [ ] [Phase 2: Execution] <!-- id: 1 -->
    - [ ] [Subtask 1]
- [ ] [Phase 3: Verification] <!-- id: 2 -->
```

## 2. Implementation Plan (`implementation_plan.md`)

Use this template exactly. Do not omit the "User Review Required" section (write "None" if empty).

```markdown
# [Feature Name] Implementation Plan

## Goal Description
[Brief description of what and why]

## User Review Required
> [!IMPORTANT]
> [List any breaking changes, risky operations, or design decisions needing approval]

## Proposed Changes

### Configuration
#### [MODIFY] [file path]
[Description of change]

### [Component/Module Name]
#### [NEW] [file path]
[Description]

## Verification Plan

### Automated Tests
[List tests to run]

### Manual Verification
[Step-by-step manual test instructions]
```

## 3. Walkthrough (`walkthrough.md`)

Use this template to document completed work.

```markdown
# Walkthrough - [Feature Name]

I have completed the implementation of [Feature Name].

## Changes

### [Category]
- **[Component]**: [Description of change]

## Verification Results

### Automated Tests
- [ ] [Test Command] - Passed

### Manual Verification
- [ ] [Test Step] - Verified

## Evidence
[Embed screenshots or videos here using ![Alt Date](path/to/media)]
```
