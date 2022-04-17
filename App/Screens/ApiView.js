import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator , TextInput} from 'react-native';
import styles from './ApiStyles';

const ApiView = (props) => {
    const { searchText,goForFetch, goForAxios,stopSpeech, fromFetch, fromAxios, axiosData, renderItem, FlatListItemSeparator, dataSource, loading } = props
    return (
      <View >
        <View>
          <Text style={styles.textStyle}>
            Application to reproduce Wikipedia articles using Audio

          </Text>
          <Text style={styles.textStyleWarning}>
            Search Term has to match with wikipedia article name

          </Text>          
        </View>

        <View style={{ margin: 2}}>
          <Button
            title={"Wikipedia to Audio"}
            onPress={goForAxios}
            
          />                
        </View>
        <View style={{ margin: 80 , paddingVertical: 1}}>
          <Button
            title={"Stop"}
            onPress={stopSpeech}
            color="red"            
          />                 
        </View>                         
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