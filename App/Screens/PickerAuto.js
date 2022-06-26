import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

function PickerAuto(props) {
  const [country, setCountry] = useState("Unknown");

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Wikipedia Article Matching Search Term:</Text>
      <Picker
        selectedValue={country}
        onValueChange={(value, index) => setCountry(value)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Please enter search term" value="Unknown" />
        <Picker.Item label="Australia" value="Australia" />
        <Picker.Item label="Belgium" value="Belgium" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="Japan" value="Japan" />
      </Picker>
      <Text style={styles.text}>Your conuntry: {country}</Text>
    </View>
  );
}

export default PickerAuto;

// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  text: {
    fontSize: 12,
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
});
