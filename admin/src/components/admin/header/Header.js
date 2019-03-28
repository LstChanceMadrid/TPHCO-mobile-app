import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <Link to={'/admin/dashboard'}>
          <div className='nav-button'><p className='nav-text'>Dashboard</p></div>
        </Link>

        <Link to={'/admin/stocks'}>
          <div className='nav-button'><p className='nav-text'>Stocks</p></div>
        </Link>

        <Link to={'/admin/energyTechWeekly'}>
          <div className='nav-button'><p className='nav-text'>ETech Weekly</p></div>
        </Link>

        <Link to={'/admin/tPHEvents'}>
          <div className='nav-button'><p className='nav-text'>TPH Events</p></div>
        </Link>
      </header>
    )
  }
}
