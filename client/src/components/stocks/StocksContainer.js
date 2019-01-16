import axios from 'axios'
import React, {Component} from 'react';
import {Dimensions, StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native';
import SortableList from 'react-native-sortable-list'
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
        this.setState({
            ...this.state,
            tickers: []
        })
        axios.post('http://localhost:5000/tickers', {
            username: this.state.username
        }).then(response => {
            response.data.tickers.map((ticker, i) => {
                this.setState({
                    ...this.state,
                    tickers: [...this.state.tickers, {i:i, ticker:ticker}]
                })
            })
        })
    }

    tickerInterval = () => {
        setInterval(() => this.grabTickers(), 55000)
    }

    componentDidMount = () => {
        this._isMounted=true
        this.grabTickers()
        this.tickerInterval()
    }

    componentWillUnmount = () => {
        this._isMounted=false
    }

    _renderRow = (data, active) => {

        return <Stock key={data.data.i} symbol={data.data.ticker} active={active} />
    }

    render() {
        return (
            <View style={styles.container}>
                <StocksHeader />
                <StockModalToggle username={this.state.username} />

                <ScrollView style={styles.stocksContainer}>
                    <SortableList 
                    
                        autoscrollAreaSize={100}
                        scrollEnabled={false}
                        data={this.state.tickers}
                        renderRow={this._renderRow}
                        rowActivationTime={200}
                    />

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
        width: '100%',
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