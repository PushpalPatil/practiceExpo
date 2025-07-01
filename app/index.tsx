import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container} className="flex flex-col items-center justify-center">
      <Text style={watashiStyle.text} className="font-normal">WATASHI</Text>

      <Link href="/(tabs)/(home)" style={nextStyle.text} >talk to your planets</Link>
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
});

const watashiStyle = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
});

const nextStyle = StyleSheet.create({
  text: {
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