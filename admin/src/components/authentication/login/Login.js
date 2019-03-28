import React, { Component } from 'react';
import { connect } from 'react-redux'
import tphco from '../../../assets/tphco.png'
import axios from 'axios'
import { actionType } from '../../../store/actionTypes/actionTypes';
import { URL } from '../../../constants/constants'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      attempt: 0
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = async (e) => {
    console.log('inside the login')
    e.preventDefault()

    this.setState({
      ...this.state,
      attempt: this.state.attempt + 1
    })
    await axios.post(URL.LOGIN_URL, {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    }).then(async response => {
      if (response.data.isAuthenticated) {
        await this.props.login(response.data.user)
        await localStorage.setItem('user', JSON.stringify(response.data.user))

        let user = JSON.parse(localStorage.getItem('user'))

        console.log(user)
        if (user.username === 'mmadrid' || user.username === 'rking') {
          this.props.history.push('admin')  
        } else {
          this.props.history.push('user')
        }

      } else {
        document.getElementById('form').insertAdjacentHTML('beforebegin', `<div><p className=''>The username/email and the password entered are not recognized. Please try again.</p>
        <p>Attempt #${this.state.attempt}</p><div>`)
      }
    })
  }

  render() {

    console.log(this.props)

    return (
      <div>
        <header className="App-header">
          <img src={tphco} className="logo" alt="logo" />

          <section id="form" className='input-container'>
          <form onSubmit={() => this.handleLogin}>
            <div className='input-div'>
              <label className='label'>Username or Email</label>
              <input id='usernameOrEmail' className='input' type='text' onChange={this.handleInput} name='usernameOrEmail' placeholder='Username or Email' autoComplete="username || email" />
            </div>

            <div className='input-div'>
              <label className='label'>Password</label>
              <input id='password' className='input' type='password' onChange={this.handleInput} name='password' placeholder='Password' autoComplete="current-password" />
            </div>

            <input className='button' type='submit' value='Login' onClick={this.handleLogin} />
            </form>
          </section>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (value) => dispatch({type: actionType.LOGIN, value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
