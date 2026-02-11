export type Goal = {
    id: string;
    title: string;
    why?: string;
    status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
    isPinned: boolean;
    lastFocusedAt?: string; // ISO Date String
    createdAt: string;
    updatedAt: string;
}

export type Habit = {
    id: string;
    title: string;
    scheduleType: 'DAILY' | 'WEEKDAYS' | 'CUSTOM';
    scheduleDays: number[]; // e.g. [1, 3, 5] for Mon, Wed, Fri (0=Sunday)
    status: 'ACTIVE' | 'PAUSED';
    createdAt: string;
    updatedAt: string;
}

export type Task = {
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

export type DailyPlan = {
    date: string; // YYYY-MM-DD
    focusGoalId?: string;
    closedStatus: 'OPEN' | 'CLOSED' | 'SKIPPED_CLOSE';
    closedAt?: string;
    note?: string;
}

export type HabitLog = {
    id: string;
    habitId: string;
    date: string; // YYYY-MM-DD
    status: 'DONE' | 'MISSED';
}
