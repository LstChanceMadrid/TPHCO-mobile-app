import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { AsyncStorage, Image,StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';


// type Props = {}; Component<Props>
class AgreeToTerms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  componentWillMount = () => {
    
    
  }

  componentDidMount = async () =>{
    if (!this.props.username) {
      let username = await AsyncStorage.getItem("username")
      let email = await AsyncStorage.getItem("email")
      console.log(username)
      this._storeData(username, email)
    } else {
      this._storeData(this.props.username, this.props.email)
      console.log(this.props.username)
      console.log(this.props.email)
    }
    
  }

  
  _storeData = async (username, email) => {
    try {
        await AsyncStorage.setItem("isLoggedIn", 'true', res => {})
        await AsyncStorage.setItem("username", `${username}`, res => {})
        await AsyncStorage.setItem("email", `${email}`, res => {})
    } catch(error){
        console.log(error)
    }
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        options: {
          topBar: {
            visible: 'true',
            title: {
              text: 'Terms of Service'
            }
          }
        },
        name: screenName
      }
    })
  }

  




  acceptTerms = async () => {
    if (!this.props.username) {
      let status = await AsyncStorage.getItem('isLoggedIn', res => {
      })
      console.log(status)
      let username = await AsyncStorage.getItem('username')
      let email = await AsyncStorage.getItem('email')
      
      this.setState({
        ...this.state,
        username: username,
        email: email
      })

      await axios.post('http://localhost:5000/timeStamp', {
            username: this.state.username,
            email: this.state.email
          }).catch(e => console.log(error))
    } else {
      await axios.post('http://localhost:5000/timeStamp', {
        username: this.props.username,
        email: this.props.email
      }).catch(e => console.log(error))
    }
    



      

    navigate = (username, email) => {

      Navigation.setRoot({
        root: {
          stack: {
            id: 'PostLoginStack',
            children: [
              {
                component : {
                  id: 'EnergyTechWeekly',
                  name: 'EnergyTechWeekly',
                  passProps: {
                    username : username,
                    email: email
                  },
                  options: {
                    title: {
                      text: 'EnergyTechWeekly'
                    },
                    topBar: {
                      visible: 'false',
                    }
                  }
                }
              },
              {
                component: {
                  id: 'Dashboard',
                  name: 'Dashboard',
                  passProps: {
                    username : username,
                    email: email
                  },
                  options: {
                    title: {
                      text: 'Dashboard'
                    },
                    topBar: {
                      visible: 'false',
                    },
                    children : [
                      {
                        component : {
                          id: 'EnergyTechWeekly',
                          name: 'EnergyTechWeekly',
                          options: {
                            title: {
                                text: 'EnergyTechWeekly'
                            },
                            topBar: {
                                visible: 'false'
                            }
                          }
                        }
                      }
                    ],
                  }
                }
              }
            ]
          }
        }
      })
    }
    navigate(this.props.username, this.props.email)
  }
  
  

  render() {
    this._storeData()
    return (
      <View style={styles.container}>
        <Image style={styles.logo} resizeMode={'contain'} source={require('../../styles/images/tphco.png')} />
        
        <View>
          <Text style={styles.welcome}>Welcome to the TPH Energy News App! By clicking OK, you accept</Text>

          <TouchableOpacity style={styles.termsButtonContainer}>
            <Text style={styles.termsButtonText} accessibilityLabel="Terms of Service" onPress={() => this.goToScreen("TermsOfService")}>(Terms of Service)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.acceptTerms()}>
          <Text style={styles.ok}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    // username : state.user.username,
    // email: state.user.email

  }
}


export default connect(mapStateToProps)(AgreeToTerms)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingRight: 25,
    paddingLeft: 25,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 30, 40, 1)',
  },
  logo: {
    width: 300,
    paddingBottom: 100,
    tintColor: 'rgba(255, 255, 255, 1)'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  instructions: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 50,
    width: 200,
    margin: 25,
  },
  ok: {
    color: 'rgba(0, 30, 40, 1)',
    fontWeight: 'bold',
    fontSize: 20
  },
  termsButtonContainer: {
    padding: 0,
    margin: 0,
  },
  termsButtonText: {
    padding: 5,
    paddingBottom: 15,
    color: 'rgba(110, 90, 25, 1)',
    textAlign: 'center',
    fontSize: 22
  }
});
