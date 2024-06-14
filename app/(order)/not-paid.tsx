import LineInMotionSVG from "@/components/graphics/line-in-motion"
import { tailwind } from "@/references/tailwind"
import { useState } from "react"
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native"

const data = [
    {
        id: 1,
        name: "Dhammawangsa Store",

        items: [
            {
                name: "Donation",
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
                name: "Donation",
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

export default function NotPaid() {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const onRefresh = () => {
        setIsRefreshing(true)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    return (
        <ScrollView keyboardDismissMode="interactive" className="min-h-full bg-white dark:bg-black gap-y-4" refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}></RefreshControl>}>
            <View className="gap-y-4">
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
                                        <Text className="dark:text-white">x{row.quantity}</Text>
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