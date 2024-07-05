import TopTabBar from "@/components/layouts/top-tab/top-tab-bar"
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { ParamListBase, TabNavigationState } from "@react-navigation/native"
import { withLayoutContext } from "expo-router"

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<MaterialTopTabNavigationOptions, typeof Navigator, TabNavigationState<ParamListBase>, MaterialTopTabNavigationEventMap>(Navigator)

export default function TopTabLayout() {
    return (
        <MaterialTopTabs tabBar={(props) => <TopTabBar {...props} />} screenOptions={{ lazy: true }}>
            <MaterialTopTabs.Screen name="not-paid" options={{ title: "Not Paid" }} />
            <MaterialTopTabs.Screen name="to-ship" options={{ title: "To Ship" }} />
            <MaterialTopTabs.Screen name="arrived" options={{ title: "Arrived" }} />
            <MaterialTopTabs.Screen name="completed" options={{ title: "Completed" }} />
        </MaterialTopTabs>
    )
}