import axios from 'axios'
import React, {Component} from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native';
import Stock from './Stock'
import StockModalToggle from '../stockModal/StockModalToggle';
import { connect } from 'react-redux'
import BottomBanner from '../../global/BottomBanner';
import { URL } from '../../../constants/constants'




class StocksContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            tickers: [],
        }
    }

    grabTickers = () => {
        axios.post(URL.TICKERS_URL, {
            username: this.props.user.username
        }).then(response => {
            this.setState({...this.state, tickers: response.data.tickers})
        }).catch(e => console.log(e))
    }

    tickerInterval = () => {
        setInterval(() => this.grabTickers(), 50000)
    }

    componentDidMount = () => {
        this.grabTickers()
        this.tickerInterval()
    }

    render() {
        let tickerArray = []

        this.props.defaultTickers.map((ticker, i) => {
            
            if (ticker.isActive) {
            let stockData = <Stock key={i} symbol={ticker.ticker} />

            tickerArray.push(stockData)
            }
        })

        return (
            <View style={styles.container}>
                <StockModalToggle />

                <ScrollView style={styles.stocksContainer}>
                    {tickerArray}                    
                </ScrollView>
                <BottomBanner />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(StocksContainer)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    stocksContainer : {
        marginTop: 25,
    },
    text : {
        color: 'white'
    }
})