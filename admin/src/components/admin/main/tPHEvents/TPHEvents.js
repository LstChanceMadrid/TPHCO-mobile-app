import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { actionType } from '../../../../store/actionTypes/actionTypes';
import Event from './event/Event';
import { URL } from '../../../../constants/constants'

class TPHEvents extends Component {

  getEvents = () => {
    axios.post(URL.ADMIN_TPH_EVENTS_URL).then(response => {
      let events = response.data.events
      this.props.setEvents(events)
      console.log(events)
    }).catch(e => console.log(e))
  }

  mapEvents = () => {
    let eventsArray = []

      this.props.events.map((event, i) => {
        console.log(event)
        return eventsArray.push(
          <Event 
            key={i}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            time={event.time}
          />
        )
      })
      return eventsArray
  }
  

  componentDidMount = () => {
    this.getEvents()
  }

  render() {
    if (this.props.events === 'none') {
      return (
        <div className='container'>
          <p>tph events page</p>
          <p>No events</p>
          <button>Add New Event</button>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <p>tph events page</p>
          {this.mapEvents()}
          <button>Add New Event</button>
        </div>
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