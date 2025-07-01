import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello World!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
