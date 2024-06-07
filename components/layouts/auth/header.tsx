import { Text, View } from "react-native"

type Props = {
    title: string,
    description?: string
}

export default function Header({ title, description }: Props) {
    return (
        <View className="bg-neutral-100 py-16">
            <Text className="text-[32px] text-center font-bold dark:text-white font-sans">{title}</Text>
            <Text className="text-[16px] text-center font-sans text-neutral-500 mt-4">{description}</Text>
        </View>
    )
}