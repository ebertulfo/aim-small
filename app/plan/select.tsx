import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data (would come from onboarding/storage)
const MOCK_GOALS = [
    "Build a SaaS",
    "Run a Marathon",
    "Read 20 Books",
    "Learn Guitar",
    "Meditation Habit"
];

export default function SelectGoalsParams() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([]);

    const toggleGoal = (goal: string) => {
        if (selected.includes(goal)) {
            setSelected(selected.filter(g => g !== goal));
        } else {
            setSelected([...selected, goal]);
        }
    };

    const handleContinue = () => {
        // Pass selected goals to next screen (mock param for now)
        router.push({
            pathname: '/plan/aims',
            params: { goals: JSON.stringify(selected) }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.stepIndicator}>Step 2 of 2</Text>
                <Text style={styles.title}>What do you want to work on today?</Text>

                {selected.length > 3 && (
                    <View style={styles.warningContainer}>
                        <Ionicons name="warning-outline" size={20} color="#856404" />
                        <Text style={styles.warningText}>
                            Focus on 1-3 goals for best results.
                        </Text>
                    </View>
                )}

                <View style={styles.list}>
                    {MOCK_GOALS.map((goal, index) => {
                        const isSelected = selected.includes(goal);
                        return (
                            <Pressable
                                key={index}
                                style={[styles.item, isSelected && styles.itemSelected]}
                                onPress={() => toggleGoal(goal)}
                            >
                                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                    {isSelected && <Ionicons name="checkmark" size={16} color="#fff" />}
                                </View>
                                <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                                    {goal}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.spacer} />

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        selected.length === 0 && styles.buttonDisabled,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={handleContinue}
                    disabled={selected.length === 0}
                >
                    <Text style={styles.buttonText}>Continue</Text>
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
    stepIndicator: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#000',
        marginBottom: 24,
        letterSpacing: -0.5,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff3cd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 24,
        gap: 8,
    },
    warningText: {
        color: '#856404',
        fontSize: 14,
        fontWeight: '500',
    },
    list: {
        gap: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    itemSelected: {
        backgroundColor: '#fff',
        borderColor: '#000',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    itemText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    itemTextSelected: {
        color: '#000',
        fontWeight: '600',
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
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
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
