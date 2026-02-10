import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SetAimsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Parse goals or fallback to mock if direct navigation
    const goals = params.goals
        ? JSON.parse(params.goals as string)
        : ["Build a SaaS", "Run a Marathon"];

    const [aims, setAims] = useState<Record<string, string>>({});

    const updateAim = (goal: string, text: string) => {
        setAims(prev => ({ ...prev, [goal]: text }));
    };

    const handleContinue = () => {
        router.push('/plan/summary');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.stepIndicator}>Step 2 of 2</Text>
                <Text style={styles.title}>Commit to Small Aims</Text>
                <Text style={styles.subtitle}>
                    What small action can you take today for each goal?
                </Text>

                <View style={styles.list}>
                    {goals.map((goal: string, index: number) => (
                        <View key={index} style={styles.group}>
                            <Text style={styles.goalLabel}>{goal}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Write 50 lines of code"
                                value={aims[goal] || ''}
                                onChangeText={(text) => updateAim(goal, text)}
                                multiline
                            />
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
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#000',
        minHeight: 100, // Make it look like a textarea
        textAlignVertical: 'top',
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
