import { useColorScheme } from "@/hooks/useColorScheme"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { SplashScreen, Stack } from "expo-router"

import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins"
import { useEffect } from "react"

import '@/assets/styles/global.css'
import SimpleHeader from "@/components/layouts/simple-header"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()

    const [loaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="search" options={{ headerShown: false }} />
                <Stack.Screen name="detail" options={{ headerShown: false }} />
                <Stack.Screen name="info" options={{ title: process.env.EXPO_PUBLIC_APP_NAME, header: (props) => <SimpleHeader title={props.options.title} subtitle={'v' + process.env.EXPO_PUBLIC_APP_VERSION} /> }} />
                <Stack.Screen name="checkout" options={{ title: "Order Summary", header: (props) => <SimpleHeader title={props.options.title} /> }} />
                <Stack.Screen name="(order)" options={{ title: "Your Order", header: (props) => <SimpleHeader title={props.options.title} /> }} />
                <Stack.Screen name="order-detail" options={{ title: "Order Detail", header: (props) => <SimpleHeader title={props.options.title} /> }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false, presentation: "modal", gestureEnabled: false }} />
            </Stack>
        </ThemeProvider>
    )
}
