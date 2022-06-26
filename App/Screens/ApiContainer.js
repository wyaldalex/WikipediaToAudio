import React, { Component } from "react";
import ApiView from "./ApiView";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Speech from "expo-speech";

class ApiContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fromFetch: false,
      fromAxios: false,
      dataSource: [],
      axiosData: null,
      searchText: null,
      value: null,
      searchItems: [
        {
          countryLabel: "Enter Search Term",
          countryValue: "Enter Search Term",
        },
        {
          countryLabel: "Enter Search Term",
          countryValue: "Enter Search Term",
        },
      ],
    };
  }

  setDropdown(val) {
    console.log("Value from dropdown:" + val);
    this.setState({
      searchText: val,
    });
    this.setState({
      searchItems: [
        {
          countryLabel: "Enter Search Term",
          countryValue: "Enter Search Term",
        },
        {
          countryLabel: "Enter Search Term",
          countryValue: "Enter Search Term",
        },
      ],
    });
  }

  setSearchTerm(val) {
    console.log("Value from dropdown:" + val);
    this.setState({
      searchText: val,
    });
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${this.state.searchText}`
      )
      .then((response) => {
        //jsonObj = JSON.parse(response)s;
        console.log("respuesta caca " + response);
        if (response.data[1] == "!") {
          this.setState({
            searchItems: [
              {
                countryLabel: "Enter Search Term",
                countryValue: "Enter Search Term",
              },
            ],
          });
        } else {
          let newSearchItems = [];
          let i = 0;
          for (i = 0; i < response.data[1].length; i++) {
            newSearchItems.push({
              countryLabel: response.data[1][i],
              countryValue: response.data[1][i],
            });
          }
          this.setState({
            searchItems: newSearchItems,
          });
          console.log("new search times " + newSearchItems);
        }
        console.log("pinche data " + response.data[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }

    return chunks;
  }

  runSpeech(rawText) {
    //Split text to run on all text
    //Speech.speak(rawText.slice(0, 3999))
    var chunks = this.chunkSubstr(rawText, 3999);
    //Speech.speak(chunks[0])
    chunks.forEach((element) => Speech.speak(element));
  }

  goForAxios = () => {
    this.setState({
      fromFetch: false,
      loading: true,
    });
    //axios.get("https://jsonplaceholder.typicode.com/users")
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${this.state.searchText}&prop=extracts&explaintext`
      )
      .then((response) => {
        //var key = "9228";
        var pageId = Object.keys(response.data.query.pages)[0];
        let textForSpeech = response.data.query.pages[pageId].extract.replace(
          /=/g,
          ""
        );
        console.log("getting data from axios", textForSpeech);
        Speech.stop();
        //To do run speak for each 3999 chars segment of the article
        this.runSpeech(textForSpeech);
        setTimeout(() => {
          this.setState({
            loading: false,
            axiosData: response.data.query.pages[pageId].extract,
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  stopSpeech = () => {
    Speech.stop();
  };

  FlatListSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
    );
  };

  render() {
    const {
      dataSource,
      fromFetch,
      fromAxios,
      loading,
      axiosData,
      value,
      searchItems,
    } = this.state;
    return (
      <View style={{ padding: 2, alignItems: "center", paddingVertical: 200 }}>
        <TextInput
          style={{
            margin: 2,
            fontSize: 22,
            paddingVertical: 2,
            textAlign: "center",
          }}
          placeholder="Search Term"
          onChangeText={(searchText) => this.setSearchTerm(searchText)}
          value={this.state.searchText}
          underlineColor="purple"
        />
        <Picker
          selectedValue={value}
          onValueChange={(value, index) => this.setDropdown(value)}
          //mode="dropdown" // Android only
          style={styles2.picker}
        >
          <Picker.Item label="Select Matching Article" value="Unknown" />

          {searchItems.map((searchItem) => (
            <Picker.Item
              label={searchItem.countryLabel}
              value={searchItem.countryValue}
            />
          ))}
        </Picker>

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
        />
      </View>
    );
  }
}

export default ApiContainer;

// Just some styles
const styles2 = StyleSheet.create({
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
    margin: 4,
    alignItems: "center",
  },
});
