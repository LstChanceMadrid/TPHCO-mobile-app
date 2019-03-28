import React, {Component} from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import StocksContainer from './stocks/StocksContainer'
import BottomBanner from '../global/BottomBanner';




class EnergyStocks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })
  }
  
  render() {    
    return (
      <View style={styles.container}>

        <StocksContainer style={styles.stocksContainer} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(EnergyStocks)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
  },
  stocksContainer: {
    height: '100%'
  }, 
  text : {
    color: 'white'
  }
})
