import { OutlinedButton } from "@/components/button"
import { tailwind } from "@/references/tailwind"
import { IconChevronLeft } from "@tabler/icons-react-native"
import { Text, View } from "react-native"

import { MotiView } from "moti"
import { router } from "expo-router"
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types"
import { useColorScheme } from "@/hooks/useColorScheme"

type Props = NativeStackNavigatorProps & {
    subtitle?: string | undefined
}

export default function SimpleHeader({ title, subtitle }: Props) {
    const colorScheme = useColorScheme()

    return (
        <MotiView transition={{ type: "spring", damping: 20 }} className="justify-end px-6 pt-16 pb-4 bg-white dark:bg-black">
            {/* @ts-ignore */}
            <MotiView transition={{ type: "spring", damping: 20 }} className="flex-row items-center justify-between w-full">
                <OutlinedButton onPress={() => router.back()}>
                    <IconChevronLeft size={24} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                </OutlinedButton>
                <View className="absolute inset-x-0 flex-row items-center justify-center pointer-events-none">
                    <View className="items-center">
                        <Text className="font-sans text-xl dark:text-white">{title}</Text>
                        {subtitle && (<Text className="font-sans text-xs text-neutral-500">{subtitle}</Text>)}
                    </View>
                </View>
            </MotiView>
        </MotiView>
    )
}