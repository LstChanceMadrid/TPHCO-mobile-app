import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Event extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }


  render() {
    return (
      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}>{this.props.title}</Text>

        <View>
            <Text style={styles.eventDescription}>{this.props.description}</Text>

            <View style={styles.eventInfo}>
                <Text style={styles.eventDate}>{this.props.date}</Text>
                <Text style={styles.eventTime}>@{this.props.time}</Text>

                <Text style={styles.eventLocation}>{this.props.location}</Text>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    eventContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 55, 80, 1)',
        padding: 10
    },
    eventTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    eventDescription: {
        textAlign: 'center',
        padding: 5
    },
    eventInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    eventDate: {
        color: 'black'
    },
    eventTime: {
        color: 'black'
    },
    eventLocation: {
        color: 'black'
    }
})