import { DefaultButton } from "@/components/button"
import Input from "@/components/forms/input"
import { AuthLayout } from "@/components/layouts/auth-layout"
import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function Register() {
    return (
        <AuthLayout title="Get Started" description="Let’s get You signed up to continue.">
            <View>
                <Text>WhatsApp Number</Text>
                <View className="flex-row gap-x-4">
                    <View className="px-8 bg-gray-100 mt-3 rounded-2xl justify-center">
                        <Text className="text-[18px] text-transparent">ID</Text>
                    </View>
                    <Input placeholder="XXX XXXX XXXX" className="mt-3 flex-grow" />
                </View>
            </View>

            <View>
                <Text>Name</Text>
                <Input placeholder="Alice" className="mt-3" />
            </View>

            <View>
                <Text>Password</Text>
                <Input placeholder="********" className="mt-3" />
            </View>

            <View>
                <Text>Password Confirmation</Text>
                <Input placeholder="********" className="mt-3" />
            </View>

            <View className="gap-y-12 mt-8">
                <View>
                    <DefaultButton onPress={() => { }}>
                        <Text className="text-lg text-white">Sign Up</Text>
                    </DefaultButton>
                </View>

                <Text className="text-center">Already have an account? <Link href="/login" className="font-bold text-red-500">Sign in</Link></Text>
                <View className="flex-row items-center">
                    <View className="flex-1 h-[1] bg-neutral-300" />
                    <View className="absolute inset-x-0 items-center">
                        <Text className="bg-white px-4 text-neutral-300">OR</Text>
                    </View>
                </View>
                <Link href="/" className="font-bold text-red-500 text-center">Continue as Guest</Link>
            </View>
        </AuthLayout>
    )
}