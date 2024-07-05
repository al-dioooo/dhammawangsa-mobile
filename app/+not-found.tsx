import { Link, Stack, usePathname } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

export default function NotFoundScreen() {
    const pathName = usePathname()

    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <ThemedView style={styles.container}>
                <ThemedText type="title">This screen doesn't exist.</ThemedText>
                <View style={{ borderCurve: "continuous" }} className="self-start px-6 py-1 mt-8 rounded-xl bg-neutral-100 dark:bg-neutral-900">
                    <ThemedText>{pathName}</ThemedText>
                </View>
                <Link href="/" style={styles.link}>
                    <ThemedText type="link">Go to home screen!</ThemedText>
                </Link>
                <Link href="/_sitemap">
                    <ThemedText type="link">See route list</ThemedText>
                </Link>
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
})