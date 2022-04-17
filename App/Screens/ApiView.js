import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator , TextInput} from 'react-native';
import styles from './ApiStyles';

const ApiView = (props) => {
    const { searchText,goForFetch, goForAxios,stopSpeech, fromFetch, fromAxios, axiosData, renderItem, FlatListItemSeparator, dataSource, loading } = props
    return (
      <View style={styles.parentContainer}>
        <View>
          <Text style={styles.textStyle}>
            Application to reproduce Wikipedia articles with Audio

          </Text>
        </View>

        <View style={{ margin: 18 }}>
          <Button
            title={"Wikipedia to Audio"}
            onPress={goForAxios}
            color="green"
          />
          <Button
            title={"Stop"}
            onPress={stopSpeech}
            color="red"
          />                 
        </View>
        <Text>{axiosData}</Text>
        
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0c9" />
            <Text style={{ fontSize: 16, color: "red" }}>Loading Data...</Text>
          </View>
        )}
      </View>
    );
}
export default ApiView;