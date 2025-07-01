import { Stack } from "expo-router";

export default function RootLayout() {
  // Hide the native header for every screen in the root stack.
  // Individual screens can still opt-in later if they need a header.
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name = "(tabs)"/>
    </Stack>
  )
}
