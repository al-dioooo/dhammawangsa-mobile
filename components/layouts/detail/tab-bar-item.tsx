import { Text, View } from "react-native"
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withSpring } from "react-native-reanimated"

type Props = {
    badge?: string | number | null | undefined,
    focused: boolean,
    children: any
}

export default function TabBarItem({ badge, focused, children, ...rest }: Props) {
    const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withSpring(gyroscope.sensor.value.x * 2, { damping: 20 }) },
                { translateX: withSpring(gyroscope.sensor.value.y * 2, { damping: 20 }) }
            ]
        }
    })

    const Badge = ({ badge }: { badge: string | number | null | undefined }) => {
        return (
            <Animated.View style={[focused ? animatedStyle : {}]} className="absolute z-10 -top-1 left-10">
                <View className={`${focused ? 'bg-white' : 'bg-red-500'} px-1 min-w-6 h-6 items-center justify-center rounded-full`}>
                    <Text className={`${focused ? 'text-red-500' : 'text-white'}`}>{badge}</Text>
                </View>
            </Animated.View>
        )
    }

    return (
        <View className="pointer-events-none">
            {badge && (<Badge badge={badge} />)}
            <Animated.View style={[focused ? animatedStyle : {}]} className={`${focused ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'border border-neutral-200 dark:border-neutral-800'} p-3 rounded-full`} {...rest}>{children}</Animated.View>
        </View>
    )
}