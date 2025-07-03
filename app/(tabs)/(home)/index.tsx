import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function HomeIndex() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [formReady, setFormReady] = useState(false);

  const [datePicked, setDatePicked] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onDatePicked = (event:DateTimePickerEvent, selectedDate:any) => {
    if (event.type == "set") {
      const currentDate = selectedDate;
      setDatePicked(currentDate);
    } else {
      toggleDatePicker();
    }
  }


  const onSubmit = () => {
    alert(`${name} was born on ${birthDate} at ${birthTime} in ${birthPlace}`);
  }
  useEffect(() => {
    setFormReady(!!(name && birthDate && birthTime && birthPlace));
    return () => {
      setFormReady(false);
    }
  }, [name, birthDate, birthTime, birthPlace]);

  console.log(name, birthDate, birthTime, birthPlace);





  return (

    <SafeAreaView style={styles.container} className="px-6 flex flex-col items-center justify-center">

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.heading}>~ welcome ~</Text>
          <Text style={styles.subHeading}>please fill out your details</Text>

          {/* Name */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Birth Date */}
          <View style={{ width: "100%", alignItems: "center" }}>

            {showDatePicker &&
              
              (<DateTimePicker
              mode="date"
              display="spinner"
              value={datePicked}
              onChange={onDatePicked}
              style={styles.datePicker}
            />)
            }
            {!showDatePicker && (
              <Pressable onPress={toggleDatePicker} style={{width: "100%", alignItems: "center"}}>
                <TextInput
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={birthDate}
                  onChangeText={setBirthDate}
                  editable={false}
                  onPressIn={toggleDatePicker}
                 
                />
              </Pressable>
            )}
            
          </View>

          {/* Birth Time */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
              placeholder="HH:MM AM/PM"
              placeholderTextColor="#999"
              style={styles.input}
              value={birthTime}
              onChangeText={setBirthTime}
            />
          </View>

          {/* Birth Place */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
              placeholder="Enter birth location"
              placeholderTextColor="#999"
              style={styles.input}
              value={birthPlace}
              onChangeText={setBirthPlace}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: formReady ? "gray" : "black"},
            ]}
            disabled={!formReady}
            onPress={onSubmit}
          >
            <Text style={[
              styles.buttonText,
              {color: formReady ? "white" : "gray"}
            ]}>
              submit
            </Text>
          </TouchableOpacity>
          
          <Link href="/details" style={styles.link}>talk to your planets</Link>
        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
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
  button: {
    width: "30%",
    height: 38,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
    color: "white",
    marginTop:20,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  datePicker: {
    height: 120,
    borderWidth: 1,
    borderColor: "#444",
    marginTop: -10,
    width: "100%",
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