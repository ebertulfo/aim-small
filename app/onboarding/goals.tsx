import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoalsInputScreen() {
    const router = useRouter();
    const [goals, setGoals] = useState<string[]>(['', '', '', '', '']);

    const updateGoal = (text: string, index: number) => {
        const newGoals = [...goals];
        newGoals[index] = text;
        setGoals(newGoals);
    };

    const handleContinue = () => {
        // In a real app, save to storage here.
        // For wireframe, just navigate to next step.
        router.push('/plan/select');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.stepIndicator}>Step 1 of 2</Text>
                <Text style={styles.title}>What are your top 5 goals?</Text>
                <Text style={styles.subtitle}>
                    These are the big things you want to achieve.
                </Text>

                <View style={styles.inputList}>
                    {goals.map((goal, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <Text style={styles.inputIndex}>{index + 1}.</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Goal #${index + 1}`}
                                value={goal}
                                onChangeText={(text) => updateGoal(text, index)}
                                returnKeyType="next"
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
        fontSize: 32,
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
    inputList: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        height: 56,
    },
    inputIndex: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
        marginRight: 12,
        width: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        height: '100%',
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
