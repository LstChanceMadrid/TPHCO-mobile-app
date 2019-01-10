import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EnergyTechAltStory from './EnergyTechAltStory'
import axios from 'axios'


export default class EnergyTechAltStoryContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            altStories : {}
        }
    }
    
    componentWillMount = () => {
        axios.post('http://localhost:5000/altstory', {
            title: 'Title'
        }).then(response => {

            this.setState({
                ...this.state,
                altStories: response.data.altStory
            })
        })
    }
    
    
    render() {

        let storyArr = () => {
            let altStory = this.state.altStories
        return (
            <View style={styles.storyContainer}>
                <EnergyTechAltStory title={altStory.title}
                author={altStory.author}
                content={altStory.content}
                image={altStory.imageurl}
                source={altStory.sourceurl}/>
            </View>
            )
        }


        return (
            <View style={styles.container}>
                {storyArr()}
                <Text></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    storyContainer: {
        alignItems: 'center',
        width: '45%'
    }
})