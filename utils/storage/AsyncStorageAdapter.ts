import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyPlan, Goal, Habit, HabitLog, Task } from '../../types/domain';
import { DataStore } from './types';

const KEYS = {
    GOALS: 'AS_GOALS_V1',
    TASKS: 'AS_TASKS_V1',
    HABITS: 'AS_HABITS_V1',
    PLANS: 'AS_DAILY_PLANS_V1',
    HABIT_LOGS: 'AS_HABIT_LOGS_V1',
};

export class AsyncStorageAdapter implements DataStore {
    // --- Private Helpers ---

    private async getList<T>(key: string): Promise<T[]> {
        try {
            const json = await AsyncStorage.getItem(key);
            return json ? JSON.parse(json) : [];
        } catch (e) {
            console.error(`Failed to load list for key ${key}`, e);
            return [];
        }
    }

    private async saveList<T>(key: string, list: T[]): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(list));
        } catch (e) {
            console.error(`Failed to save list for key ${key}`, e);
        }
    }

    // --- Goals ---

    async getActiveGoals(): Promise<Goal[]> {
        const goals = await this.getAllGoals();
        return goals
            .filter((g) => g.status === 'ACTIVE')
            .sort((a, b) => {
                // Pinned first
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                // Then by last focused (newest first)
                const dateA = a.lastFocusedAt ? new Date(a.lastFocusedAt).getTime() : 0;
                const dateB = b.lastFocusedAt ? new Date(b.lastFocusedAt).getTime() : 0;
                return dateB - dateA;
            });
    }

    async getAllGoals(): Promise<Goal[]> {
        return this.getList<Goal>(KEYS.GOALS);
    }

    async getGoal(id: string): Promise<Goal | null> {
        const goals = await this.getAllGoals();
        return goals.find((g) => g.id === id) || null;
    }

    async saveGoal(goal: Goal): Promise<void> {
        const goals = await this.getAllGoals();
        const index = goals.findIndex((g) => g.id === goal.id);
        if (index >= 0) {
            goals[index] = goal;
        } else {
            goals.push(goal);
        }
        await this.saveList(KEYS.GOALS, goals);
    }

    async deleteGoal(id: string): Promise<void> {
        const goals = await this.getAllGoals();
        const filtered = goals.filter(g => g.id !== id);
        await this.saveList(KEYS.GOALS, filtered);
    }

    // --- Tasks ---

    async getTasksForDate(date: string): Promise<Task[]> {
        const allTasks = await this.getList<Task>(KEYS.TASKS);
        return allTasks.filter((t) => t.dueDate === date);
    }

    async saveTask(task: Task): Promise<void> {
        const allTasks = await this.getList<Task>(KEYS.TASKS);
        const index = allTasks.findIndex((t) => t.id === task.id);
        if (index >= 0) {
            allTasks[index] = task;
        } else {
            allTasks.push(task);
        }
        await this.saveList(KEYS.TASKS, allTasks);
    }

    async deleteTask(id: string): Promise<void> {
        const allTasks = await this.getList<Task>(KEYS.TASKS);
        const filtered = allTasks.filter(t => t.id !== id);
        await this.saveList(KEYS.TASKS, filtered);
    }


    // --- Daily Plan ---

    async getPlan(date: string): Promise<DailyPlan | null> {
        const plans = await this.getList<DailyPlan>(KEYS.PLANS);
        return plans.find((p) => p.date === date) || null;
    }

    async savePlan(plan: DailyPlan): Promise<void> {
        const plans = await this.getList<DailyPlan>(KEYS.PLANS);
        const index = plans.findIndex((p) => p.date === plan.date);
        if (index >= 0) {
            plans[index] = plan;
        } else {
            plans.push(plan);
        }
        await this.saveList(KEYS.PLANS, plans);
    }

    // --- Habits ---

    async getHabits(): Promise<Habit[]> {
        return this.getList<Habit>(KEYS.HABITS);
    }

    async saveHabit(habit: Habit): Promise<void> {
        const habits = await this.getList<Habit>(KEYS.HABITS);
        const index = habits.findIndex((h) => h.id === habit.id);
        if (index >= 0) {
            habits[index] = habit;
        } else {
            habits.push(habit);
        }
        await this.saveList(KEYS.HABITS, habits);
    }

    async deleteHabit(id: string): Promise<void> {
        const habits = await this.getList<Habit>(KEYS.HABITS);
        const filtered = habits.filter(h => h.id !== id);
        await this.saveList(KEYS.HABITS, filtered);
    }


    // --- Habit Logs ---

    async getHabitLogs(date: string): Promise<HabitLog[]> {
        const logs = await this.getList<HabitLog>(KEYS.HABIT_LOGS);
        return logs.filter((l) => l.date === date);
    }

    async logHabit(log: HabitLog): Promise<void> {
        const logs = await this.getList<HabitLog>(KEYS.HABIT_LOGS);
        // Remove existing log for same habit+date if exists (upsert logic)
        const existingIndex = logs.findIndex(
            (l) => l.habitId === log.habitId && l.date === log.date
        );

        if (existingIndex >= 0) {
            logs[existingIndex] = log;
        } else {
            logs.push(log);
        }
        await this.saveList(KEYS.HABIT_LOGS, logs);
    }

    async deleteHabitLog(id: string): Promise<void> {
        const logs = await this.getList<HabitLog>(KEYS.HABIT_LOGS);
        const filtered = logs.filter(l => l.id !== id);
        await this.saveList(KEYS.HABIT_LOGS, filtered);
    }


    // --- Debug ---

    async clearAll(): Promise<void> {
        await AsyncStorage.multiRemove(Object.values(KEYS));
    }
}
