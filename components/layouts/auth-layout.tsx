import { ReactNode } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native"
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
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView className="h-full bg-white dark:bg-black" alwaysBounceVertical={false}>
                    <Header title={title} description={description} />
                    <View className="px-6 pt-12 pb-24 gap-y-4">
                        {children}
                    </View>
                    {/* <Text>{JSON.stringify(headerHeight + 47)}</Text> */}
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}