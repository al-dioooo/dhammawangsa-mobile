import LineInMotionSVG from "@/components/graphics/line-in-motion"
import { DefaultPill } from "@/components/pill"
import { tailwind } from "@/references/tailwind"
import { useState } from "react"
import { Dimensions, FlatList, RefreshControl, ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native"

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react-native"
import { useColorScheme } from "@/hooks/useColorScheme"

const data = [
    {
        id: 1,
        name: "Dhammawangsa Store",

        items: [
            {
                name: "Something",
                price: 30000,
                quantity: 2
            }
        ]
    },
    {
        id: 2,
        name: "Evergarden",

        items: [
            {
                name: "Something",
                price: 30000,
                quantity: 2
            },
            {
                name: "A Piece of Cake",
                price: 45000,
                quantity: 1
            }
        ]
    }
]

export default function Bag() {
    const colorScheme = useColorScheme()

    const tabBarHeight = useBottomTabBarHeight()

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const onRefresh = () => {
        setIsRefreshing(true)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    return (
        <ScrollView keyboardDismissMode="interactive" contentContainerStyle={{ paddingBottom: tabBarHeight * 1.5 }} className="min-h-full bg-white dark:bg-black gap-y-4" refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}></RefreshControl>}>
            <View className="gap-y-4">
                <View className="self-end mr-6"><TouchableOpacity onPress={() => { }}><Text className="font-sans text-sm font-semibold text-red-500">Clear</Text></TouchableOpacity></View>
                <FlatList data={data} renderItem={({ item }) => (
                    <View className="px-6 gap-y-2">
                        <Text className="font-bold dark:text-white">{item.name}</Text>
                        <View className="gap-y-8">
                            {item.items.map((row) => (
                                <View className="flex-row items-end justify-between">
                                    <View key={item.id} className="flex-row gap-x-4">
                                        <View style={{ borderCurve: "continuous" }} className="w-[84] overflow-hidden bg-red-500 aspect-square rounded-2xl">
                                            <LineInMotionSVG color={tailwind.colors.red[300]} />
                                        </View>
                                        <View className="justify-between">
                                            <Text className="dark:text-white">{row.name}</Text>
                                            <Text className="text-lg font-medium dark:text-white">{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(row.price)}</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center">
                                        <View className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800">{row.quantity === 1 ? (
                                            <IconTrash width={20} height={20} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} strokeWidth={1.5} />
                                        ) : (
                                            <IconMinus width={20} height={20} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} strokeWidth={1.5} />
                                        )}</View>
                                        <TextInput inputMode="numeric" className="w-16 px-2 text-center">
                                            <Text className="dark:text-white">{row.quantity}</Text>
                                        </TextInput>
                                        <View className="p-2 bg-red-500 rounded-full">
                                            <IconPlus width={20} height={20} color={tailwind.colors.white} strokeWidth={1.5}></IconPlus>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )} ItemSeparatorComponent={() => (
                    <View className="w-[70%] h-[1] my-8 bg-neutral-100 dark:bg-neutral-900 self-end"></View>
                )} />
            </View>
        </ScrollView>
    )
}