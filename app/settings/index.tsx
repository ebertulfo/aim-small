import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const router = useRouter();
    const [reminders, setReminders] = useState({
        morning: true,
        afternoon: true,
        evening: true,
    });

    const toggle = (key: keyof typeof reminders) => {
        setReminders(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleClearData = () => {
        Alert.alert(
            "Clear All Data?",
            "This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => console.log('Deleted') }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.title}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Manage Goals Access */}
                <Pressable
                    style={styles.sectionButton}
                    onPress={() => router.push('/settings/goals')}
                >
                    <View style={styles.iconBox}>
                        <Ionicons name="list" size={20} color="#000" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.sectionButtonTitle}>Manage Goals</Text>
                        <Text style={styles.sectionButtonDesc}>Edit or delete your top 5 goals</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </Pressable>

                <Text style={styles.sectionHeader}>Notifications</Text>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Morning Reminder (8:00 AM)</Text>
                        <Switch
                            value={reminders.morning}
                            onValueChange={() => toggle('morning')}
                            trackColor={{ false: '#eee', true: '#000' }}
                        />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Afternoon Check-in (12:00 PM)</Text>
                        <Switch
                            value={reminders.afternoon}
                            onValueChange={() => toggle('afternoon')}
                            trackColor={{ false: '#eee', true: '#000' }}
                        />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Evening Review (8:00 PM)</Text>
                        <Switch
                            value={reminders.evening}
                            onValueChange={() => toggle('evening')}
                            trackColor={{ false: '#eee', true: '#000' }}
                        />
                    </View>
                </View>

                <Text style={styles.sectionHeader}>Data</Text>
                <View style={styles.card}>
                    <Pressable style={styles.row}>
                        <Text style={styles.label}>Export Data</Text>
                        <Ionicons name="download-outline" size={20} color="#000" />
                    </Pressable>
                    <View style={styles.divider} />
                    <Pressable style={styles.row} onPress={handleClearData}>
                        <Text style={[styles.label, { color: 'red' }]}>Clear All Data</Text>
                        <Ionicons name="trash-outline" size={20} color="red" />
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.version}>Aim Small v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
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
        gap: 24,
    },
    sectionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        gap: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionButtonTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    sectionButtonDesc: {
        fontSize: 13,
        color: '#666',
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 16,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    version: {
        color: '#999',
        fontSize: 14,
    },
});
