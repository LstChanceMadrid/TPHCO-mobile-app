import React, { Component } from 'react'
import { AsyncStorage, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import StockToggle from './stockToggle/StockToggle';
import { styles } from './styles/styles'
import BottomBanner from '../global/BottomBanner';

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state ={
      defaultTickerArray: []
    }
  }

  //
  // formatting the ticker array
  // 

  _formatTickers = () => {
    let defaultTickerArray = []
      this.props.defaultTickers.map((ticker,i) => {
         defaultTickerArray.push(<StockToggle key={i} index={i} stockName={ticker.name} ticker={ticker.ticker} isActive={ticker.isActive} />)
    })
    return defaultTickerArray
  }

  componentDidMount = () => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: 'Settings',
          color: 'white',
          alignment: 'center'
        }
      }
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.settingsContainer}>
          <View style={styles.stockTitle}>
            <Text>Stocks</Text>
          </View>

            {this._formatTickers()}
        </ScrollView>

        <View style={styles.banner}>
            <BottomBanner />
          </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Settings)