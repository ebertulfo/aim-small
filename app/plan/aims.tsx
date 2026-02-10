import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SetAimsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Parse goals or fallback to mock if direct navigation
    const goals: string[] = params.goals
        ? JSON.parse(params.goals as string)
        : ["Build a SaaS", "Run a Marathon"];

    // State: Goal -> Array of Aim strings
    const [aims, setAims] = useState<Record<string, string[]>>(() => {
        const initial: Record<string, string[]> = {};
        goals.forEach(g => {
            initial[g] = ['']; // Start with one empty aim
        });
        return initial;
    });

    const updateAim = (goal: string, text: string, index: number) => {
        setAims(prev => {
            const newGoalAims = [...(prev[goal] || [])];
            newGoalAims[index] = text;
            return { ...prev, [goal]: newGoalAims };
        });
    };

    const addAim = (goal: string) => {
        setAims(prev => ({
            ...prev,
            [goal]: [...(prev[goal] || []), '']
        }));
    };

    const handleContinue = () => {
        // Filter out empty aims
        const cleanAims: Record<string, string[]> = {};
        let hasAtLeastOne = false;

        Object.entries(aims).forEach(([goal, goalAims]) => {
            const filtered = goalAims.filter(a => a.trim().length > 0);
            if (filtered.length > 0) {
                cleanAims[goal] = filtered;
                hasAtLeastOne = true;
            }
        });

        if (!hasAtLeastOne) return; // TODO: Show error?

        // Pass to next screen
        router.push({
            pathname: '/plan/summary',
            params: { aims: JSON.stringify(cleanAims) }
        });
    };

    const singleGoalMode = goals.length === 1;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.stepIndicator}>Step 2 of 2</Text>

                {singleGoalMode ? (
                    <>
                        <Text style={styles.title}>Commit to Small Aims for your goal "{goals[0]}"</Text>
                        <Text style={styles.subtitle}>
                            What are the specific things you can do today?
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Commit to Small Aims</Text>
                        <Text style={styles.subtitle}>
                            What small action can you take today for each goal?
                        </Text>
                    </>
                )}

                <View style={styles.list}>
                    {goals.map((goal, gIndex) => (
                        <View key={gIndex} style={styles.group}>
                            {!singleGoalMode && (
                                <Text style={styles.goalLabel}>{goal}</Text>
                            )}

                            <View style={styles.aimsList}>
                                {(aims[goal] || []).map((aim, aIndex) => (
                                    <TextInput
                                        key={aIndex}
                                        style={styles.input}
                                        placeholder={`Small Aim #${aIndex + 1}`}
                                        value={aim}
                                        onChangeText={(text) => updateAim(goal, text, aIndex)}
                                        multiline={false}
                                    />
                                ))}
                            </View>

                            <Pressable
                                style={styles.addButton}
                                onPress={() => addAim(goal)}
                            >
                                <Text style={styles.addButtonText}>+ Add another aim</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                <View style={styles.spacer} />

                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                    onPress={handleContinue}
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
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
        lineHeight: 24,
    },
    list: {
        gap: 24,
    },
    group: {
        gap: 12,
    },
    goalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    aimsList: {
        gap: 12,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#000',
    },
    addButton: {
        paddingVertical: 8,
    },
    addButtonText: {
        color: '#007AFF',
        fontSize: 16,
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
