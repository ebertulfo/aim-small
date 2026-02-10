import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_GOALS = [
    "Build a SaaS",
    "Run a Marathon",
    "Read 20 Books",
    "Learn Guitar",
    ""
];

export default function ManageGoalsScreen() {
    const router = useRouter();
    const [goals, setGoals] = useState(MOCK_GOALS);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditText(goals[index]);
    };

    const handleSave = () => {
        if (editIndex !== null) {
            const newGoals = [...goals];
            newGoals[editIndex] = editText;
            setGoals(newGoals);
            setEditIndex(null);
        }
    };

    const handleDelete = (index: number) => {
        Alert.alert(
            "Delete Goal?",
            "This will remove the goal and all associated data.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        const newGoals = [...goals];
                        newGoals[index] = "";
                        setGoals(newGoals);
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.title}>Manage Goals</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>Update your Top 5 Goals</Text>

                <View style={styles.list}>
                    {goals.map((goal, index) => (
                        <View key={index} style={styles.item}>
                            <Text style={styles.index}>{index + 1}.</Text>

                            {editIndex === index ? (
                                <View style={styles.editContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={editText}
                                        onChangeText={setEditText}
                                        autoFocus
                                    />
                                    <Pressable onPress={handleSave} style={styles.saveButton}>
                                        <Ionicons name="checkmark" size={20} color="#fff" />
                                    </Pressable>
                                </View>
                            ) : (
                                <View style={styles.displayContainer}>
                                    <Text style={[styles.goalText, !goal && styles.emptyText]}>
                                        {goal || "Empty Slot"}
                                    </Text>
                                    <View style={styles.actions}>
                                        <Pressable onPress={() => handleEdit(index)} style={styles.iconBtn}>
                                            <Ionicons name="pencil" size={20} color="#666" />
                                        </Pressable>
                                        {goal ? (
                                            <Pressable onPress={() => handleDelete(index)} style={styles.iconBtn}>
                                                <Ionicons name="trash-outline" size={20} color="red" />
                                            </Pressable>
                                        ) : (
                                            <Pressable onPress={() => handleEdit(index)} style={styles.iconBtn}>
                                                <Ionicons name="add" size={20} color="blue" />
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <Pressable style={styles.saveChangesButton} onPress={() => router.back()}>
                    <Text style={styles.saveChangesText}>Save Changes</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    content: {
        padding: 24,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    list: {
        gap: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
    },
    index: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
        width: 24,
    },
    displayContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    goalText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    emptyText: {
        color: '#999',
        fontStyle: 'italic',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconBtn: {
        padding: 8,
    },
    editContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 8,
    },
    saveChangesButton: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 40,
    },
    saveChangesText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
