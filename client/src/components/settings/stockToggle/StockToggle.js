import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { screenHeight, screenWidth } from '../../../constants/dimensions'
import { actionType } from '../../../store/actionTypes/actionTypes';


class StockToggle extends Component {
    constructor(props) {
        super(props)
    }

    handleTogglePress = async () => {
        if (this.props.isActive) {
            await this.props.toggleTicker(this.props.index, false)

            await AsyncStorage.setItem('defaultTickers', JSON.stringify(this.props.defaultTickers))
            
        } else {
            await this.props.toggleTicker(this.props.index, true)

            await AsyncStorage.setItem('defaultTickers', JSON.stringify(this.props.defaultTickers))
        }
    }

    toggleButton = () => {
        if (this.props.isActive) {
            return (
                <View style={styles.toggleBarTrue}>
                    <View style={styles.toggleButton}></View>
                </View>
            )
        } else {
            return (
                <View style={styles.toggleBarFalse}>
                    <View style={styles.toggleButton}></View>
                </View>
            )
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stock}>
            <Text style={styles.stockName}>{this.props.stockName}</Text>
            <Text style={styles.ticker}>{this.props.ticker}</Text>
        </View>
        
        <TouchableOpacity style={styles.toggleContainer} onPressIn={() => this.handleTogglePress()}>
            {this.toggleButton()}
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTicker: (index, value) => dispatch({type: actionType.TOGGLE_TICKER, index, value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockToggle)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(15, 15, 15, 1)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 55, 80, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5
    },
    stock: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    stockName: {
        color: 'rgba(100, 200, 255, 1)',
    },
    ticker: {
        color: 'rgba(200, 200, 200, 1)',
        fontWeight: 'bold'
    },
    toggleContainer: {
        flex: 1,
        alignItems: 'center'
    },
    toggleBarTrue: {
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(100, 200, 255, 1)',
        borderRadius: 50,
        width: screenWidth*4/24,
        height: 25,
        backgroundColor: 'rgba(0, 255, 0, 1)',
        alignItems: 'flex-start'
    },
    toggleBarFalse: {
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(100, 200, 255, 1)',
        borderRadius: 50,
        width: screenWidth*4/24,
        height: 25,
        backgroundColor: 'rgba(0, 255, 0, 0)',
        alignItems: 'flex-end'
    },
    toggleButton: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'rgba(100, 200, 255, 1)',
        width: '50%',
        backgroundColor: 'white',
        flex: 1
    }
})
