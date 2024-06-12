import type { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated'

import { ThemedView } from '@/components/themed-view'

const HEADER_HEIGHT = 250

type Props = PropsWithChildren<{
    headerImage: ReactNode
    headerWidth?: number | string | undefined,
    headerBackgroundColor: { dark: string; light: string }
}>

export default function ParallaxScrollView({
    children,
    headerImage,
    headerWidth,
    headerBackgroundColor,
}: Props) {
    const colorScheme = useColorScheme() ?? 'light'
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        }
    })

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView contentContainerStyle={{ paddingBottom: 79 }} ref={scrollRef} scrollEventThrottle={16}>
                <Animated.View
                    style={[
                        {
                            // @ts-ignore
                            height: headerWidth ?? 250,
                            overflow: 'hidden',
                        },
                        { backgroundColor: headerBackgroundColor[colorScheme] },
                        headerAnimatedStyle,
                    ]}>
                    {headerImage}
                </Animated.View>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,
        borderCurve: "continuous",
        marginTop: -42,
        minWidth: "100%",
        paddingBottom: 32
    },
})
