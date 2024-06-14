import { DefaultButton } from "@/components/button"
import Input from "@/components/forms/input"
import { AuthLayout } from "@/components/layouts/auth-layout"
import { Link, router } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function Login() {
    return (
        <AuthLayout title="Sign In" description="Please sign-in using registered account.">
            <View>
                <Text className="font-sans">WhatsApp Number</Text>
                <View className="flex-row gap-x-4">
                    <View className="justify-center px-8 mt-3 bg-gray-100 dark:bg-neutral-900 rounded-2xl">
                        <Text className="font-sans text-transparent">ID</Text>
                    </View>
                    <Input placeholder="XXX XXXX XXXX" className="flex-grow mt-3" />
                </View>
            </View>

            <View>
                <Text className="font-sans">Password</Text>
                <Input placeholder="********" className="mt-3" />
            </View>

            <View className="mt-8 gap-y-12">
                <View>
                    <DefaultButton onPress={() => { }}>
                        <Text className="font-sans text-lg text-white">Sign In</Text>
                    </DefaultButton>
                </View>

                <Text className="font-sans text-center dark:text-white">Don't have an account? <Link href="/register" replace className="font-sans font-bold text-red-500">Sign up</Link></Text>
                <View className="flex-row items-center">
                    <View className="flex-1 h-[1] bg-neutral-300 dark:bg-neutral-700" />
                    <View className="absolute inset-x-0 items-center">
                        <Text className="px-4 font-sans bg-white dark:bg-black text-neutral-300 dark:text-neutral-700">OR</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => router.back()}><Text className="font-sans font-bold text-center text-red-500">Continue as Guest</Text></TouchableOpacity>
            </View>
        </AuthLayout>
    )
}