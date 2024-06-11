import { OutlinedButton } from "@/components/button"
import { ThemedView } from "@/components/themed-view"
// import { useColorScheme } from "@/hooks/useColorScheme"
import { tailwind } from "@/references/tailwind"
import { IconBell, IconDeviceMobile, IconMoon, IconSearch, IconSun } from "@tabler/icons-react-native"
import { useEffect, useRef, useState } from "react"
import { Appearance, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"

import * as Haptics from "expo-haptics"
import { AnimatePresence, MotiView, ScrollView, useAnimationState } from "moti"
import { router } from "expo-router"

export default function Header({ title }: { title?: string | undefined }) {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

    const searchInputRef = useRef<TextInput>()
    const [isSearching, setIsSearching] = useState<boolean | undefined>(false)

    const containerSearchingState = useAnimationState({
        active: {
            paddingTop: 0
        },
        inactive: {
            paddingTop: 56
        }
    })

    const titleSearchingState = useAnimationState({
        active: {
            opacity: 0
        },
        inactive: {
            opacity: 1
        }
    })

    const searchInputPlaceholderState = useAnimationState({
        active: {
            opacity: 0
        },
        inactive: {
            opacity: 1
        }
    })

    useEffect(() => {
        if (isSearching) {
            containerSearchingState.transitionTo('active')
            titleSearchingState.transitionTo('active')
            searchInputPlaceholderState.transitionTo('active')
        } else {
            containerSearchingState.transitionTo('inactive')
            titleSearchingState.transitionTo('inactive')
            searchInputPlaceholderState.transitionTo('inactive')

            // @ts-ignore
            searchInputRef.current.blur()
        }
    }, [isSearching])

    const toggleColorScheme = () => {
        if (Appearance.getColorScheme() === 'light') {
            setColorScheme("dark")
            Appearance.setColorScheme("dark")
        } else {
            setColorScheme("light")
            Appearance.setColorScheme("light")
        }
    }

    const resetColorScheme = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 100)

        setColorScheme(null)
        Appearance.setColorScheme(null)
    }

    const [search, setSearch] = useState<string | undefined>("")

    return (
        <MotiView state={containerSearchingState} transition={{ type: "spring", damping: 20 }} className="justify-end px-6 pt-16 pb-4 bg-white dark:bg-black">
            {/* @ts-ignore */}
            <MotiView state={titleSearchingState} transition={{ type: "spring", damping: 20 }} className="flex-row items-center justify-between w-full">
                <Text className="text-[32px] font-bold dark:text-white font-sans">{title ?? "Page"}</Text>
                {/* <OutlinedButton onPress={() => { }}>
                    <IconBell size={24} color={colorScheme === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                </OutlinedButton> */}
                <OutlinedButton onPress={() => toggleColorScheme()} onLongPress={() => resetColorScheme()}>
                    {colorScheme === 'dark' ? (
                        <IconMoon size={24} color={tailwind.colors.white} />
                    ) : (colorScheme === 'light' ? (
                        <IconSun size={24} color={tailwind.colors.black} />
                    ) : (
                        <IconDeviceMobile size={24} color={Appearance.getColorScheme() === 'dark' ? tailwind.colors.white : tailwind.colors.black} />
                    ))}
                </OutlinedButton>
            </MotiView>
            {/* Search */}
            <View className="flex-row mt-4">
                <View className="flex-row items-center flex-grow px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900">
                    {search === "" && (
                        <MotiView state={searchInputPlaceholderState} className="absolute inset-x-0 inset-y-0 flex-row items-center justify-center px-4 gap-x-2">
                            <IconSearch size={16} color={tailwind.colors.neutral[400]} />
                            <Text className="text-neutral-400">Search</Text>
                        </MotiView>
                    )}
                    {/* @ts-ignore */}
                    <TextInput onSubmitEditing={() => router.push('search')} enterKeyHint="search" ref={searchInputRef} onFocus={() => setIsSearching(true)} onBlur={() => setIsSearching(false)} className="flex-grow py-2 pl-4 font-sans text-left dark:text-white" onChangeText={setSearch} value={search} clearButtonMode="always"></TextInput>
                </View>
                <AnimatePresence initial={false} exitBeforeEnter>
                    {isSearching && (
                        <MotiView from={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 64 }} exit={{ opacity: 0, width: 0 }} transition={{ opacity: { delay: 400 }, type: "spring", damping: 20 }} exitTransition={{ opacity: { delay: 0 } }} className="overflow-hidden">
                            <TouchableOpacity className="flex-row flex-1 justify-center items-center w-[64] pl-4" onPress={() => setIsSearching(false)}>
                                <Text className="inline-block font-sans text-sm font-semibold text-red-500 text-nowrap">Cancel</Text>
                            </TouchableOpacity>
                        </MotiView>
                    )}
                </AnimatePresence>
            </View>

            <AnimatePresence exitBeforeEnter>
                {isSearching && search !== "" && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute h-full inset-x-0 -bottom-[100%]">
                        <ScrollView className="h-full bg-neutral-100">
                            <View className="h-16 my-2 bg-neutral-300"></View>
                            <View className="h-16 my-2 bg-neutral-300"></View>
                            <View className="h-16 my-2 bg-neutral-300"></View>
                        </ScrollView>
                    </MotiView>
                )}
            </AnimatePresence>
        </MotiView>
    )
}