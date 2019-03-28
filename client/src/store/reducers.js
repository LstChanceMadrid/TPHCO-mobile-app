import { combineReducers } from 'redux'
import { actionType } from './actionTypes/actionTypes'
import { initialState } from './initialState'

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        // user information

        case actionType.USER: {
            return {
                ...state,
                user: {
                    username: action.value.username,
                    email: action.value.email,
                    firstName: action.value.firstName,
                    lastName: action.value.lastName,
                    company: action.value.company,
                    position: action.value.position,
                }
            }
        }

        // handling Default stocks

        case actionType.DEFAULT_TICKERS: {
            return {
                ...state,
                defaultTickers: action.value
            }
        }

        case actionType.TOGGLE_TICKER: {
            let defaultTickers = []

            state.defaultTickers.map((ticker, index) => {
                if (index === action.index) {
                    defaultTickers.push({
                        id: ticker.id,
                        ticker: ticker.ticker,
                        name: ticker.name,
                        segment: ticker.segment,
                        isActive: action.value
                    })
                } else {
                    defaultTickers.push(ticker)
                }
            })
            return {
                ...state,
                defaultTickers: defaultTickers
            }
        }
        
        // handling personal stocks

        case actionType.OPEN_ADD_STOCK: {
            return {
                ...state,
                isAddVisible: true
            }
        }

        case actionType.CLOSE_ADD_STOCK: {
            return {
                ...state,
                isAddVisible: false
            }
        }

        case actionType.OPEN_REMOVE_STOCK: {
            return {
                ...state,
                isRemoveVisible: true
            }
        }

        case actionType.CLOSE_REMOVE_STOCK: {
            return {
                ...state,
                isRemoveVisible: false
            }
        }

        // Weeks

        case actionType.ISSUE_INFORMATION: {
            return {
                ...state,
                issue: action.value
            }
        }
        
        case actionType.SET_WEEK: {
            return {
                ...state,
                week: action.value
            }
        }

        case actionType.SET_ALT_STORIES: {
            return {
                ...state,
                altStories: action.value
            }
        }

        case actionType.SET_ISSUE_TITLES: {
            return {
                ...state,
                issueTitles: action.value
            }
        }


        // events

        case actionType.SET_EVENTS: {
            return {
                ...state,
                events: action.value
            }
        }











    }
    return state
}

export default rootReducer