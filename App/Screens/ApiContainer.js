import React, { Component } from 'react';
import ApiView from './ApiView';
import axios from 'axios';
import styles from './ApiStyles';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";
import * as Speech from 'expo-speech'

class ApiContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fromFetch: false,
            fromAxios: false,
            dataSource: [],
            axiosData: null,
            searchText: 'Search Term'
        };
    }
    goForAxios = () => {
        this.setState({
            fromFetch: false,
            loading: true,

        })
        //axios.get("https://jsonplaceholder.typicode.com/users")
        axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${this.state.searchText}&prop=extracts&explaintext`)        
            .then(response => {
                //var key = "9228";
                var pageId = Object.keys(response.data.query.pages)[0];
                let textForSpeech = response.data.query.pages[pageId].extract.replace(/=/g, '');
                //let textForSpeech = response.data.query.pages[pageId].extract.replace(/\=[\s\S]+/m, "")
                //var textForSpeech2 = textForSpeech.replace(/\=[\s\S]+/m, "bar")
                console.log('getting data from axios',textForSpeech);
                Speech.stop()
                //To do run speak for each 3999 chars segment of the article                
                Speech.speak(textForSpeech.slice(0, 3999))
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        axiosData: response.data.query.pages[pageId].extract
                    })                   
                }, 2000)               
            })                                
            .catch(error => {
                console.log(error);
            });
    }

    stopSpeech = () => {
        Speech.stop()
    }    

    FlatListSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    renderItem = (data) => {
        return (
            <TouchableOpacity style={styles.list}>
                <Text style={styles.lightText}>{data.item.name}</Text>
                <Text style={styles.lightText}>{data.item.email}</Text>
                <Text style={styles.lightText}>{data.item.company.name}</Text></TouchableOpacity>
        )

    }


    render() {
        const { text,dataSource, fromFetch, fromAxios, loading, axiosData } = this.state
        return (
            <View style={{padding: 10}}>

            <TextInput
            style={{ margin: 40, fontSize:18 }}
            placeholder="Search Term"
            onChangeText={(searchText) => this.setState({searchText})}
            value={this.state.searchText}
            inlineImageLeft='search_icon'
          />         
            <ApiView
                searchText={this.searchText}                
                goForFetch={this.goForFetch}                
                goForAxios={this.goForAxios}
                stopSpeech={this.stopSpeech}
                dataSource={dataSource}
                loading={loading}
                fromFetch={fromFetch}
                fromAxios={fromAxios}
                axiosData={axiosData}
                FlatListSeparator={this.FlatListSeparator}
                renderItem={this.renderItem}
            />
            </View>
        );
    }
}

export default ApiContainer;