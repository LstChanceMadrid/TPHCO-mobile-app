import { initialState } from "./initialState";
import { actionType } from './actionTypes/actionTypes'

const reducer = (state = initialState, action) => {
    switch (action.type) {

        // case actionType.ACTION_HERE: {
        //     return {
        //         ...state,
        //         someVariableHere: action.value
        //     }
        // }

        case actionType.ADMIN: {
            return {
                ...state,
                admin: action.value
            }
        }

        case actionType.LOGIN: {
            return {
                ...state,
                user: action.value
            }
        }

        case actionType.TIMESTAMPS: {
            return {
                ...state,
                timestamps: action.value
            }
        }

        case actionType.SET_STOCKS: {
            return {
                ...state,
                stockArray: action.value
            }
        }

        case actionType.SET_ISSUE_LIST: {
            return {
                ...state,
                issueList: action.value
            }
        }

        case actionType.SET_EVENTS: {
            return {
                ...state,
                events: action.value
            }
        }
        


        default: {
            return state
        }
    }
}

export default reducer