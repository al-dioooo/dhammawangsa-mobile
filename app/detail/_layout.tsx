import Header from "@/components/layouts/detail/header"
import { Stack } from "expo-router"

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ header: (props) => <Header {...props} /> }} />
        </Stack>
    )
}
