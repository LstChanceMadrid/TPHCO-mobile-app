import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import axios from 'axios'
import EnergyTechAltStory from './EnergyTechAltStory'

export default class EnergyTechAltStoryContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            altStories : []
        }
    }
    
    componentWillMount = () => {
        axios.post('http://localhost:5000/altstory', {
            week: '01/08/2019'
        }).then(response => {

            this.setState({
                ...this.state,
                altStories: response.data.altStory
            })
        })
    }
    
    
    render() {
        let altStoryArray = []



        this.state.altStories.map((altStory, i) => {
            let storyData = (
            <View key={i} style={styles.storyContainer}>
            <EnergyTechAltStory
                title={altStory.title}
                author={altStory.author}
                content={altStory.content}
                image={altStory.imageurl}
                source={altStory.sourceurl}
                publisher={altStory.publisher}/>
            </View>)
        
            altStoryArray.push(storyData)

        })

        
            

        return (
            <View style={styles.container}>
                {altStoryArray}
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
        justifyContent: 'space-evenly',
        alignItems: 'stretch'

    },
    storyContainer: {
        alignItems: 'center',
        width: '45%'
    }
})