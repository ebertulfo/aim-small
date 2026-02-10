import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoalsInputScreen() {
    const router = useRouter();
    const [goal, setGoal] = useState('');

    const handleContinue = () => {
        if (!goal.trim()) return;

        router.push({
            pathname: '/plan/aims',
            params: { goals: JSON.stringify([goal]) }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.stepIndicator}>Step 1 of 2</Text>
                <Text style={styles.title}>It all starts with one thing.</Text>
                <Text style={styles.subtitle}>
                    This is a big thing you want to achieve. We'll start with one and add more later.
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Run a Marathon"
                        value={goal}
                        onChangeText={setGoal}
                        returnKeyType="done"
                    />
                </View>

                <View style={styles.spacer} />

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        !goal.trim() && styles.buttonDisabled,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={handleContinue}
                    disabled={!goal.trim()}
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
    inputContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        height: 56,
        justifyContent: 'center',
    },
    input: {
        fontSize: 18,
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
    buttonDisabled: {
        backgroundColor: '#ccc',
        shadowOpacity: 0,
        elevation: 0,
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
