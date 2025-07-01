import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeIndex() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  return (
    <View style={styles.container} className="px-6 flex flex-col items-center justify-center">
      <Text style={styles.heading}>~ welcome ~</Text>
      <Text style={styles.subHeading}>please fill out your details</Text>

      {/* Name */}
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}

      />

      {/* Birth Date */}
      <TextInput
        placeholder="MM/DD/YYYY"
        placeholderTextColor="#999"
        style={styles.input}
        value={birthDate}
        onChangeText={setBirthDate}
      />

      {/* Birth Time */}
      <TextInput
        placeholder="HH:MM AM/PM"
        placeholderTextColor="#999"
        style={styles.input}
        value={birthTime}
        onChangeText={setBirthTime}
      />

      {/* Birth Place */}
      <TextInput
        placeholder="Enter birth location"
        placeholderTextColor="#999"
        style={styles.input}
        value={birthPlace}
        onChangeText={setBirthPlace}
      />

      <Link href="/details" style={styles.link}>talk to your planets</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
 
  },
  subHeading: {
    color: "#d1d1d1",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  
  },
  input: {
    width: "70%",
    height: 48,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "white",
    marginBottom: 16,
  },
  link: {
    color: "white",
    fontSize: 15,
    marginTop: 20,

  },
});



/* APP: Contains the app's navigation, which is file-based. 
The file structure of the app directory determines the app's navigation.

The app has two routes defined by two files: 
app / (tabs) / index.tsx and app / (tabs) / explore.tsx.
The layout file in app / (tabs) / _layout.tsx sets up the tab navigator.

ASSETS: 
The assets directory contains adaptive-icon.png used for Android and an icon.png used for iOS as app icons. 
It also contains splash.png which is an image for the project's splash screen and a favicon.png if the app runs in a browser.

COMPONENTS:
Contains React Native components, like ThemedText.tsx, 
which creates text elements that use the app's color scheme in light and dark modes.

CONSTANTS: 
Contains Colors.ts, which contains a list of color values throughout the app.

HOOKS:
contains react hooks - allows sharing common behaviour between components - 
ex) useThemeColor() = hook that returns a color based on current theme

SCRIPTS:
Contains reset-project.js : npm run reset-project
will move the app dir -> app-example and create new app with new index.tsx

APP.JSON:
Contains configuration options for the project and is called the app config. 
These options change the behavior of your project while developing, building, 
submitting, and updating your app.

PACKAGE.JSON:
The package.json file contains the project's dependencies, scripts, and metadata. 
Anytime a new dependency is added to your project, it will be added to this file.

TSCONFIG.JSON:
Contains the rules that TypeScript will use to enforce type safety throughout the project.
*/