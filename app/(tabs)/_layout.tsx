import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "black",
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tabs.Screen name="(home)" options={{ headerShown: false }} />
            <Tabs.Screen name="settings" options={{ headerShown: false }} />
        </Tabs>
    );
}

