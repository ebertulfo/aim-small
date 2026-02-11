import { DailyPlan, Goal, Habit, HabitLog, Task } from '../../types/domain';

export interface DataStore {
    // Goals
    /**
     * Get all active goals.
     * Logic: Returns goals where status is 'ACTIVE'.
     * Sorted by isPinned (desc), lastFocusedAt (desc).
     */
    getActiveGoals(): Promise<Goal[]>;
    getAllGoals(): Promise<Goal[]>;
    getGoal(id: string): Promise<Goal | null>;
    saveGoal(goal: Goal): Promise<void>;
    deleteGoal(id: string): Promise<void>;

    // Tasks
    getTasksForDate(date: string): Promise<Task[]>;
    saveTask(task: Task): Promise<void>;
    deleteTask(id: string): Promise<void>;

    // Daily Plan
    getPlan(date: string): Promise<DailyPlan | null>;
    savePlan(plan: DailyPlan): Promise<void>;

    // Habits
    getHabits(): Promise<Habit[]>;
    saveHabit(habit: Habit): Promise<void>;
    deleteHabit(id: string): Promise<void>;

    // Habit Logs
    getHabitLogs(date: string): Promise<HabitLog[]>;
    logHabit(log: HabitLog): Promise<void>;
    deleteHabitLog(id: string): Promise<void>;

    // Dev / Debug
    clearAll(): Promise<void>;
}
