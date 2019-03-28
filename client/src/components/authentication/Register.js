import React, {Component} from 'react';

import axios from 'axios'

import { connect } from 'react-redux'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { styles } from './styles/styles'
import { URL } from '../../constants/constants'


class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      firstName : '',
      errorMessage: ''
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
  
  name = (e) => {
    this.setState({
      ...this.state,
      firstName : e.target.value
    })
  }

  render() {

    // checks database for a user
    const authenticate = async () => {
      await axios.post(URL.REGISTER_URL, {
        username : this.state.username,
        email : this.state.email,
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        company : this.state.company,
        position : this.state.position,
        password : this.state.password
      }).then(response => {
        if (response.data.isAuthenticated) {
          this.leaveScreen()
        } else {
          this.setState({
            ...this.state,
            errorMessage : response.data.errorMessage
          })
        }
      }).catch(e => console.log(e))
    }
    // placeholder text color
    const pTC = 'rgba(0, 0, 0, 0.5)'
    
    return (
      <View style={styles.container}>
        <View style={styles.credentialContainer}>
          <Text style={styles.title}>Register</Text>

          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          
          <TextInput style={styles.input} placeholder="Username*" autoCapitalize='none' placeholderTextColor={pTC} onChangeText={(username) => this.setState({...this.state, username})}></TextInput>

          <TextInput style={styles.input} placeholder="Email*" autoCapitalize='none' placeholderTextColor={pTC} onChangeText={(email) => this.setState({...this.state, email})}></TextInput>

          <View style={styles.nameContainer}>
            <TextInput style={styles.name} placeholder="First Name*" autoCapitalize='none' placeholderTextColor={pTC} onChangeText={(firstName) => this.setState({...this.state, firstName})}></TextInput>

            <TextInput style={styles.name} placeholder="Last Name*" autoCapitalize='none' placeholderTextColor={pTC} onChangeText={(lastName) => this.setState({...this.state, lastName})}></TextInput>
          </View>

          <TextInput style={styles.input} placeholder="Company*" autoCapitalize='none' placeholderTextColor={pTC} onChangeText={(company) => this.setState({...this.state, company})}></TextInput>
          
          <TextInput style={styles.input} placeholder="Position*" autoCapitalize='none' placeholderTextColor={pTC} onChangeText={(position) => this.setState({...this.state, position})}></TextInput>

          <TextInput style={styles.input} placeholder="Password*" autoCapitalize='none' placeholderTextColor={pTC} secureTextEntry={true} onChangeText={(password) => this.setState({...this.state, password})}></TextInput>

          <TouchableOpacity style={styles.registerButton} onPress={() => authenticate()}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          
          <Text style={styles.orLogin}>or <Text style={styles.login} onPress={() => {this.leaveScreen()}}>Login</Text></Text>
        </View>

        <Image style={styles.logo} resizeMode={'contain'} source={require('../../assets/tphco.png')} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    username : state.username
  }
}


export default connect(mapStateToProps)(Register)