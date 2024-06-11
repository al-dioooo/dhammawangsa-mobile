import { ReactNode } from 'react'
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withSpring } from 'react-native-reanimated'

interface TabBarIconProps {
    className?: string,
    focused: boolean,
    children: ReactNode
}

export function TabBarIcon({ className, focused, children }: TabBarIconProps) {
    const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: withSpring(gyroscope.sensor.value.x * 2, { damping: 20 }) },
                { translateX: withSpring(gyroscope.sensor.value.y * 2, { damping: 20 }) }
            ]
        }
    })

    return (
        <Animated.View style={focused ? animatedStyle : {}}>
            {children}
        </Animated.View>
    )
}
