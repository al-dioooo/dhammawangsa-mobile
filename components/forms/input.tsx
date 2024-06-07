import { TextInput, TextInputProps } from "react-native"

type Props = TextInputProps & {

}

export default function Input({ className, ...rest }: Props) {
    return (
        <TextInput className={`${className} bg-gray-100 px-4 py-3 rounded-2xl text-[18px]`} clearButtonMode="while-editing" {...rest} />
    )
}