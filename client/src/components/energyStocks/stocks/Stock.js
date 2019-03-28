import React, {Component} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios'




class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            stock: {
                meta : '',
                data : ''
            }
        }
    }
    
    stockQuote = (symbol) => {
        axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`).then(response => {
            let stock = response.data

            let ticker = stock.symbol
            let companyName = stock.companyName
            let open = stock.open
            let close = stock.close
            let change = stock.change
            let changePercent = stock.changePercent.toFixed(4)
            let latestPrice = stock.latestPrice
            let high = stock.high
            let low = stock.low

            this.setState({
                stock: {
                    ticker, companyName, open, close, change, changePercent, latestPrice, high, low
                }
            })
        }).catch(e => console.log(e))
    }

    componentWillMount = () => {
        this.stockQuote(this.props.symbol)
    }

    render() {
        let stock = this.state.stock


        if (stock.change > 0) {
           
           return (
            <View style={styles.container}>
                <View style={styles.stockInfo}>

                    <View style={styles.row}>
                        <Text style={styles.companyName}>{stock.companyName}</Text>

                        <Text style={styles.symbol}>{stock.ticker}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.latestPricePositive}>${stock.latestPrice}</Text>

                        {/* <Image style={styles.arrowPositive} resizeMode={'contain'} source={require('../../../assets/arrow.png')} /> */}
                </View>

                <View style={styles.row}>
                    <Text style={styles.openCloseText}>open:</Text>

                    <Text style={styles.openCloseNumber}>{stock.open}</Text>
                    
                    <Text style={styles.openCloseText}>close:</Text>
                    
                    <Text style={styles.openCloseNumber}>{stock.close}</Text>
                </View>
            </View>
            
            <View style={styles.daysRange}>
                <Text style={styles.daysRangeText}>Day's Range</Text>

                <Text style={styles.daysRangeNumber}>{stock.low} - {stock.high}</Text>

                <Text style={styles.change}>Change</Text>

                <Text style={styles.positiveChange}>{stock.change} ({stock.changePercent}%)</Text>
            </View>
        </View>
            )
        } else {

            return (
                <View style={styles.container}>
                    <View style={styles.stockInfo}>

                        <View style={styles.row}>
                            <Text style={styles.companyName}>{stock.companyName}</Text>

                            <Text style={styles.symbol}>{stock.ticker}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.latestPriceNegative}>${stock.latestPrice}</Text>

                            {/* <Image style={styles.arrowNegative} resizeMode={'contain'} source={require('../../../assets/arrow.png')} /> */}
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.openCloseText}>open:</Text>

                            <Text style={styles.openCloseNumber}>{stock.open}</Text>
                            
                            <Text style={styles.openCloseText}>close:</Text>
                            
                            <Text style={styles.openCloseNumber}>{stock.close}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.daysRange}>
                        <Text style={styles.daysRangeText}>Day's Range</Text>

                        <Text style={styles.daysRangeNumber}>{stock.low} - {stock.high}</Text>

                        <Text style={styles.change}>Change</Text>

                        <Text style={styles.negativeChange}>{stock.change} ({stock.changePercent}%)</Text>
                    </View>
                </View>
            )
        }
    }
}

export default Stock

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 55, 80, 1)'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },  
    stockInfo : {
        flex : 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'scroll'
    },
    companyName: {
        color : 'rgba(100, 200, 255, 1)',
        paddingTop: 1,
        paddingBottom: 1,
        fontSize: 12
    },
    symbol : {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
        fontSize: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    latestPriceNegative: {
        color: 'rgba(255, 200, 200, 1)',
        fontSize: 18,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    latestPricePositive: {
        color: 'rgba(200, 255, 200, 1)',
        fontSize: 18,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    arrowNegative: {
        tintColor: 'rgba(255, 200, 200, 1)',
        padding: 5
    },
    arrowPositive: {
        tintColor: 'rgba(200, 255, 200, 1)',
        padding: 5
    },
    daysRange : {
        flex : 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    daysRangeText: {
        color: 'rgba(200, 200, 200, 1)',
        fontSize: 12
    },
    daysRangeNumber: {
        color: 'rgba(255, 255, 255, 1)',
        paddingLeft: 2,
        fontWeight: 'bold',
        fontSize: 12
    },
    openCloseText: {
        color: 'rgba(200, 200, 200, 1)',
    },
    openCloseNumber: {
        paddingLeft: 5,
        paddingRight: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    change: {
        color: 'rgba(200, 200, 200, 1)',
        fontSize: 12
    },
    negativeChange: {
        color: 'rgba(255, 0, 0, 1)',
        paddingLeft: 4,
        fontWeight: 'bold'
    },
    positiveChange: {
        color: 'rgba(0, 255, 0, 1)',
        paddingLeft: 2,
        fontWeight: 'bold'
    }
})



