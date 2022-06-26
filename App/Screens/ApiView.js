import React, { Component } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import styles from "./ApiStyles";

const ApiView = (props) => {
  const { goForAxios, stopSpeech, loading } = props;
  return (
    <View>
      <View>
        <Text style={styles.textStyle}>
          Application to reproduce English Wikipedia articles using Audio
        </Text>
      </View>

      <View style={{ margin: 2 }}>
        <Button title={"Wikipedia to Audio"} onPress={goForAxios} />
      </View>
      <View style={{ margin: 80, paddingVertical: 1 }}>
        <Button title={"Stop"} onPress={stopSpeech} color="red" />
      </View>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
          <Text style={{ fontSize: 16, color: "red" }}>Loading Data...</Text>
        </View>
      )}
    </View>
  );
};
export default ApiView;
