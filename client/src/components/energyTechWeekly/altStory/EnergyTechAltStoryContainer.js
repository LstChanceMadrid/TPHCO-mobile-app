import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'

import axios from 'axios'
import { actionType } from '../../../store/actionTypes/actionTypes'
import EnergyTechAltStory from './EnergyTechAltStory'

class EnergyTechAltStoryContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            altStories : []
        }
    }
    
    altStoryArray = () => {
        let altStoryArray = []

        this.props.altStories.map((altStory, i) => {
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
        return altStoryArray
    }
    
    render() {        
        return (
            <View style={styles.container}>
                {this.altStoryArray()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAltStories: (value) => dispatch({type: actionType.SET_ALT_STORIES, value})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnergyTechAltStoryContainer)

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