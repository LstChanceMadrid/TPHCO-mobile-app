
import actionType from '../actionTypes/actionTypes'

// user information

export const setUsername = (value) => {
    return {
        type: actionType.USERNAME,
        value
    }
}










// open and close stocks modal

export const alterVisibility = (typeOfStockFunction) => {
    if (typeOfStockFunction === 'closeRemoveStock')
        return {
            type: actionType.CLOSE_REMOVE_STOCK
        }
    if (typeOfStockFunction === 'closeAddStock') {
        return {
            type: actionType.CLOSE_ADD_STOCK
        }
    }
    if (typeOfStockFunction === 'openAddStock') {
        return {
            type: actionType.OPEN_ADD_STOCK
        }
    }
    if (typeOfStockFunction === 'openRemoveStock') {
        return {
            type: actionType.OPEN_REMOVE_STOCK
        }
    }
}

export const closeRemoveStock = () => {
    return dispatch => dispatch(alterVisibility('closeRemoveStock'))
}

export const closeAddStock = () => {
    return dispatch => dispatch(alterVisibility('closeAddStock'))
}

export const openAddStock = () => {
    return dispatch => dispatch(alterVisibility('openAddStock'))
}

export const openRemoveStock = () => {
    return dispatch => dispatch(alterVisibility('openRemoveStock'))
}

// set week

export const isWeek = (week) => {
    if (week = '20190108') {
        return {
            ...state
        }
    }
}



export const setWeek = (week) => {
    return dispatch => dispatch(isWeek(week))
}