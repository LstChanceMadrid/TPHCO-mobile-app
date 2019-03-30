import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { AsyncStorage, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { styles } from './styles/styles'
import { URL } from '../../constants/constants'
import { actionType } from '../../store/actionTypes/actionTypes'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  _storeLoginStatus = async () => {
    try {
       const isLoggedIn = await AsyncStorage.setItem("isLoggedIn", 'true', res => {})
    } catch(error){
        console.log(error)
    }
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })
  }

  leaveScreen = () => {
    Navigation.pop(this.props.componentId)
  }

  authenticate = async () => {
    let usernameOrEmail = this.state.usernameOrEmail
    let password = this.state.password
    
    await axios.post(URL.LOGIN_URL, {
      usernameOrEmail : usernameOrEmail,
      password : password
    }).then(async response => {
      if (response.data.isAuthenticated) {
        let user = response.data.user

        AsyncStorage.setItem("user", JSON.stringify(user))

        this._storeLoginStatus()

        this.props.setUser(user)

        axios.post(URL.ENERGY_TECH_WEEKLY_URL, {
            week: this.props.week
        }).then(response => {
            this.props.setIssue(response.data.issue)
        }).catch(e => console.log(e))

        axios.post(URL.ALT_STORY_URL, {
            week: this.props.week
        }).then(response => {
            this.props.setAltStories(response.data.altStory)
        }).catch(e => console.log(e))

        axios.post(URL.ENERGY_TECH_WEEKLY_TITLES_URL).then(response => {
          this.props.setIssueTitles(response.data.title)
        }).catch(e => console.log(e))

        await axios.post(URL.STORE_TICKERS_URL).then(async response => {
          let defaultTickersArray = []

          await response.data.defaultTickers.map(item => {
            item.isActive = true
            defaultTickersArray.push(item)
          })

          AsyncStorage.setItem("defaultTickers", JSON.stringify(defaultTickersArray))
        }).catch(e => console.log(e))

        Navigation.push(this.props.componentId, {
          component: {
            name: 'AgreeToTerms'
          }
        })
      } else {
        this.setState({
          ...this.state,
          errorMessage: response.data.errorMessage
        })
      }
    }).catch(e => console.log(e))
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.credentialContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

          <TextInput style={styles.input} placeholder="Username or Email" placeholderTextColor='rgba(0, 0, 0, 0.5)' autoCapitalize='none' onChangeText={(usernameOrEmail) => this.setState({...this.state, usernameOrEmail})}></TextInput>
          
          <TextInput style={styles.input} placeholder="Password" autoCapitalize='none' placeholderTextColor='rgba(0, 0, 0, 0.5)' secureTextEntry={true} onChangeText={(password) => this.setState({...this.state, password})}></TextInput>

          <TouchableOpacity style={styles.loginButton} onPress={() => this.authenticate()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.rowBetween}>
            <Text style={styles.forgotPassword} onPress={() => {this.goToScreen('ForgotPassword')}}>Forgot{'\n'}Password?</Text>

            <Text style={styles.orRegister}>or <Text style={styles.register} onPress={() => {this.goToScreen('Register')}}>Register</Text></Text>
          </View>
        </View>

        <Image style={styles.logo} resizeMode={'contain'} source={require('../../assets/tphco.png')} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    user: {
      ...state.user    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAltStories: (value) => dispatch({type: actionType.SET_ALT_STORIES, value}),
    setIssue: (value) => dispatch({type: actionType.ISSUE_INFORMATION, value}),
    setIssueTitles: (value) => dispatch({type: actionType.SET_ISSUE_TITLES, value}),
    setUser: (value) => dispatch({type: actionType.USER, value}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)