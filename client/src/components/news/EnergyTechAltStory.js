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
        
        const goToSource = () => {
            Linking.openURL(`${this.props.source}`)
        }
        const imageAvailable = () => {
            if (this.props.image === " ") {
                return <View style={{height: 2, width: '100%', borderTopColor: 'rgba(255, 150, 100, 1)', borderTopWidth: 2}}></View>
            } else {
                return <Image style={styles.image} width={'100%'} resizeMode={'contain'} source={{uri : this.props.image}} />
            }
        }
        return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => goToSource()}>
                <Text style={styles.titleText}>{this.props.title} <Text style={styles.publisher}>({this.props.publisher})</Text></Text>
            </TouchableOpacity>
            {imageAvailable()}
            <Text style={styles.story} numberOfLines={10} ellipsizeMode={'tail'}>{this.props.content}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
    publisher: {
        color: 'rgba(200, 200, 200, 0.5)',
        fontSize: 12
    },  
    image: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 150
    }
})
