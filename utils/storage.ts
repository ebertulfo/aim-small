import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    GOAL: 'AS_GOAL',
    TODAY_ACTION: 'AS_TODAY_ACTION',
    LAST_OPENED_DATE: 'AS_LAST_OPENED_DATE',
};

export const storage = {
    async getGoal(): Promise<string | null> {
        return AsyncStorage.getItem(KEYS.GOAL);
    },

    async setGoal(goal: string): Promise<void> {
        await AsyncStorage.setItem(KEYS.GOAL, goal);
    },

    async clearGoal(): Promise<void> {
        await AsyncStorage.removeItem(KEYS.GOAL);
    },

    async getTodayAction(): Promise<string | null> {
        return AsyncStorage.getItem(KEYS.TODAY_ACTION);
    },

    async setTodayAction(action: string): Promise<void> {
        await AsyncStorage.setItem(KEYS.TODAY_ACTION, action);
    },

    async checkDailyReset(): Promise<void> {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const lastUpdated = await AsyncStorage.getItem(KEYS.LAST_OPENED_DATE);

        if (lastUpdated !== today) {
            // It's a new day, clear today's action
            await AsyncStorage.removeItem(KEYS.TODAY_ACTION);
            await AsyncStorage.setItem(KEYS.LAST_OPENED_DATE, today);
        }
    },

    // Dev only
    async clearAll(): Promise<void> {
        await AsyncStorage.clear();
    }
};
