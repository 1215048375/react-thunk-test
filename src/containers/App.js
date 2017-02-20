import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'
import SelectChannel from './SelectChannel'

/**
 * 组件需要是一个function || component class
 * @constructor
 */
const loggerMiddleware = createLogger()

const confStore = (preloadedState) => createStore(
    reducer,
    preloadedState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

const store = confStore()

export default class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <SelectChannel/>
            </Provider>
        )
    }

}