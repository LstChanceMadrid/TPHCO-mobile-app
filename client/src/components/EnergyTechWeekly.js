import React, {Component} from 'react';
import { connect } from 'react-redux'
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import EnergyTechHeader from './headers/EnergyTechHeader';
import Footer from './footers/Footer';
import EnergyTechMainStory from './news/EnergyTechMainStory'
import EnergyTechAltStoryContainer from './news/EnergyTechAltStoryContainer'
import EnergyTechDisclaimer from './news/EnergyTechDisclaimer';
import ETech20190108 from './news/weekly/ETech20190108';

class EnergyTechWeekly extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <EnergyTechHeader />
                    <ETech20190108 />
                    <EnergyTechAltStoryContainer />
                    <EnergyTechDisclaimer />
                </ScrollView>
                <Footer component={this.props.componentId}/>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        username : state.username
    }
  }
  
  
export default connect(mapStateToProps)(EnergyTechWeekly)

const styles = StyleSheet.create({
    container : {
        padding: 0,
        backgroundColor: 'rgba(106, 109, 142, 1)',
        paddingBottom: 75,
        minHeight: '100%'
    },
    question : {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 8,
        fontWeight: 'bold'
    },
    browser : {
        color : 'rgba(255, 100, 100, 1)',
        fontSize : 8,
    },
    title: {
        color: 'rgba(125, 251, 250, 1)',
        fontWeight: 'bold',
        fontSize: 14
    }
})