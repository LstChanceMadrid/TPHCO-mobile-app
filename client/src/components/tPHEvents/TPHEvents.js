import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Event from './event/Event';
import axios from 'axios'
import { connect } from 'react-redux'
import { actionType } from '../../store/actionTypes/actionTypes';
import { URL } from '../../constants/constants'


class TPHEvents extends Component {

  getEvents = () => {
    axios.post(URL.EVENTS_URL).then(response => {
        let events = response.data.events
        this.props.setEvents(events)
    }).catch(e => console.log(e))
}

  mapEvents = () => {
    let eventArray = []

    this.props.events.map((event, i) => {
       eventArray.push(
       <Event
        key={i}
        title={event.title}
        description={event.description}
        location={event.location}
        date={event.date}
        time={event.time}
      />)
    })

    return eventArray
  }

  componentDidMount = () => {
    this.getEvents()
  }

  render() {
    if (this.props.events === 'none') {
      return (
        <View>
          <Text>No Events</Text>
        </View>
      )
    } else {
    return (
      <View>
        {this.mapEvents()}
      </View>
    )
  }
}
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setEvents: (value) => dispatch({type: actionType.SET_EVENTS, value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TPHEvents)
