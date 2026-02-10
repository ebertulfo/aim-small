import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock summary data
const SUMMARY = [
    { title: "Ship MVP", total: 3, completed: 2 },
    { title: "Health", total: 2, completed: 2 },
    { title: "Read", total: 1, completed: 0 },
];

export default function ReviewScreen() {
    const router = useRouter();

    const handlePlanTomorrow = () => {
        // Loop back to planning flow
        router.push('/plan/select');
    };

    const handleSkip = () => {
        // For wireframe, just go back to Hub? Or maybe exit?
        // "Skips planning; User will plan in the morning"
        // So go back to Hub for now
        router.replace('/today');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Daily Wrap-up</Text>
                <Text style={styles.subtitle}>How did today go?</Text>

                <View style={styles.summaryList}>
                    {SUMMARY.map((item, index) => {
                        const isAllDone = item.completed === item.total;
                        return (
                            <View key={index} style={styles.summaryItem}>
                                <View>
                                    <Text style={styles.goalTitle}>{item.title}</Text>
                                    <Text style={styles.goalStats}>
                                        {item.completed} / {item.total} aims
                                    </Text>
                                </View>
                                {isAllDone && (
                                    <Ionicons name="checkmark-circle" size={24} color="#000" />
                                )}
                            </View>
                        );
                    })}
                </View>

                <View style={styles.divider} />

                <Text style={styles.promptText}>
                    Great work! Ready to plan for tomorrow?
                </Text>

                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                    onPress={handlePlanTomorrow}
                >
                    <Text style={styles.buttonText}>Plan Tomorrow</Text>
                </Pressable>

                <Pressable
                    style={styles.textButton}
                    onPress={handleSkip}
                >
                    <Text style={styles.textButtonLabel}>Not Now</Text>
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
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 32,
    },
    summaryList: {
        gap: 16,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
    },
    goalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    goalStats: {
        fontSize: 14,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 32,
    },
    promptText: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
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
    textButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    textButtonLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
});
