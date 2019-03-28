import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
            let changePercent = stock.changePercent
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
            let positiveChangeOverTime = `+${parseFloat(stock.change).toFixed(3)}`
           
           return (
                <View style={styles.container}>
                    <View style={styles.stockInfo}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>{stock.companyName}</Text>

                            <Text style={styles.symbol}>{stock.ticker}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color:'white'}}>${stock.latestPrice}</Text>
                            
                            <View></View>

                            <Text style={{color: 'rgba(0, 255, 0, 1)'}}>{stock.change} ({stock.changePercent}%)</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: 'white'}}>open: {stock.open}</Text>

                            <Text style={{color: 'white'}}>close: {stock.close}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.stockPrice}>
                        <Text style={styles.current}>Day's Range</Text>

                        <Text style={styles.current}>{stock.low} - {stock.high}</Text>

                        {/* <View style={styles.positiveFlux}>
                            <Text style={{color: 'white', textAlign: 'right'}}>{positiveChangeOverTime}</Text>
                        </View> */}
                    </View>
                </View>
            )
        } else {
            let negativeChangeOverTime = parseFloat(stock.change).toFixed(3)

            return (
                <View style={styles.container}>
                    <View style={styles.stockInfo}>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.name}>{stock.companyName}</Text>

                            <Text style={styles.symbol}>{stock.ticker}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color:'white'}}>${stock.latestPrice}</Text>
                            <View></View>

                            <Text style={{color: 'rgba(255, 0, 0, 1)'}}>{stock.change} ({stock.changePercent}%)</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: 'white'}}>open: {stock.open}</Text>

                            <Text style={{color: 'white'}}>close: {stock.close}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.stockPrice}>
                        <Text style={styles.current}>Day's Range</Text>

                        <Text style={styles.current}>{stock.low} - {stock.high}</Text>
    
                        {/* <View style={styles.negativeFlux}>
                            <Text style={{color: 'white', textAlign: 'right'}}>{negativeChangeOverTime}</Text>
                        </View> */}
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
        borderBottomColor: 'rgba(25, 25, 25, 1)'
    },
    stockInfo : {
        flex : 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'scroll'
    },
    stockPrice : {
        flex : 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    symbol : {
        color: 'white',
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 5,
        fontSize: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    current : {
        color: 'white',
        paddingTop: 1,
        paddingBottom: 1
    },
    name: {
        color : 'rgba(150, 150, 150, 1)',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 12
    },
    negativeFlux: {
        backgroundColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        width: 75,
        paddingRight: 2,
        paddingTop: 4,
        paddingBottom: 4
    },
    positiveFlux: {
        backgroundColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        width: 75,
        paddingRight: 2,
        paddingTop: 4,
        paddingBottom: 4
    },
    // noFlux: {
    //     backgroundColor: 'rgba(200, 200, 200, 1)',
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     width: 75,
    //     paddingRight: 2,
    //     paddingTop: 4,
    //     paddingBottom: 4
    // },
    // chartWrapper: {
    //     flex: 1,
    //     padding: 10,
    //     width: '33%'
    // }

})



// stockInfo = (symbol) => {
//     axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/company`).then(company => {
//         const stockCompany = company.data
        
//         axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1m`).then(chartDay => {
            
//             const stockChartDay = chartDay.data
//             const lengthDay = stockChartDay.length
//             let monthData = []

//             for (let i in chartDay.data) {
//                 monthData.push(parseFloat(chartDay.data[i].close))
//             }

//             axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`).then(chartMinute => {
                
