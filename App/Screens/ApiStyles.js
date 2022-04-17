import React, { Component } from 'react';
import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('screen').height
const styles = {
    parentContainer: {
        height: deviceHeight,
        justifyContent: 'center',
    },
    textStyle:{
        fontSize:12,
        textAlign:'center',
        paddingTop:32
    },
    container: {
        backgroundColor: "#fff"
    },
    loader: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    },
    halfHeight: {
        flex: 0.5,
        backgroundColor: "#FF3366",
      },
      quarterHeight: {
        flex: 0.25,
        backgroundColor: "#000",
      }
};
export default styles;