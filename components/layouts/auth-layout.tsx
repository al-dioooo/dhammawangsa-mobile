import { ReactNode } from "react"
import { ScrollView, View } from "react-native"
import Header from "./auth/header"

import { StatusBar } from "expo-status-bar"

type Props = {
    children: ReactNode,
    title: string,
    description?: string
}

export const AuthLayout = ({ children, title, description }: Props) => {
    return (
        <>
            <StatusBar style="inverted" animated />
            <ScrollView className="h-full bg-white" alwaysBounceVertical={false}>
                <Header title={title} description={description} />
                <View className="px-6 py-12 gap-y-8">
                    {children}
                </View>
            </ScrollView>
        </>
    )
}