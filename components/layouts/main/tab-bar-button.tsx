import { Pressable, PressableProps } from "react-native"

type Props = PressableProps

export default function TabBarButton(props: Props) {
    return (
        <Pressable style={{ flexGrow: 1 }} {...props} />
    )
}