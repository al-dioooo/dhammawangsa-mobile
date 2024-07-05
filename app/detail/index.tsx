import LineInMotionSVG from "@/components/graphics/line-in-motion"
import { DefaultPill } from "@/components/pill"
import { tailwind } from "@/references/tailwind"
import { Pressable, Text, View } from "react-native"

import { IconHeart } from "@tabler/icons-react-native"
import { DetailLayout } from "@/components/layouts/detail-layout"
import Separator from "@/components/separator"
import { router } from "expo-router"

const data = {
    category: "A Category",
    name: "An Item: Something",
    price: 30000,
    attributes: [
        {
            id: 1,
            name: "Color",
            selections: [
                {
                    id: 1,
                    name: "White"
                },
                {
                    id: 2,
                    name: "Black"
                }
            ],
        },
        {
            id: 2,
            name: "Storage",
            selections: [
                {
                    id: 1,
                    name: "256GB"
                },
                {
                    id: 2,
                    name: "512GB"
                },
                {
                    id: 3,
                    name: "1TB"
                },
                {
                    id: 4,
                    name: "2TB"
                }
            ],
        }
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque iure commodi placeat consequatur assumenda ipsam possimus deserunt nesciunt? A molestias nobis culpa quos consequatur delectus id necessitatibus similique adipisci iste.",
    store: {
        id: 1,
        name: "A Store",
        phone: "+XX XXXX XXXX XXXX"
    }
}

export default function Detail() {
    const HeaderImage = () => (
        <View style={{ borderCurve: "continuous" }} className="w-full overflow-hidden bg-red-500 aspect-square">
            <LineInMotionSVG color={tailwind.colors.red[300]} />
        </View>
    )

    return (
        <DetailLayout headerImage={<HeaderImage />}>
            <View className="min-h-full px-6 pt-6 gap-y-8">
                <View className="flex-row justify-between">
                    <View className="gap-y-1">
                        <Text className="font-sans text-neutral-500">{data.category}</Text>
                        <Text className="font-sans text-xl font-medium dark:text-white">{data.name}</Text>
                        <Text className="font-sans text-xl font-semibold text-red-500">{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(data.price)}</Text>
                    </View>
                    <Pressable onPress={() => router.push("checkout")}>
                        <IconHeart strokeWidth={2} width={24} height={24} color={tailwind.colors.red[500]} />
                    </Pressable>
                </View>
                {/* Separator */}
                <Separator />
                <View className="gap-y-4">
                    {data.attributes.map((row) => (
                        <View key={row.id} className="gap-y-2">
                            <Text className="font-sans font-medium dark:text-white">{row.name}</Text>
                            <View className="flex-row gap-x-4">
                                {row.selections.map((variant, index) => (
                                    <DefaultPill active={index === 0} key={variant.id}>
                                        <Text className={`${index === 0 ? 'text-white' : ''} font-sans text-sm dark:text-white`}>{variant.name}</Text>
                                    </DefaultPill>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                {/* Separator */}
                <Separator />
                <View className="gap-y-4">
                    <Text className="font-sans font-medium dark:text-white">Description</Text>
                    <Text className="font-sans text-neutral-500">{data.description}</Text>
                </View>
                {/* Separator */}
                <Separator />
                <View className="flex-row items-center gap-x-4">
                    <View style={{ borderCurve: "continuous" }} className="w-[72] overflow-hidden bg-red-500 aspect-square rounded-2xl">
                        <LineInMotionSVG color={tailwind.colors.red[300]} />
                    </View>
                    <View className="gap-y-1">
                        <Text className="text-xl font-semibold dark:text-white">{data.store.name}</Text>
                        <Text className="text-sm text-neutral-500">{data.store.phone}</Text>
                    </View>
                </View>
            </View>
        </DetailLayout>
    )
}