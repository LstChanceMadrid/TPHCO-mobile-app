import axios from 'axios'
import React, {Component} from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native';
import Stock from './Stock'
import StocksHeader from '../headers/StocksHeader'
import StockModalToggle from './StockModalToggle';




class StocksContainer extends Component {

    _isMounted=false

    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            tickers: [],
            username: this.props.username
        }
    }

    grabTickers = () => {
        axios.post('http://localhost:5000/tickers', {
            username: this.state.username
        }).then(response => {
            this.setState({...this.state, tickers: response.data.tickers})
        })
    }

    tickerInterval = () => {
        setInterval(() => this.grabTickers(), 5000)
    }

    componentDidMount = () => {
        this._isMounted=true
        this.grabTickers()
        this.tickerInterval()
    }

    componentWillUnmount = () => {
        this._isMounted=false
    }

    render() {
        let tickerArray = []

        this.state.tickers.map((ticker, i) => {
            let stockData = <Stock key={i} symbol={ticker} />

            tickerArray.push(stockData)
        })

        return (
            <View style={styles.container}>
                <StocksHeader />
                
                <StockModalToggle username={this.state.username} />

                <ScrollView style={styles.stocksContainer}>
                    {tickerArray}
                    
                    <View style={{height:65}}></View>
                </ScrollView>
            </View>
        )
    }
}

export default StocksContainer

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        paddingBottom: '33%'
    },
    stocksContainer : {
        paddingTop: 70,
        paddingBottom: 65
    },
    text : {
        color: 'white'
    }
})