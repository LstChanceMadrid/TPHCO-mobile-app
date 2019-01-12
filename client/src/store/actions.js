
import * as actionTypes from './actionTypes'


export const alterVisibility = (typeOfStockFunction) => {
    if (typeOfStockFunction === 'closeRemoveStock')
        return {
            type: actionTypes.CLOSE_REMOVE_STOCK
        }
    if (typeOfStockFunction === 'closeAddStock') {
        return {
            type: actionTypes.CLOSE_ADD_STOCK
        }
    }
    if (typeOfStockFunction === 'openAddStock') {
        return {
            type: actionTypes.OPEN_ADD_STOCK
        }
    }
    if (typeOfStockFunction === 'openRemoveStock') {
        return {
            type: actionTypes.OPEN_REMOVE_STOCK
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