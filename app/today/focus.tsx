import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FocusModeScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const title = params.title as string || "Goal";
    const initialAims = params.aims ? JSON.parse(params.aims as string) : [];

    const [aims, setAims] = useState(initialAims);

    const toggleAim = (id: string) => {
        setAims(aims.map((aim: any) =>
            aim.id === id ? { ...aim, done: !aim.done } : aim
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.eyebrow}>FOCUS MODE</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.divider} />

                <ScrollView contentContainerStyle={styles.list}>
                    {aims.map((aim: any) => (
                        <Pressable
                            key={aim.id}
                            style={styles.item}
                            onPress={() => toggleAim(aim.id)}
                        >
                            <View style={[styles.checkbox, aim.done && styles.checkboxDone]}>
                                {aim.done && <Ionicons name="checkmark" size={20} color="#fff" />}
                            </View>
                            <Text style={[styles.aimText, aim.done && styles.aimTextDone]}>
                                {aim.text}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.buttonText}>Close Focus Mode</Text>
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
    header: {
        marginTop: 20,
        alignItems: 'center',
    },
    eyebrow: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#888',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        width: '100%',
        marginVertical: 24,
    },
    list: {
        gap: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxDone: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    aimText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    aimTextDone: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    button: {
        backgroundColor: '#eee',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});
