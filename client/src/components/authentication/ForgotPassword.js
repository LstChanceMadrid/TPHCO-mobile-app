import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { AsyncStorage, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { styles } from './styles/styles'
import { URL } from '../../constants/constants'
import { actionType } from '../../store/actionTypes/actionTypes'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      email: null
    }
  }

  leaveScreen = () => {
    Navigation.pop(this.props.componentId)
  }

  resetPassword = async () => {
    let email = this.state.email

    if (email === null) {
      this.setState({
        ...this.state,
        errorMessage: 'The "Email" field cannot be null.'
      })
    } else {
      await axios.post(URL.FORGOT_PASSWORD_URL, {
        email
      }).then(response => {
        if (!response.data.exists) {
          this.setState({
            ...this.state,
            emailSent: null,
            errorMessage: response.data.errorMessage
          })
        } else {
          this.setState({
            ...this.state,
            errorMessage: null,
            emailSent: 'Follow the instructions sent to your email to reset your password.'
          })
        }
      }).catch(e => console.log(e))
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.credentialContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.errorMessageFP}>{this.state.errorMessage}</Text>
          <Text style={styles.emailSent}>{this.state.emailSent}</Text>

          <TextInput style={styles.input} placeholder="Email" placeholderTextColor='rgba(0, 0, 0, 0.5)' autoCapitalize='none' onChangeText={(email) => this.setState({...this.state, email})}></TextInput>
          
          <TouchableOpacity style={styles.loginButton} onPress={() => this.resetPassword()}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          
          <Text style={styles.orLogin}><Text style={styles.login} onPress={() => {this.leaveScreen()}}>Back</Text></Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)