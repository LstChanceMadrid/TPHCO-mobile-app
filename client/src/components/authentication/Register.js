import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'axios'


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

    const authenticate = async () => {

      await axios.post('http://localhost:5000/register', {
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
      })
    }

    const pTC = 'rgba(0, 0, 0, 0.5)'
    
    return (
      <View style={styles.container}>
        <View style={styles.registerContainer}>
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
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          
          <Text style={styles.orLogin}>or <Text style={styles.login} onPress={() => {this.leaveScreen()}}>Login</Text></Text>
        </View>

        <Image style={styles.logo} resizeMode={'contain'} source={require('../../styles/images/tphco.png')} />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 30, 40, 1)',
    justifyContent: 'center',
    padding: 20,
  },
  registerContainer: {
    borderRadius: 25,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 10
  },
  title: {
    textAlign: 'center'
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  name : {
    width: '45%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    marginTop: 20
  },
  registerButton: {
    backgroundColor: 'blue',
    width: 120,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  registerButtonText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center'
  },
  orLogin: {
    textAlign: 'right'
  },
  login: {
    color: 'blue'
  },
  logo: {
    width: 300,
    height: 200,
    tintColor: 'rgba(255, 255, 255, 1)',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center'
  }
})
