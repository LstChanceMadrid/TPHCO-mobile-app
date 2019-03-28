import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { screenHeight, screenWidth } from '../../constants/dimensions'

class BottomBanner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.banner} resizeMode={'contain'} source={require('../../assets/tphco.png')} />
      </View>
    )
  }
}

export default BottomBanner

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 55, 80, 1)',
        alignItems: 'center'
    },
    banner: {
        height: screenHeight/12,
        width: screenWidth*1/2,
        
    }
})