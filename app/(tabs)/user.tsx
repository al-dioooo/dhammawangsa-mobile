import LineInMotionSVG from "@/components/graphics/line-in-motion"
import { DefaultPill } from "@/components/pill"
import { tailwind } from "@/references/tailwind"
import { useState } from "react"
import { Dimensions, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native"

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { IconBoxSeam, IconInfoCircle, IconPencil } from "@tabler/icons-react-native"
import { router } from "expo-router"
import { useColorScheme } from "@/hooks/useColorScheme"
import Separator from "@/components/separator"

export default function User() {
    const colorScheme = useColorScheme()

    const tabBarHeight = useBottomTabBarHeight()

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | undefined>(0)

    const onRefresh = () => {
        setIsRefreshing(true)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    const screenWidth = Dimensions.get('window').width
    const numColumns = 2
    const gap = 16

    const availableSpace = screenWidth - 48 - (numColumns - 1) * gap
    const itemSize = availableSpace / numColumns

    return (
        <ScrollView keyboardDismissMode="interactive" contentContainerStyle={{ paddingBottom: tabBarHeight * 1.5 }} className="min-h-full bg-white dark:bg-black gap-y-4" refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}></RefreshControl>}>
            <View className="px-6 gap-y-8">
                <View className="flex-row gap-x-4">
                    <View style={{ borderCurve: "continuous" }} className="w-[72] overflow-hidden bg-red-500 aspect-square rounded-2xl">
                        <LineInMotionSVG color={tailwind.colors.red[300]} />
                    </View>
                    <View className="justify-between">
                        <View>
                            <Text className="text-xl font-semibold dark:text-white">Alice Evergarden</Text>
                            <Text className="text-sm text-neutral-500">+XX XXXX XXXX XXXX</Text>
                        </View>
                        <Text className="text-sm text-neutral-500">No pending order available</Text>
                    </View>
                </View>

                <Separator />

                <View className="gap-y-4">
                    <View className="flex-row items-center gap-x-4">
                        <View className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
                            <IconPencil strokeWidth={1.5} width={20} height={20} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                        </View>
                        <Text className="dark:text-white">Edit Profile</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/(order)/not-paid')} className="flex-row items-center gap-x-4">
                        <View className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
                            <IconBoxSeam strokeWidth={1.5} width={20} height={20} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                        </View>
                        <Text className="dark:text-white">Your Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/info')} className="flex-row items-center gap-x-4">
                        <View className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
                            <IconInfoCircle strokeWidth={1.5} width={20} height={20} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                        </View>
                        <Text className="dark:text-white">App Information</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}