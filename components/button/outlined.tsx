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
                scale: pressed ? .95 : 1
            }
        }, [])

        return <MotiView className="flex items-center p-3 border border-neutral-200 dark:border-neutral-800 rounded-full" children={children} state={state} />
    }

    return (
        <MotiPressable {...rest}>
            <Child children={children} />
        </MotiPressable>
    )
}