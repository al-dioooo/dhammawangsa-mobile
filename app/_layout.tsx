import { useColorScheme } from "@/hooks/useColorScheme"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { SplashScreen, Stack } from "expo-router"

import { Poppins_400Regular, Poppins_700Bold, useFonts } from "@expo-google-fonts/dev"
import { useEffect } from "react"

import '@/assets/styles/global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()

    const [loaded] = useFonts({
        Poppins_400Regular,
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
                <Stack.Screen name="index" />
                <Stack.Screen name="login" options={{ headerShown: false, presentation: "modal" }} />
                <Stack.Screen name="register" options={{ headerShown: false, presentation: "modal" }} />
            </Stack>
        </ThemeProvider>
    )
}
