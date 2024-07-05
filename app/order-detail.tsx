import LineInMotionSVG from "@/components/graphics/line-in-motion"
import { DefaultPill } from "@/components/pill"
import { tailwind } from "@/references/tailwind"
import { useState } from "react"
import { Dimensions, FlatList, RefreshControl, ScrollView, Text, TextInput, View, TouchableOpacity, Pressable } from "react-native"

import { IconClipboard, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react-native"
import { useColorScheme } from "@/hooks/useColorScheme"
import Separator from "@/components/separator"
import moment from "moment"

const data = {
    id: "ORD_202406130001",
    name: "Dhammawangsa Store",
    items: [
        {
            name: "Something",
            price: 30000,
            quantity: 2
        }
    ],
    payment: {
        method: "Mandiri Virtual Account",
        quantity: 2,
        subtotal: 60000,
        discount: 0,
        grandTotal: 60000
    },
    date: "2024-06-13"
}

export default function OrderDetail() {
    const colorScheme = useColorScheme()

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const onRefresh = () => {
        setIsRefreshing(true)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    return (
        <ScrollView keyboardDismissMode="interactive" className="min-h-full bg-white dark:bg-black gap-y-4" refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}></RefreshControl>}>
            <View className="px-6 gap-y-8">
                <View className="flex-row justify-between">
                    <View className="gap-y-1">
                        <Text className="font-sans text-xl font-medium dark:text-white">{data.id}</Text>
                        <Text className="font-sans text-neutral-500">{moment(data.date).format('dddd, MMMM D YYYY')}</Text>
                    </View>
                    {/* <Pressable onPress={() => router.push("checkout")}>
                        <IconHeart strokeWidth={2} width={24} height={24} color={tailwind.colors.red[500]} />
                    </Pressable> */}
                </View>
                {/* Separator */}
                <Separator />
                <View className="gap-y-4">
                    <Text className="font-sans text-lg font-medium dark:text-white">Items</Text>
                    <View className="gap-y-8">
                        {data.items.map((row) => (
                            // <Link key={row.name} href="/order-detail" asChild>
                            <Pressable key={row.name} className="flex-row items-end justify-between">
                                <View className="flex-row gap-x-4">
                                    <View style={{ borderCurve: "continuous" }} className="w-[64] overflow-hidden bg-red-500 aspect-square rounded-2xl">
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
                            // </Link>
                        ))}
                    </View>
                </View>
                {/* Separator */}
                <Separator />
                <View className="gap-y-8">
                    <Text className="font-sans text-lg font-medium dark:text-white">Payment Details</Text>
                    <View className="gap-y-4">
                        <View className="flex-row items-center justify-between">
                            <Text>Payment Method</Text>
                            <Text>{data.payment.method}</Text>
                        </View>
                        <Separator />
                        <View className="flex-row items-center justify-between">
                            <Text>Subtotal ({data.payment.quantity} Items)</Text>
                            <Text>{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(data.payment.subtotal)}</Text>
                        </View>
                        {/* <Separator /> */}
                        <View className="flex-row items-center justify-between">
                            <Text>Discount</Text>
                            <Text>{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(data.payment.discount)}</Text>
                        </View>
                        <Separator />
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg">Grand Total</Text>
                            <Text className="text-lg font-bold">{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(data.payment.grandTotal)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}