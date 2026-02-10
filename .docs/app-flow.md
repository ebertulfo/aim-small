1. User opens the app for the first time
2. App explains what it does: 
```
# Aim Small
## An app that helps you aim for small wins towards your big goals.
1. Write down your goals
    - Write down your top 5 goals you want to achieve
2. Commit to Small Aims for today
    - Commit to 1-3 small action you can do today to work towards your goals
3. Checkpoints as you go towards your day
    - Get reminded of your goals and check in on your progress
4. Review your progress, and plan for tomorrow
    - Check in on your progress and see how you're doing
5. Repeat until you achieve your goals
    - Rinse and repeat

### Ready to get started?
[Let's start!]
```
3. User is taken to the goals screen - First Goal
```
# Goals
## It all starts with one thing.
This is a big thing you want to achieve. We'll start with one and add more later.

[Goal #1 Placeholder: e.g. "Run a Marathon"]

[Continue] -> Goes to Step 5 (Aim Definition) - Skipping Step 4
```
4. User is taken to the Small Aims screen - Select Goals
```
# Today
## What goals do you wanna work on today?

[ ] Goal 1
[ ] Goal 2
[ ] Goal 3
[ ] Goal 4
[ ] Goal 5

[Continue]
```
Note: If user selects more than 3 goals, show a warning that working on too many goals may be counterproductive.
5. User is taken to the Small Aims screen - Set Small Aims
```
# [Goal Name]
## Commit to Small Aims for your goal "[Goal Name]"
What can you do today to achieve your goal?

[Small Aim 1. e.g., "Write 500 words"]
[+ Add another aim]

[Continue]
```
6. Planning complete screen
```
# Set your daily rhythm
### We'll help you stay on track.

[Morning Reminder]
[ 8:00 AM ] (Tap to change time)

[Afternoon Check-in] [Toggle: OFF/ON]
[ 12:00 PM ] (Visible if ON)

[Evening Review]
[ 8:00 PM ] (Tap to change time)

[Start my day]
```
7. User is taken to the Today screen (The Hub)
```
# Today
## Here's what you're working on today

[Goal: Ship MVP]
    [ ] Write 50 lines of code
    ... and 2 other small aims

[Goal: Health]
    [ ] Make a healthy breakfast
    ... and 1 other small aim

[Goal: Read]
    [ ] Read 10 pages
```

8. User interacts with a Goal (Enters Focus Mode)
```
# [Goal: Ship MVP]
## Focus on this goal

[x] Write 50 lines of code
[ ] Fix login bug
[ ] Deploy to staging

[Close Focus Mode]
```
Note: Focus Mode is a dedicated screen, not a modal.
To exit: Tap "Close Focus Mode" (or standard Back button).
Returns to Step 7 (Today Screen).

9. End of Day Review (Evening Routine)
Triggered by: Evening notification or manual "End Day" button.
```
# Daily Wrap-up
## How did today go?

Summary:
[Ship MVP]: 2/3 aims
[Health]: 2/2 aims
[Read]: 0/1 aims

## Great work! Ready to plan for tomorrow?

[Plan Tomorrow] -> Goes to Step 4 (Select Goals for Tomorrow)
[Not Now] -> Skips planning; User will plan in the morning (Step 4)
```

10. Manage Goals (Accessible via Settings icon on Today Screen)
```
# Manage Goals
## Update your top 5

1. [Goal: Health] [Edit] [Delete]
2. [Goal: Ship MVP] [Edit] [Delete]
3. [Goal: Read] [Edit] [Delete]
4. [Empty] [Add Goal]
5. [Empty] [Add Goal]

[Save Changes]

11. Settings Screen (Accessible from Today Screen -> User Icon / Gear)
```
# Settings
## Your Preferences

[Notifications / Checkpoints]
    [x] Morning Reminder (8:00 AM)
    [x] Afternoon Check-in (12:00 PM)
    [x] Evening Review (8:00 PM)

[Data]
    [Export Data]
    [Clear All Data] (Danger Zone)

[About]
    Aim Small v1.0.0
```

