import React, { Component } from 'react'
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export default class EnergyTechAltStory extends Component {
  constructor(props) {
      super(props)
      this.state = {
          ...this.state
      }
  }
  
  
    render() {
        return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleContainer}>
                <Text style={styles.titleText}>{this.props.title}</Text>
            </TouchableOpacity>
            <Text>By {this.props.author}</Text>
            <Image style={styles.image} resizeMode={'contain'} source={require('../../styles/images/tph-block.png')} />
            <Text style={styles.story} numberOfLines={10} ellipsizeMode={'tail'}>{this.props.content}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        width: '100%'
    },
    titleContainer: {
        padding: 5
    },
    titleText: {
        fontSize: 18,
        color: 'rgba(255, 150, 100, 1)'
    },
    story: {
        color: 'white'
    },
    image: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
