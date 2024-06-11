import { TextInput, TextInputProps } from "react-native"

type Props = TextInputProps & {

}

export default function Input({ className, ...rest }: Props) {
    return (
        <TextInput className={`${className} bg-gray-100 dark:bg-neutral-900 dark:text-white px-4 py-3 rounded-2xl text-[16px] font-sans`} clearButtonMode="while-editing" {...rest} />
    )
}