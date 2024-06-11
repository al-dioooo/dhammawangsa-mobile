import LineInMotionSVG from "@/components/graphics/line-in-motion"
import { DefaultPill } from "@/components/pill"
import { tailwind } from "@/references/tailwind"
import { IconSearch } from "@tabler/icons-react-native"
import { useRef, useState } from "react"
import { Dimensions, FlatList, ScrollView, Text, TextInput, View } from "react-native"

export default function Search() {
    const [search, setSearch] = useState<string | undefined>("")
    const [isSearching, setIsSearching] = useState(false)

    const searchInputRef = useRef()

    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | undefined>(0)

    const onRefresh = () => {
        setIsRefreshing(true)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    const screenWidth = Dimensions.get('window').width
    const numColumns = 2
    const gap = 16

    const availableSpace = screenWidth - 48 - (numColumns - 1) * gap
    const itemSize = availableSpace / numColumns

    return (
        <ScrollView contentContainerStyle={{ paddingTop: 64 }} className="bg-white dark:bg-black">
            <View className="px-6">
                <View className="flex-row items-center flex-grow px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900">
                    {search === "" && (
                        <View className="absolute inset-x-0 inset-y-0 flex-row items-center justify-center px-4 gap-x-2">
                            <IconSearch size={16} color={tailwind.colors.neutral[400]} />
                            <Text className="text-neutral-400">Search</Text>
                        </View>
                    )}
                    {/* @ts-ignore */}
                    <TextInput enterKeyHint="search" ref={searchInputRef} onFocus={() => setIsSearching(true)} onBlur={() => setIsSearching(false)} className="flex-grow py-2 pl-4 font-sans text-left dark:text-white" onChangeText={setSearch} value={search} clearButtonMode="always"></TextInput>
                </View>
            </View>

            <View className="mt-12">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 pb-4 overflow-visible">
                    {[...Array(4)].map((row, index) => (
                        <View key={index} className="mr-4">
                            <DefaultPill active={activeCategoryIndex === index} onPress={() => setActiveCategoryIndex(index)}>
                                <Text className={`${activeCategoryIndex === index ? 'text-white' : 'dark:text-white'}`}>Category</Text>
                            </DefaultPill>
                        </View>
                    ))}
                </ScrollView>
                <View>
                    <FlatList className="px-6" numColumns={numColumns} columnWrapperStyle={{ gap }} data={[...Array(12)]} renderItem={({ item }) => (
                        <View key={item} style={{ width: itemSize }} className="my-4 gap-y-2">
                            <View style={{ borderCurve: "continuous" }} className="p-1 shadow-md shadow-neutral-300 dark:shadow-neutral-800 bg-white dark:bg-black rounded-[25]">
                                <View style={{ borderCurve: "continuous", width: "auto" }} className="overflow-hidden bg-red-500 aspect-square rounded-3xl">
                                    <LineInMotionSVG color={tailwind.colors.red[300]} />
                                </View>
                            </View>
                            <View className="ml-4">
                                <Text className="font-sans text-lg font-semibold dark:text-white">{Intl.NumberFormat('id-Id', { style: 'currency', currency: "IDR" }).format(10000)}</Text>
                                <Text className="font-sans text-sm text-neutral-500">Product Name</Text>
                            </View>
                        </View>
                    )} />
                </View>
            </View>
        </ScrollView>
    )
}