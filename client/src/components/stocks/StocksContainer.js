import axios from 'axios'
import React, {Component} from 'react';
import {Modal, StyleSheet, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import StocksHeader from '../headers/StocksHeader'
import Stock from './Stock'
import AddStockToggle from './AddStockToggle'
import AddNewStock from './AddNewStock';

class StocksContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            tickers: [],
            isVisible: false
        }
    }

    grabTickers = () => {
        axios.post('http://localhost:5000/tickers', {
            username: this.props.username
        }).then(response => {
            this.setState({...this.state, tickers: response.data.tickers})
        })
    }

    tickerInterval = () => {
        setInterval(() => this.grabTickers(), 30000)
    }
    componentWillMount = () => {
        this.grabTickers()
    }

    componentDidMount = () => {
        this.tickerInterval()
    }

    componentWillUnmount = () => {
        clearInterval(this.tickerInterval())
    }




    render() {
        let tickerArray = []

        this.state.tickers.map((ticker, i) => {
            let stockData = <Stock key={i} symbol={ticker} />

            tickerArray.push(stockData)
        })

        const alterVisibility = () => {
            this.setState({
                ...this.state,
                isVisible: true
            })
        }

        
        return (
            <View style={styles.container}>
                <StocksHeader />
                <AddNewStock isVisible={this.state.isVisible} username={this.props.username} />

                <ScrollView style={styles.stocksContainer}>
                    <TouchableOpacity style={styles.addStock} onPress={() => alterVisibility()} >
                        <AddStockToggle isVisible={this.state.isVisible} />
                    </TouchableOpacity>
                    {tickerArray}
                    <View style={{height: 55}}></View>
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
    },
    stocksContainer : {
        paddingTop: 55,
        paddingBottom: 55
    },
    text : {
        color: 'white'
    },
    addStock: {
        flex: 1
    }
})