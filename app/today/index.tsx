import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const MOCK_TODAY_GOALS = [
    {
        id: '1',
        title: "Ship MVP",
        aims: [
            { id: 'a1', text: "Write 50 lines of code", done: false },
            { id: 'a2', text: "Fix login bug", done: false },
            { id: 'a3', text: "Deploy to staging", done: false },
        ]
    },
    {
        id: '2',
        title: "Health",
        aims: [
            { id: 'b1', text: "Make a healthy breakfast", done: true },
            { id: 'b2', text: "Go for a 15 min walk", done: false },
        ]
    },
    {
        id: '3',
        title: "Read",
        aims: [
            { id: 'c1', text: "Read 10 pages", done: false },
        ]
    }
];

export default function TodayScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [refreshing, setRefreshing] = useState(false);

    // Derived state from params or mock
    const todayGoals = useMemo(() => {
        if (!params.aims) return MOCK_TODAY_GOALS;

        try {
            const parsedAims = JSON.parse(params.aims as string) as Record<string, string[]>;
            return Object.entries(parsedAims).map(([goalTitle, aimTexts], index) => ({
                id: `goal-${index}`,
                title: goalTitle,
                aims: aimTexts.map((text, i) => ({
                    id: `aim-${index}-${i}`,
                    text,
                    done: false
                }))
            }));
        } catch (e) {
            console.error("Failed to parse aims", e);
            return MOCK_TODAY_GOALS;
        }
    }, [params.aims]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const handleGoalPress = (goalId: string, title: string, aims: any[]) => {
        router.push({
            pathname: '/today/focus',
            params: {
                goalId,
                title,
                aims: JSON.stringify(aims)
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Today</Text>
                <Pressable onPress={() => router.push('/settings')}>
                    <Ionicons name="settings-outline" size={24} color="#000" />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={styles.subtitle}>Here's what you're working on today</Text>

                <View style={styles.list}>
                    {todayGoals.map((goal) => {
                        const firstAim = goal.aims[0];
                        const remainingCount = goal.aims.length - 1;

                        return (
                            <Pressable
                                key={goal.id}
                                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                                onPress={() => handleGoalPress(goal.id, goal.title, goal.aims)}
                            >
                                <Text style={styles.goalTitle}>{goal.title}</Text>

                                <View style={styles.aimPreview}>
                                    <View style={[styles.checkbox, firstAim.done && styles.checkboxDone]}>
                                        {firstAim.done && <Ionicons name="checkmark" size={14} color="#fff" />}
                                    </View>
                                    <Text style={[styles.aimText, firstAim.done && styles.aimTextDone]} numberOfLines={1}>
                                        {firstAim.text}
                                    </Text>
                                </View>

                                {remainingCount > 0 && (
                                    <Text style={styles.moreText}>... and {remainingCount} other small aim{remainingCount > 1 ? 's' : ''}</Text>
                                )}
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.spacer} />

                <Pressable
                    style={styles.endButton}
                    onPress={() => router.push('/review')}
                >
                    <Text style={styles.endButtonText}>End Day & Review</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000',
        letterSpacing: -1,
    },
    content: {
        padding: 24,
        paddingTop: 8,
        paddingBottom: 40,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    list: {
        gap: 16,
    },
    card: {
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardPressed: {
        transform: [{ scale: 0.98 }],
        backgroundColor: '#f1f3f5',
    },
    goalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },
    aimPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxDone: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    aimText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    aimTextDone: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    moreText: {
        fontSize: 14,
        color: '#888',
        marginLeft: 32, // align with text
        fontStyle: 'italic',
    },
    spacer: {
        height: 40,
    },
    endButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    endButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e03131', // reddish for attention/destructive-ish action
    },
});
