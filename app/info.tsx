import LineInMotionSVG from "@/components/graphics/line-in-motion"
import { DefaultPill } from "@/components/pill"
import { tailwind } from "@/references/tailwind"
import { useState } from "react"
import { Dimensions, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native"

import { IconBoxSeam, IconInfoCircle, IconPencil } from "@tabler/icons-react-native"
import { router } from "expo-router"
import LineInMotionBigSVG from "@/components/graphics/line-in-motion-big"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function Info() {
    const colorScheme = useColorScheme()

    const currentYear = new Date().getFullYear()

    return (
        <View className="min-h-full bg-white dark:bg-black gap-y-4">
            <View className="justify-center m-16 overflow-hidden rounded-full">
                <View className="aspect-square">
                    <LineInMotionBigSVG color={colorScheme === 'dark' ? tailwind.colors.neutral[800] : tailwind.colors.neutral[200]} />
                </View>
            </View>
            <View className="items-center">
                <Text className="font-sans text-sm text-neutral-500">&copy; {currentYear} Bloomreef Dev</Text>
            </View>
        </View>
    )
}