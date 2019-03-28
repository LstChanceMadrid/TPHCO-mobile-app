import React, { Component } from 'react';
import { connect } from 'react-redux'

import Admin from './admin/Admin'
import Authentication from './authentication/Authentication';
import User from './user/User'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      attempt: 1
    }
  }

  render() {

    // if (this.props.user.username === 'mmadrid') {
      if (true) {
      return (
        <Admin />
      );
    } else if (false) {
      return (
        <User />
      )
    } else {
      return (
        <Authentication />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(App);
