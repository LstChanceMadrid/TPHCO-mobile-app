import React, {Component} from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView } from 'react-native';
import EnergyTechHeader from './header/EnergyTechHeader';
import EnergyTechDisclaimer from './footer/EnergyTechDisclaimer';
import Issue from './issue/Issue'
import { actionType } from '../../store/actionTypes/actionTypes'
import { Navigation } from 'react-native-navigation'


class EnergyTechWeekly extends Component {
    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
        this.state = {
            ...this.state
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <EnergyTechHeader />
                    <Issue />
                    <EnergyTechDisclaimer />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        user: {
            ...state.user,
            username : state.user.username
        }
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        setIssue: (value) => dispatch({type: actionType.ISSUE_INFORMATION, value})
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EnergyTechWeekly)

const styles = StyleSheet.create({
    container : {
        padding: 0,
        backgroundColor: 'rgba(106, 109, 142, 1)',
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