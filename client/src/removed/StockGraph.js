import React from 'react'
import { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import axios from 'axios'

class StockGraph extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state
        }
    }

    render() {
        let data = []
        for (let i in this.props.monthData) {
            data.push(this.props.monthData[i])
        }

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={this.props.graphLine}
                fill={'none'}
            />
        )

        const Gradient = ({ index }) => (
            <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={this.props.graphFill} stopOpacity={0.8}/>
                    <Stop offset={'28%'} stopColor={'rgb(0, 0, 0)'} stopOpacity={0}/>
                </LinearGradient>
            </Defs>
        )
        
        return (
            <AreaChart
                style={{ height: 75 }}
                data={data}
                contentInset={{ top: 0, bottom: 10 }}
                svg={{ fill: 'url(#gradient)' }}
            >
                <Grid/>
                <Line/>
                <Gradient />
            </AreaChart>
        )
    }
}

export default StockGraph
