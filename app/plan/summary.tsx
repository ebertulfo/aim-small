import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlanningSummaryScreen() {
    const router = useRouter();


    // Simple mock time state
    const [times, setTimes] = useState({
        morning: "8:00 AM",
        afternoon: "12:00 PM",
        evening: "8:00 PM"
    });

    const [afternoonEnabled, setAfternoonEnabled] = useState(false);

    // Mock time cycling for demo purposes
    const cycleTime = (period: 'morning' | 'afternoon' | 'evening') => {
        const presets = {
            morning: ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM"],
            afternoon: ["12:00 PM", "1:00 PM", "2:00 PM"],
            evening: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"]
        };

        setTimes(prev => {
            const current = presets[period].indexOf(prev[period]);
            const next = (current + 1) % presets[period].length;
            return { ...prev, [period]: presets[period][next] };
        });
    };

    const handleStart = () => {
        // Navigate to The Hub, replacing history
        // In real app, save reminders preferences here
        router.replace('/today');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Set your daily rhythm</Text>
                <Text style={styles.subtitle}>
                    We'll help you stay on track.
                </Text>

                <View style={styles.options}>
                    {/* Morning - Mandatory */}
                    <Pressable
                        style={styles.option}
                        onPress={() => cycleTime('morning')}
                    >
                        <View>
                            <Text style={styles.optionLabel}>Morning Reminder</Text>
                            <Text style={styles.optionHint}>Tap to change time</Text>
                        </View>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeText}>{times.morning}</Text>
                        </View>
                    </Pressable>

                    {/* Afternoon - Optional */}
                    <View style={styles.option}>
                        <View>
                            <Text style={styles.optionLabel}>Afternoon Check-in</Text>
                            <View style={styles.switchRow}>
                                <Switch
                                    value={afternoonEnabled}
                                    onValueChange={setAfternoonEnabled}
                                    trackColor={{ false: '#eee', true: '#000' }}
                                />
                                <Text style={styles.switchLabel}>
                                    {afternoonEnabled ? 'ON' : 'OFF'}
                                </Text>
                            </View>
                        </View>

                        {afternoonEnabled && (
                            <Pressable
                                style={styles.timeBox}
                                onPress={() => cycleTime('afternoon')}
                            >
                                <Text style={styles.timeText}>{times.afternoon}</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Evening - Mandatory */}
                    <Pressable
                        style={styles.option}
                        onPress={() => cycleTime('evening')}
                    >
                        <View>
                            <Text style={styles.optionLabel}>Evening Review</Text>
                            <Text style={styles.optionHint}>Tap to change time</Text>
                        </View>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeText}>{times.evening}</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={{ flex: 1 }} />

                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                    onPress={handleStart}
                >
                    <Text style={styles.buttonText}>Start my day</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#000',
        marginBottom: 16,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 40,
        lineHeight: 26,
    },
    options: {
        gap: 16,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    optionHint: {
        fontSize: 14,
        color: '#666',
    },
    timeBox: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        minWidth: 100,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 4,
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
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
