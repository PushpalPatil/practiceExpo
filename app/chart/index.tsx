import { StyleSheet, Text, View } from "react-native";


/*
This file will calculate the user's birth chart using the DateInput, LabeledInput, TimeInput, and LocationSearchInput files under the components folder

*/


export default function ChartScreen() {
      return (
            <View style={styles.container}>
                  <Text style={styles.text}>Your chart will appear here.</Text>
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
      text: {
            color: "white",
            fontSize: 20,
      },
}); 