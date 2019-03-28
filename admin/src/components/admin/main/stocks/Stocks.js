import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { actionType } from '../../../../store/actionTypes/actionTypes';
import { URL } from '../../../../constants/constants'

class Stocks extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    addStock = () => {
        axios.post(URL.ADMIN_ADD_STOCK_URL, {
            ticker: this.state.ticker,
            name: this.state.name,
            segment: this.state.segment
        }).then(response => {
            if (response.data.success) {
                this.getStocks()
            }

            this.setState({
                ...this.state,
                message: response.data.message
            })
        }).catch(e => console.log(e))
    }

    removeStock = (e) => {
        console.log(e.target)
        axios.post(URL.ADMIN_REMOVE_STOCK_URL, {
            ticker: e.target.value,
            name: e.target.name
        }).then(response => {
            console.log(response)
            if (response.data.success) {
                this.getStocks()
            }

            this.setState({
                ...this.state,
                message: response.data.message
            })
        })
    }

    getStocks = async () => {
        let stockArray = []
        await axios.post(URL.ADMIN_STOCKS_URL).then(response => {
            const stocks = response.data.response

            stocks.map((stock, i) => {
                let stockItem = 
                    <div key={i} className='stock-item-container'>
                        <div className='stock-info'>
                            <p>{stock.ticker}</p>
                            <p>{stock.name}</p>
                            <p>{stock.segment}</p>

                            <div>   
                                <button>Edit</button>
                                <button name={stock.name} onClick={(e) => {this.removeStock(e)}} value={stock.ticker}>Remove</button>
                            </div>
                        </div>
                    </div>

                return stockArray.push(stockItem)
            })
        }).catch(e => console.log(e))

        this.props.setStocks(stockArray)
    }

    componentDidMount = () => {
        this.getStocks()
    }

  render() {
    return (
      <div className='stock-container'>
        <div className='stocks-header'>
            <h1>Stocks</h1>
        </div>
        
        {this.props.stockArray}

        <div className='new-stock'>
            {this.state.message}
            <h2>Add New Stock</h2>
            <input id='ticker' name='ticker' type='text' onChange={(e) => this.handleInput(e)} required />
            <input id='name' name='name' type='text' onChange={(e) => this.handleInput(e)} required />
            <select type='select' name='segment' onChange={(e) => this.handleInput(e)} required >
                <option value={null}></option>
                <option title='UPSTREAM' value='UPSTREAM'>UPSTREAM</option>
                <option title='MIDSTREAM' value='MIDSTREAM'>MIDSTREAM</option>
                <option title='OFS' value='OFS'>OFS</option>
                <option title='CHEMICALS' value='CHEMICALS'>CHEMICALS</option>
                <option title='EXPLORATION & PRODUCTION' value='EXPLORATION & PRODUCTION'>EXPLORATION & PRODUCTION</option>
            </select>

            <button onClick={() => this.addStock()}>Add</button>
        </div>
        
      </div>
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
        setStocks: (value) => dispatch({type: actionType.SET_STOCKS, value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocks)
