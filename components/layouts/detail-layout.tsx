import { PropsWithChildren, ReactNode } from "react"
import { Dimensions, View } from "react-native"
import ParallaxScrollView from "@/components/parallax-scroll-view"
import TabBar from "@/components/layouts/detail/tab-bar"
import { tailwind } from "@/references/tailwind"
import { IconShoppingBag } from "@tabler/icons-react-native"

type Props = PropsWithChildren<{
    headerImage: ReactNode
}>

const items = [
    {
        options: {
            icon: (props: any) => (
                <IconShoppingBag strokeWidth={1.5} size={28} {...props} />
            ),
            tintColor: tailwind.colors.white
        },
        isActive: false
    }
]

export const DetailLayout = ({ headerImage, children }: Props) => {
    const screenWidth = Dimensions.get('window').width

    return (
        <>
            <ParallaxScrollView headerWidth={screenWidth} headerImage={headerImage} headerBackgroundColor={{ dark: "black", light: "white" }}>
                {children}
            </ParallaxScrollView>
            <TabBar items={items} />
        </>
    )
}