import { MotiView } from "moti"
import { MotiPressable, MotiPressableProps, useMotiPressable } from "moti/interactions"
import React from "react"

type Props = MotiPressableProps

export default function Default({ children, ...rest }: Props) {
    const Child = ({ children }: { children: any }) => {
        const state = useMotiPressable(({ pressed }) => {
            'worklet'

            return {
                opacity: pressed ? 0.5 : 1,
                translateY: pressed ? 3 : 0,
                shadowOpacity: pressed ? .5 : 1
            }
        }, [])

        return <MotiView className="flex items-center px-6 py-3 text-white bg-red-500 rounded-full shadow-lg shadow-red-500/50" children={children} state={state} />
    }

    return (
        <MotiPressable {...rest}>
            <Child children={children} />
        </MotiPressable>
    )
}