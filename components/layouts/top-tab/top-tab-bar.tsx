import { tailwind } from "@/references/tailwind"
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs"
import { MotiView, useAnimationState } from "moti"
import { useMotiPressable } from "moti/interactions"
import { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Animated from "react-native-reanimated"

const TopTabBar = ({ state, descriptors, navigation, position }: MaterialTopTabBarProps) => {
    return (
        <View className="px-6 bg-white dark:bg-black">
            <View className="flex-row p-1 rounded-full bg-neutral-100 gap-x-2">
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name

                    const isFocused = state.index === index

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

                    const inputRange = state.routes.map((_, i) => i)
                    // const opacity = position.interpolate({
                    //     inputRange,
                    //     outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                    // })

                    const itemState = useAnimationState({
                        inactive: {
                            backgroundColor: tailwind.colors.transparent
                        },
                        active: {
                            backgroundColor: tailwind.colors.red[500]
                        }
                    })

                    useEffect(() => {
                        if (isFocused) {
                            itemState.transitionTo("active")
                        } else {
                            itemState.transitionTo("inactive")
                        }
                    }, [isFocused])

                    const Badge = ({ badge }: { badge: string | number | null | undefined }) => {
                        return (
                            //<Animated.View>
                            <View className={`${isFocused ? 'bg-white' : 'bg-red-500'} px-1 min-w-6 h-6 items-center justify-center rounded-full`}>
                                <Text className={`${isFocused ? 'text-red-500' : 'text-white'}`}>{badge}</Text>
                            </View>
                            //</Animated.View>
                        )
                    }

                    return (
                        <TouchableOpacity key={`${route.name}_${index}`} accessibilityRole="button" accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} onLongPress={onLongPress} style={{ flex: 1 }}>
                            <MotiView state={itemState} className={`flex-row items-center justify-center py-2 gap-x-4 rounded-full`}>
                                <Text className={`${isFocused ? 'text-white' : ''} dark:text-white font-sans`}>
                                    {/* @ts-ignore */}
                                    {label}
                                </Text>
                                <Badge badge={1} />
                            </MotiView>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default TopTabBar