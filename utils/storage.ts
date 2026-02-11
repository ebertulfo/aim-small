import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageAdapter } from './storage/AsyncStorageAdapter';
import { DataStore } from './storage/types';

// Singleton instance of the storage adapter
export const db: DataStore = new AsyncStorageAdapter();

// --- Legacy Support (Deprecated) ---
// Kept to avoid breaking existing imports until refactoring is complete.
// Ideally, these should be replaced by `db` calls in the UI components.

const LEGACY_KEYS = {
    GOAL: 'AS_GOAL',
    TODAY_ACTION: 'AS_TODAY_ACTION',
    LAST_OPENED_DATE: 'AS_LAST_OPENED_DATE',
};

export const storage = {
    /** @deprecated Use db.getGoal() instead */
    async getGoal(): Promise<string | null> {
        return AsyncStorage.getItem(LEGACY_KEYS.GOAL);
    },

    /** @deprecated Use db.saveGoal() instead */
    async setGoal(goal: string): Promise<void> {
        await AsyncStorage.setItem(LEGACY_KEYS.GOAL, goal);
    },

    /** @deprecated Use db.deleteGoal() instead */
    async clearGoal(): Promise<void> {
        await AsyncStorage.removeItem(LEGACY_KEYS.GOAL);
    },

    /** @deprecated Use db.getTasksForDate() instead */
    async getTodayAction(): Promise<string | null> {
        return AsyncStorage.getItem(LEGACY_KEYS.TODAY_ACTION);
    },

    /** @deprecated Use db.saveTask() instead */
    async setTodayAction(action: string): Promise<void> {
        await AsyncStorage.setItem(LEGACY_KEYS.TODAY_ACTION, action);
    },

    async checkDailyReset(): Promise<void> {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const lastUpdated = await AsyncStorage.getItem(LEGACY_KEYS.LAST_OPENED_DATE);

        if (lastUpdated !== today) {
            // It's a new day, clear today's action
            await AsyncStorage.removeItem(LEGACY_KEYS.TODAY_ACTION);
            await AsyncStorage.setItem(LEGACY_KEYS.LAST_OPENED_DATE, today);
        }
    },

    // Dev only
    async clearAll(): Promise<void> {
        await AsyncStorage.clear();
    }
};
