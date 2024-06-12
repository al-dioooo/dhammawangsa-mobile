import { OutlinedButton } from "@/components/button"
import { ThemedView } from "@/components/themed-view"
// import { useColorScheme } from "@/hooks/useColorScheme"
import { tailwind } from "@/references/tailwind"
import { IconBell, IconChevronLeft, IconDeviceMobile, IconMoon, IconSearch, IconShoppingBag, IconSun } from "@tabler/icons-react-native"
import { useEffect, useRef, useState } from "react"
import { Appearance, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"

import * as Haptics from "expo-haptics"
import { AnimatePresence, MotiView, ScrollView, useAnimationState } from "moti"
import { router } from "expo-router"
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types"

export default function Header(props: NativeStackNavigatorProps) {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

    return (
        <MotiView transition={{ type: "spring", damping: 20 }} className="absolute justify-end px-6 pt-16 pb-4">
            {/* @ts-ignore */}
            <MotiView transition={{ type: "spring", damping: 20 }} className="flex-row items-center justify-between w-full">
                <OutlinedButton onPress={() => router.back()}>
                    <IconChevronLeft size={24} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                </OutlinedButton>
                <OutlinedButton onPress={() => { }}>
                    <IconShoppingBag size={24} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                </OutlinedButton>
            </MotiView>
        </MotiView>
    )
}