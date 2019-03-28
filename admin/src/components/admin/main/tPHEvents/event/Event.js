import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    return (
      <div className='event-container'>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
        <p>{this.props.location}</p>
        <p>{this.props.time}</p>
        <p>{this.props.date}</p>

        <button>Edit</button>
        <button>Remove</button>
      </div>
    )
  }
}
