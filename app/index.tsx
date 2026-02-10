import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
    const router = useRouter();

    const features = [
        { title: "1. Write down top 5 goals", desc: "Focus on what matters most." },
        { title: "2. Commit to Small Aims", desc: "Choose 1-3 actions for today." },
        { title: "3. Checkpoints", desc: "Stay on track throughout your day." },
        { title: "4. Daily Review", desc: "Celebrate wins and plan ahead." },
        { title: "5. Repeat", desc: "Consistency beats intensity." },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Aim Small</Text>
                <Text style={styles.subtitle}>
                    Big goals are achieved through small, consistent wins.
                </Text>

                <View style={styles.featuresList}>
                    {features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureDesc}>{feature.desc}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.spacer} />

                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                    onPress={() => router.push('/onboarding/goals')}
                >
                    <Text style={styles.buttonText}>Let's Start</Text>
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
        fontSize: 42,
        fontWeight: '800',
        color: '#000',
        marginBottom: 8,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 40,
        lineHeight: 26,
    },
    featuresList: {
        gap: 24,
    },
    featureItem: {
        gap: 4,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    featureDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    spacer: {
        height: 40,
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
