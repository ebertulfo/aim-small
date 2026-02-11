
import { Ionicons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DailyPlan, Goal, Task } from '../../types/domain';
import { db } from '../../utils/storage';

export default function PlanningSummaryScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Time State
    const [times, setTimes] = useState({
        morning: "8:00 AM",
        afternoon: "12:00 PM",
        evening: "8:00 PM"
    });

    const [afternoonEnabled, setAfternoonEnabled] = useState(false);
    const [expandedSection, setExpandedSection] = useState<'morning' | 'afternoon' | 'evening' | null>(null);

    const toggleExpand = (section: 'morning' | 'afternoon' | 'evening') => {
        setExpandedSection(prev => prev === section ? null : section);
    };

    const selectTime = (section: 'morning' | 'afternoon' | 'evening', time: string) => {
        setTimes(prev => ({ ...prev, [section]: time }));
        setExpandedSection(null); // Auto-collapse on select
    };

    const handleStart = async () => {
        try {
            // 1. Retrieve Data from Params
            if (!params.aims) {
                // Fallback or Error? For now just go to today if no params (dev testing)
                router.replace('/today');
                return;
            }

            const aimsData: Record<string, string[]> = JSON.parse(params.aims as string);
            const todayDate = new Date().toISOString().split('T')[0];
            const now = new Date().toISOString();

            // 2. Save Goals & Tasks
            // Logic: The keys of aimsData are Goal Titles.
            // We need to check if these goals exist, if not create them.
            // For MVP simplicity, we might just search by title or assume new?
            // BETTER: We should have passed IDs. But the onboarding flow uses titles.
            // Let's check if goal exists by title, else create.

            const existingGoals = await db.getAllGoals();
            let firstGoalId = '';

            for (const [goalTitle, aimTexts] of Object.entries(aimsData)) {
                let goalId = existingGoals.find(g => g.title === goalTitle)?.id;

                if (!goalId) {
                    goalId = Crypto.randomUUID();
                    const newGoal: Goal = {
                        id: goalId,
                        title: goalTitle,
                        status: 'ACTIVE',
                        isPinned: false,
                        lastFocusedAt: now,
                        createdAt: now,
                        updatedAt: now
                    };
                    await db.saveGoal(newGoal);
                }

                if (!firstGoalId) firstGoalId = goalId;

                // Save Tasks
                for (const text of aimTexts) {
                    const newTask: Task = {
                        id: Crypto.randomUUID(),
                        title: text,
                        dueDate: todayDate,
                        linkedGoalId: goalId,
                        isFocusTask: true,
                        plannedSource: 'MORNING', // Assuming morning flow for now
                        isDone: false,
                        createdAt: now,
                        updatedAt: now
                    };
                    await db.saveTask(newTask);
                }
            }

            // 3. Save Daily Plan
            const newPlan: DailyPlan = {
                date: todayDate,
                focusGoalId: firstGoalId, // Simple logic: focus on the first goal
                closedStatus: 'OPEN'
            };
            await db.savePlan(newPlan);

            // 4. Navigate
            router.replace('/today');

        } catch (error) {
            console.error("Failed to save plan", error);
            Alert.alert("Error", "Failed to save your plan. Please try again.");
        }
    };

    // Helper to generate time options
    const getTimeOptions = (section: 'morning' | 'afternoon' | 'evening') => {
        switch (section) {
            case 'morning': // 3 AM - 10 AM
                return ["3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"];
            case 'afternoon': // 11 AM - 2 PM
                return ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];
            case 'evening': // 5 PM - 10 PM
                return ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];
            default:
                return [];
        }
    };

    const renderTimeSelector = (section: 'morning' | 'afternoon' | 'evening') => {
        if (expandedSection !== section) return null;

        const options = getTimeOptions(section);
        return (
            <View style={styles.timeSelector}>
                <View style={styles.timeGrid}>
                    {options.map((time) => (
                        <Pressable
                            key={time}
                            style={[
                                styles.timeChip,
                                times[section] === time && styles.timeChipSelected
                            ]}
                            onPress={() => selectTime(section, time)}
                        >
                            <Text style={[
                                styles.timeChipText,
                                times[section] === time && styles.timeChipTextSelected
                            ]}>
                                {time}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Set your daily rhythm</Text>
                <Text style={styles.subtitle}>
                    We'll help you stay on track.
                </Text>

                <View style={styles.options}>
                    {/* Morning - Mandatory */}
                    <View style={styles.card}>
                        <Pressable
                            style={styles.cardHeader}
                            onPress={() => toggleExpand('morning')}
                        >
                            <View style={styles.optionInfo}>
                                <View style={styles.iconBox}>
                                    <Ionicons name="sunny-outline" size={24} color="#000" />
                                </View>
                                <View>
                                    <Text style={styles.optionLabel}>Morning Reminder</Text>
                                    <Text style={styles.optionValue}>{times.morning}</Text>
                                </View>
                            </View>
                            <Ionicons
                                name={expandedSection === 'morning' ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#666"
                            />
                        </Pressable>
                        {renderTimeSelector('morning')}
                    </View>

                    {/* Afternoon - Optional */}
                    <View style={styles.card}>
                        <Pressable
                            style={styles.cardHeader}
                            onPress={() => {
                                if (afternoonEnabled) toggleExpand('afternoon');
                            }}
                        >
                            <View style={styles.optionInfo}>
                                <View style={styles.iconBox}>
                                    <Ionicons name="cafe-outline" size={24} color="#000" />
                                </View>
                                <View>
                                    <Text style={styles.optionLabel}>Afternoon Check-in</Text>
                                    {afternoonEnabled ? (
                                        <Text style={styles.optionValue}>{times.afternoon}</Text>
                                    ) : (
                                        <Text style={styles.optionValueDisabled}>Off</Text>
                                    )}
                                </View>
                            </View>
                            <Switch
                                value={afternoonEnabled}
                                onValueChange={(val) => {
                                    setAfternoonEnabled(val);
                                    if (val) setExpandedSection('afternoon');
                                    else if (expandedSection === 'afternoon') setExpandedSection(null);
                                }}
                                trackColor={{ false: '#eee', true: '#000' }}
                            />
                        </Pressable>
                        {afternoonEnabled && renderTimeSelector('afternoon')}
                    </View>

                    {/* Evening - Mandatory */}
                    <View style={styles.card}>
                        <Pressable
                            style={styles.cardHeader}
                            onPress={() => toggleExpand('evening')}
                        >
                            <View style={styles.optionInfo}>
                                <View style={styles.iconBox}>
                                    <Ionicons name="moon-outline" size={24} color="#000" />
                                </View>
                                <View>
                                    <Text style={styles.optionLabel}>Evening Review</Text>
                                    <Text style={styles.optionValue}>{times.evening}</Text>
                                </View>
                            </View>
                            <Ionicons
                                name={expandedSection === 'evening' ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#666"
                            />
                        </Pressable>
                        {renderTimeSelector('evening')}
                    </View>
                </View>

                <View style={styles.spacer} />

                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                    onPress={handleStart}
                >
                    <Text style={styles.buttonText}>Start my day</Text>
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
    content: {
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000',
        marginBottom: 8,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
        lineHeight: 24,
    },
    options: {
        gap: 16,
    },
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    optionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    optionValue: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    optionValueDisabled: {
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
    },
    timeSelector: {
        padding: 16,
        paddingTop: 0,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 16,
    },
    timeChip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#eee',
    },
    timeChipSelected: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    timeChipText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    timeChipTextSelected: {
        color: '#fff',
    },
    spacer: {
        height: 40,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.99 }],
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

