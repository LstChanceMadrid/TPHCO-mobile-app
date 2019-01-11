import {combineReducers } from 'redux'

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

            return state
}



export default rootReducer