import { MotiView } from "moti"
import { MotiPressable, MotiPressableProps, useMotiPressable } from "moti/interactions"
import React from "react"

type Props = MotiPressableProps & {
    active?: boolean
}

export default function Default({ children, active = false, ...rest }: Props) {
    const Child = ({ children }: { children: any }) => {
        const state = useMotiPressable(({ pressed }) => {
            'worklet'

            return {
                opacity: pressed ? 0.5 : 1,
                scale: pressed ? .95 : 1,
                shadowOpacity: active ? (pressed ? .5 : 1) : 0
            }
        }, [])

        return <MotiView className={`${active ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-neutral-100 dark:bg-neutral-900'} flex items-center px-6 py-2 rounded-full`} children={children} state={state} />
    }

    return (
        <MotiPressable {...rest}>
            <Child children={children} />
        </MotiPressable>
    )
}