//                 const stockChartIntra = chartMinute.data
//                 let lengthMinute = stockChartIntra.length
//                 let minuteClose = stockChartIntra[lengthMinute-1].close
//                 if (minuteClose === null) {
//                     this.setState({
//                         ...this.state,
//                         stock: {
//                             symbol: stockCompany.symbol,
//                             name : stockCompany.companyName,
//                             date : stockChartIntra[lengthMinute - 1].date,
//                             changeOverTime : NaN,
//                             current : 'Error: returned null',
//                             monthData : monthData
//                         }
//                     })
//                 } else {
//                     this.setState({
//                         ...this.state,
//                         stock: {
//                             symbol: stockCompany.symbol,
//                             name : stockCompany.companyName,
//                             date : stockChartIntra[lengthMinute - 1].date,
//                             changeOverTime : minuteClose - stockChartDay[lengthDay-1].close, 
//                             current : minuteClose,
//                             monthData : monthData
//                         }
//                     })
//                 }
//             }).catch(e => console.log(e))
//         }).catch(e => console.log(e))
//     }).catch(e => console.log(e))
// }




   //     let monthData = this.state.stock.monthData
    //     let changeOverTime = this.state.stock.changeOverTime
    //     let name = this.state.stock.name
    //     let symbol = this.state.stock.symbol
    //     let current = this.state.stock.current
        
    //     if (changeOverTime > 0) {
    //        let positiveChangeOverTime = `+${parseFloat(changeOverTime).toFixed(3)}`
           
    //        return (
    //         <View style={styles.container}>
    //             <View style={styles.stockInfo}>
    //                 <Text style={styles.symbol}>{symbol}</Text>

    //                 <Text style={styles.name} numberOfLines={1} ellipsizeMode={"tail"}>{name}</Text>
    //             </View>

    //             <View style={styles.chartWrapper}>
    //                 <StockGraph symbol={symbol} graphLine={'green'} graphFill={'rgba(0, 255, 0, 0.2)'} monthData={monthData} />
    //             </View>
                
    //             <View style={styles.stockPrice}>
    //                 <Text style={styles.current}>{current}</Text>

    //                 <View style={styles.positiveFlux}>
    //                     <Text style={{color: 'white', textAlign: 'right'}}>{positiveChangeOverTime}</Text>
    //                 </View>
    //             </View>
    //         </View>
    //         )
    //        } else if (changeOverTime <= 0) {
    //         let negativeChangeOverTime = parseFloat(changeOverTime).toFixed(3)

    //         return (
    //             <View style={styles.container}>
    //                 <View style={styles.stockInfo}>
    //                 <Text style={styles.symbol}>{symbol}</Text>

    //                 <Text style={styles.name} numberOfLines={1} ellipsizeMode={"tail"}>{name}</Text>
    //                 </View>

    //                 <View style={styles.chartWrapper}>
    //                     <StockGraph symbol={symbol} graphLine={'red'} graphFill={'rgba(255, 0, 0, 0.2)'} monthData={monthData} />
    //                 </View>

    //                 <View style={styles.stockPrice}>
    //                     <Text style={styles.current}>{current}</Text>

    //                     <View style={styles.negativeFlux}>
    //                         <Text style={{color: 'white', textAlign: 'right'}}>{negativeChangeOverTime}</Text>
    //                     </View>
    //                 </View>
    //             </View>
    //         )
    //     } else {
    //         return (
    //             <View style={styles.container}>
    //                 <View style={styles.stockInfo}>
    //                 <Text style={styles.symbol}>{symbol}</Text>

    //                 <Text style={styles.name} numberOfLines={1} ellipsizeMode={"tail"}>{name}</Text>
    //                 </View>

    //                 <View style={styles.chartWrapper}>
    //                     <StockGraph symbol={symbol} graphLine={'white'} graphFill={'rgba(255, 255, 255, 0.2)'} monthData={monthData} />
    //                 </View>

    //                 <View style={styles.stockPrice}>
    //                     <Text style={styles.current}>{current}</Text>

    //                     <View style={styles.noFlux}>
    //                         <Text style={{color: 'white', textAlign: 'right'}}>NaN</Text>
    //                     </View>
    //                 </View>
    //             </View>
    //         )
    //     }