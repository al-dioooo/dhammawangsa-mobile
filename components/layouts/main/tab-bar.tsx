import { tailwind } from "@/references/tailwind"
import { BlurView } from "expo-blur"
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withSpring } from "react-native-reanimated"
import TabBarItem from "@/components/layouts/main/tab-bar-item"
import TabBarButton from "@/components/layouts/main/tab-bar-button"
import { View, StyleSheet } from "react-native"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function TabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
    const colorScheme = useColorScheme()
    const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withSpring(gyroscope.sensor.value.x, { damping: 20 }) },
                { translateX: withSpring(gyroscope.sensor.value.y, { damping: 20 }) }
            ]
        }
    })

    const TabBarBackground = () => {
        return (
            <BlurView tint={colorScheme === 'dark' ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight'} className="absolute inset-x-0 inset-y-0 h-[64] rounded-full overflow-hidden" experimentalBlurMethod="dimezisBlurView" intensity={80} />
        )
    }

    return (
        <Animated.View style={[animatedStyle, { elevation: 5 }]} className="absolute flex-row justify-between items-center h-[64] p-3 rounded-full inset-x-6 bottom-6 shadow-2xl">
            <TabBarBackground />

            {/* Tab Bar Button */}
            <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: "row" }}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key]

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params)
                        }
                    }

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        })
                    }

                    const Button = (props: any) => {
                        if (options.tabBarButton) {
                            return (<options.tabBarButton accessibilityRole="button" accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} {...props} />)
                        } else {
                            return (<TabBarButton accessibilityRole="button" accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} {...props} />)
                        }
                    }

                    const isFocused = state.index === index

                    return (
                        <Button key={index} />
                    )
                })}
            </View>

            {/* Tab Bar Item */}
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key]
                // const label =
                //     options.tabBarLabel !== undefined
                //         ? options.tabBarLabel
                //         : options.title !== undefined
                //             ? options.title
                //             : route.name

                const isFocused = state.index === index

                const TabBarIcon = (props: any) => (<options.tabBarIcon color={isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor} focused={isFocused} {...props} />)

                return (
                    <TabBarItem key={index} badge={options.tabBarBadge} focused={isFocused}>
                        <TabBarIcon />
                    </TabBarItem>
                )
            })}
        </Animated.View>
    )
}