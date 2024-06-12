import { BlurView } from "expo-blur"
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withSpring } from "react-native-reanimated"
import TabBarItem from "@/components/layouts/detail/tab-bar-item"
import TabBarButton from "@/components/layouts/detail/tab-bar-button"
import { View, StyleSheet } from "react-native"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function TabBar({ items }: { items: any }) {
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
                {items.map((row: any, index: number) => {
                    const { options } = row

                    const onPress = () => {
                    }

                    const onLongPress = () => {
                    }

                    const Button = (props: any) => {
                        if (options.tabBarButton) {
                            return (<options.tabBarButton accessibilityRole="button" accessibilityState={false ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} {...props} />)
                        } else {
                            return (<TabBarButton accessibilityRole="button" accessibilityState={false ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} {...props} />)
                        }
                    }

                    return (
                        <Button key={index} />
                    )
                })}
            </View>

            {/* Tab Bar Item */}
            {items.map((row: any, index: number) => {
                const { options, isActive } = row

                const TabBarIcon = (props: any) => (<options.icon color={options.tintColor} focused={isActive} {...props} />)

                return (
                    <TabBarItem key={index} badge={options.tabBarBadge} focused={isActive}>
                        <TabBarIcon />
                    </TabBarItem>
                )
            })}
        </Animated.View>
    )
}