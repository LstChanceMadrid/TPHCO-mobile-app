import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';



export default class StocksBackground extends Component {
    render() {
        const remote = '../../styles/images/tphco.png'
      return (

            <Image style={styles.logo} resizeMode={'contain'} source={require(remote)} />

      );
    }
  }

  let styles = StyleSheet.create({
      logo: {
        width: '90%',
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        zIndex: -1,
        marginTop: '25%'
      }
  })