import {combineReducers} from 'redux'
import {
    TYPE_HANDLE_ERROR_REMOTE_MSG,
    TYPE_SELECT_CHANNEL,
    TYPE_FETCHING_REMOTE_DATA,
    TYPE_HANDLE_RECEIVED_DATA
} from '../actions'

function post(state, action) {
    switch(action.type) {
        case TYPE_HANDLE_RECEIVED_DATA:
            if (action.receivedData) {
                return {
                    ...state,
                    items: action.receivedData
                }
            }
            return state
        default:
            return state
    }
}

export function posts(state = {}, action) {
    switch(action.type) {
        case TYPE_HANDLE_RECEIVED_DATA:
        case TYPE_HANDLE_ERROR_REMOTE_MSG:
        case TYPE_FETCHING_REMOTE_DATA:
            return {
                ...state,
                [action.channel]: post(state[action.channel], action)
            }
        default:
            return state
    }
}

export function selectedChannel(state = 'reactjs', action) {
    switch(action.type) {
        case TYPE_SELECT_CHANNEL:
            if (action.selectedChannel === state.selectedChannel) {
                return state
            } else {
                return action.selectedChannel
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
    selectedChannel
})

