import { TabBarIcon } from "@/components/layouts/main/tab-bar-icon"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Tabs, useRouter } from "expo-router"

import { IconComponents, IconHeart, IconPlanet, IconShoppingBag, IconUser } from '@tabler/icons-react-native'
import TabBar from "@/components/layouts/main/tab-bar"
import { tailwind } from "@/references/tailwind"
import Header from "@/components/layouts/main/header"
import TabBarButton from "@/components/layouts/main/tab-bar-button"

import * as Haptics from "expo-haptics"

export default function TabLayout() {
    const colorScheme = useColorScheme()
    const router = useRouter()

    return (
        <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ header: (props) => <Header title={props.options.title} />, tabBarActiveTintColor: tailwind?.colors.white, tabBarInactiveTintColor: colorScheme === 'dark' ? tailwind.colors.neutral[400] : tailwind?.colors.neutral[600] }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Discover',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon focused={focused}>
                            <IconPlanet strokeWidth={1.5} size={28} color={color} />
                        </TabBarIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="wishlist"
                options={{
                    title: 'Wishlist',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon focused={focused}>
                            <IconHeart strokeWidth={1.5} size={28} color={color} />
                        </TabBarIcon>
                    )
                }}
            />
            <Tabs.Screen
                name="bag"
                options={{
                    title: 'Bag',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon focused={focused}>
                            <IconShoppingBag strokeWidth={1.5} size={28} color={color} />
                        </TabBarIcon>
                    )
                }}
            />
            <Tabs.Screen
                name="user"
                options={{
                    title: 'User',
                    tabBarIcon: ({ color, focused }) => {
                        // Hashed email of string: lisafronaldio123@gmail.com
                        const hashedEmail = 'afeb7b17042f907d62cbc895f4618392c546a49bb86c880306dc167c131d8e1c'

                        return (
                            <TabBarIcon focused={focused}>
                                <IconUser strokeWidth={1.5} size={28} color={color} />
                                {/* <Image className={`${focused ? 'border-red-500' : 'border-neutral-500'} border-2 rounded-full w-8 h-8`} source={{
                                    uri: `https://gravatar.com/avatar/${hashedEmail}`
                                }} /> */}
                            </TabBarIcon>
                        )
                    },
                    tabBarBadge: '!',
                    tabBarButton: (props) => <TabBarButton onLongPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); router.push('/login') }} {...props} />
                }}
            />
        </Tabs>
    )
}