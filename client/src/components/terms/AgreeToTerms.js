import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { AsyncStorage, Image, Text, View, TouchableOpacity } from 'react-native';
import { postLoginNavigation, goToScreen } from './../../constants/navigation'
import { styles } from './styles/styles'
import { actionType } from '../../store/actionTypes/actionTypes';
import { URL } from '../../constants/constants'


class AgreeToTerms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  _storeTickers = async () => {
    axios.post(URL.STORE_TICKERS_URL).then(response => {
      let defaultTickersArray = []

        response.data.defaultTickers.map(item => {
          item.isActive = true
          defaultTickersArray.push(item)
        })

        AsyncStorage.setItem("defaultTickers", JSON.stringify(defaultTickersArray))
    }).catch(e => console.log(e))
  }

  _retrieveTickers = async () => {
    await AsyncStorage.getItem('defaultTickers', (err, response) => {
      let tickers = JSON.parse(response)

      this.props.setDefaultTickers(tickers)
    })
  }

  acceptTerms = async () => {
    const timeStamp = () => {
      axios.post(URL.TIMESTAMP_URL, {
            username: this.props.user.username,
            email: this.props.user.email
          }).catch(e => console.log(e))
    }
    await timeStamp()
    // navigate to energy stock page
    postLoginNavigation()
  }

  // componentDidMount = async () =>{
      
  // }

  render() {

    // this._storeTickers()
      this._retrieveTickers()

    return (
      <View style={styles.agreeContainer}>
        <Image style={styles.logo} resizeMode={'contain'} source={require('../../assets/tphco.png')} />
        
        <View>
          <Text style={styles.welcome}>Welcome to the TPH Energy News App! By clicking OK, you accept</Text>

          <TouchableOpacity style={styles.termsButtonContainer}>
            <Text style={styles.termsButtonText} accessibilityLabel="Terms of Service" onPress={() => goToScreen(this.props.componentId, "TermsOfService", "Terms of Service")}>(Terms of Service)</Text>
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
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDefaultTickers: (value) => dispatch({type: actionType.DEFAULT_TICKERS, value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreeToTerms)