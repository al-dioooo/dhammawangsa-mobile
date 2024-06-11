import LineInMotionBigSVG from "@/components/graphics/line-in-motion-big"
import { useColorScheme } from "@/hooks/useColorScheme"
import { tailwind } from "@/references/tailwind"
import { Text, View } from "react-native"

type Props = {
    title: string,
    description?: string
}

export default function Header({ title, description }: Props) {
    const colorScheme = useColorScheme()

    return (
        <View className="py-16">
            <View className="absolute flex-[1] inset-x-0 inset-y-0 overflow-hidden">
                <View className="aspect-square">
                    <LineInMotionBigSVG color={colorScheme === 'dark' ? tailwind.colors.neutral[900] : tailwind.colors.neutral[100]} />
                </View>
            </View>
            <Text className="text-[32px] text-center font-bold dark:text-white font-sans">{title}</Text>
            <Text className="text-[16px] text-center font-sans text-neutral-500 mt-4">{description}</Text>
        </View>
    )
}