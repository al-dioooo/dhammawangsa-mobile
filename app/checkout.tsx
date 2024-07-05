import { DefaultButton } from "@/components/button"
import LineInMotionSVG from "@/components/graphics/line-in-motion"
import Separator from "@/components/separator"
import { tailwind } from "@/references/tailwind"
import { useEffect, useState } from "react"
import { Dimensions, FlatList, RefreshControl, ScrollView, Text, View } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

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

export default function Checkout() {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const [quantity, setQuantity] = useState<number>(0)
    const [subtotal, setSubtotal] = useState<number>(0)
    const [grandTotal, setGrandTotal] = useState<number>(0)

    const onRefresh = () => {
        setIsRefreshing(true)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    useEffect(() => {
        let quantity = 0
        let subtotal = 0
        let grandTotal = 0

        data.map((row) => {
            row.items.map((item) => {
                quantity += item.quantity
                subtotal += (item.price * item.quantity)
            })
        })

        // Temporary logic
        grandTotal = subtotal

        setQuantity(quantity)
        setSubtotal(subtotal)
        setGrandTotal(grandTotal)
    }, [])

    type BottomSheetProps = {
        title: string
    }

    const BottomSheet = ({ title }: BottomSheetProps) => {
        const gesture = Gesture.Pan()

        return (
            <View style={{ borderCurve: "continuous" }} className="absolute bottom-0 h-96 pt-6 px-6 z-10 w-full bg-white shadow-lg shadow-black/20 rounded-t-[3rem]">
                <GestureHandlerRootView className="absolute inset-x-0">
                    <GestureDetector gesture={gesture}>
                        <View className="self-center w-20 h-1 -mt-4 rounded-full bg-neutral-300"></View>
                    </GestureDetector>
                </GestureHandlerRootView>
                <View>
                    <Text className="text-2xl font-semibold dark:text-white">{title}</Text>
                </View>
                <View className="mt-16 gap-y-4">
                    <View className="flex-row items-center justify-between">
                        <Text>Subtotal ({quantity} Items)</Text>
                        <Text>{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(subtotal)}</Text>
                    </View>
                    <Separator />
                    <View className="flex-row items-center justify-between">
                        <Text>Discount</Text>
                        <Text>{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(0)}</Text>
                    </View>
                    <Separator />
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg">Grand Total</Text>
                        <Text className="text-lg font-bold">{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(grandTotal)}</Text>
                    </View>
                </View>
                <View className="absolute inset-x-0 bottom-0 px-6 pb-6">
                    <DefaultButton onPress={() => { }}>
                        <Text className="font-sans text-lg text-white">Proceed Payment</Text>
                    </DefaultButton>
                </View>
            </View>
        )
    }

    return (
        <>
            {/* <ScrollView keyboardDismissMode="interactive" className="min-h-full bg-white dark:bg-black gap-y-4" refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}></RefreshControl>}>
                <View className="gap-y-4">
                    
                </View>
            </ScrollView> */}
            <FlatList keyboardDismissMode="interactive" className="min-h-full pt-4 bg-white dark:bg-black" refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}></RefreshControl>} data={data} renderItem={({ item }) => (
                <View className="px-6 gap-y-2">
                    <Text className="font-bold dark:text-white">{item.name}</Text>
                    <View className="gap-y-8">
                        {item.items.map((row) => (
                            <View key={row.name} className="flex-row items-end justify-between">
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
                            </View>
                        ))}
                    </View>
                </View>
            )} ItemSeparatorComponent={() => (
                <View className="w-[70%] h-[1] my-8 bg-neutral-100 dark:bg-neutral-900 self-end"></View>
            )} />
            <BottomSheet title="Order Summary" />
        </>
    )
}