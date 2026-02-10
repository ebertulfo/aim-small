import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlanningSummaryScreen() {
    const router = useRouter();
    const [reminders, setReminders] = useState({
        morning: true,
        afternoon: true,
        evening: true,
    });

    const toggle = (key: keyof typeof reminders) => {
        setReminders(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleStart = () => {
        // Navigate to The Hub, replacing history so user can't go back to planning
        router.replace('/today');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>All set!</Text>
                <Text style={styles.subtitle}>
                    We'll remind you of your goals and check in on your progress throughout the day.
                </Text>

                <Text style={styles.sectionTitle}>When would you like to be reminded?</Text>

                <View style={styles.options}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Morning Reminder</Text>
                        <Switch
                            value={reminders.morning}
                            onValueChange={() => toggle('morning')}
                            trackColor={{ false: '#eee', true: '#000' }}
                        />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Afternoon Check-in</Text>
                        <Switch
                            value={reminders.afternoon}
                            onValueChange={() => toggle('afternoon')}
                            trackColor={{ false: '#eee', true: '#000' }}
                        />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Evening Review</Text>
                        <Switch
                            value={reminders.evening}
                            onValueChange={() => toggle('evening')}
                            trackColor={{ false: '#eee', true: '#000' }}
                        />
                    </View>
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    options: {
        gap: 24,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
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
