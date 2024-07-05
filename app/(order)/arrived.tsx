import LineInMotionSVG from "@/components/graphics/line-in-motion"
import Separator from "@/components/separator"
import { tailwind } from "@/references/tailwind"
import { Link } from "expo-router"
import moment from "moment"
import { useState } from "react"
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native"

const data = [
    {
        id: "ORD_20240612",
        date: "2024-06-12",
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

export default function Arrived() {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const onRefresh = () => {
        setIsRefreshing(true)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    return (
        <FlatList keyboardDismissMode="interactive" className="min-h-full px-4 pt-6 bg-white dark:bg-black" refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}></RefreshControl>} data={data} renderItem={({ item }) => (
            <View className="px-4 pt-4 pb-4 border gap-y-6 border-neutral-200 dark:border-neutral-800 rounded-3xl">
                <View className="flex-row items-center justify-between">
                    <View className="gap-y-1">
                        <Text className="text-xl font-semibold dark:text-white">{item.id}</Text>
                        <Text className="text-neutral-500">{moment(item.date).format('dddd, MMMM D YYYY')}</Text>
                    </View>
                </View>
                <Separator />
                <View className="gap-y-8">
                    {item.items.map((row) => (
                        <Link key={row.name} href="/order-detail" asChild>
                            <Pressable className="flex-row items-end justify-between">
                                <View className="flex-row gap-x-4">
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
                            </Pressable>
                        </Link>
                    ))}
                </View>
            </View>
        )} ItemSeparatorComponent={() => (
            <View className="w-full h-[1] my-8 bg-neutral-100 dark:bg-neutral-900 self-end"></View>
        )} />
    )
}