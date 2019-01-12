import {combineReducers } from 'redux'
import * as actionTypes  from './actionTypes'

export const initialState = {
    isAuthenticated: false,
    termsAccepted: false,
    user: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        position: '',
        company: '',
    },
    isRemoveVisible: false,
    isAddVisible: false,
}

const rootReducer = (state = initialState, action) => {

    if (action.type = actionTypes.CLOSE_REMOVE_STOCK) {
        return {
            ...state,
            isRemoveVisible: false
        }
    }

    if (action.type = actionTypes.CLOSE_ADD_STOCK) {
        return {
            ...state,
            isAddVisible: false
        }
    }

    if (action.type = actionTypes.OPEN_REMOVE_STOCK) {
        return {
            ...state,
            isRemoveVisible: true
        }
    }

    if (action.type = actionTypes.OPEN_ADD_STOCK) {
        return {
            ...state,
            isAddVisible: true
        }
    }



    return state
}



export default rootReducer