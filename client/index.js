import React from 'react'

import { AsyncStorage } from 'react-native'
import { applyMiddleware, compose, createStore } from 'redux'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as screen from './src/constants/screenLayouts'
import AddStock from './src/components/stocks/AddStock'
import AgreeToTerms from './src/components/terms/AgreeToTerms'
import Dashboard from './src/components/Dashboard';
import EnergyTechWeekly from './src/components/EnergyTechWeekly';
import Login from './src/components/authentication/Login'
import Register from './src/components/authentication/Register'
import RemoveStock from './src/components/stocks/RemoveStock'
import StockModalToggle from './src/components/stocks/StockModalToggle'
import TermsOfService from './src/components/terms/TermsOfService';

import rootReducer from './src/store/reducers';


const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))



Navigation.registerComponent('AddStock', () => (props) => (
    <Provider store={store}>
        <AddStock {...props} />
    </Provider>
), () => AddStock)

Navigation.registerComponent('AgreeToTerms', () => (props) => (
    <Provider store={store}>
        <AgreeToTerms {...props} />
    </Provider>
), () => AgreeToTerms)

Navigation.registerComponent('Dashboard', () => (props) => (
    <Provider store={store}>
        <Dashboard {...props} />
    </Provider>
), () => Dashboard)

Navigation.registerComponent('EnergyTechWeekly', () => (props) => (
    <Provider store={store}>
        <EnergyTechWeekly {...props} />
    </Provider>
), () => EnergyTechWeekly)

Navigation.registerComponent('Login', () => (props) => (
    <Provider store={store}>
        <Login {...props} />
    </Provider>
), () => Login)

Navigation.registerComponent('Register', () => (props) => (
    <Provider store={store}>
        <Register {...props} />
    </Provider>
), () => Register)

Navigation.registerComponent('RemoveStock', () => (props) => (
    <Provider store={store}>
        <RemoveStock {...props} />
    </Provider>
), () => RemoveStock)

Navigation.registerComponent('StockModalToggle', () => (props) => (
    <Provider store={store}>
        <StockModalToggle {...props} />
    </Provider>
), () => StockModalToggle)

Navigation.registerComponent('TermsOfService', () => (props) => (
    <Provider store={store}>
        <TermsOfService {...props} />
    </Provider>
), () => TermsOfService)



_retrieveAsyncStorageLoginStatus = async () => {
    try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
        const username = await AsyncStorage.getItem('username')
        const email = await AsyncStorage.getItem('email')

        if (JSON.parse(isLoggedIn)) {
            Navigation.setRoot({
                root : {
                    stack: {
                        id: 'AcceptTermsStack',
                        children: [
                            {component : screen.termsOfService},
                            {component : screen.agreeToTerms}
                        ]
                    }
                }
            })
        } else {
            Navigation.setRoot({
                root : {
                    stack: {
                        options: {
                            topBar: {
                                visible: 'false'
                            }
                        },
                        id: 'PreLoginStack',
                        children: [
                            {component : screen.register},
                            {component : screen.login}
                        ]
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}





Navigation.events().registerAppLaunchedListener(() => {
    

    _retrieveAsyncStorageLoginStatus()

    
    
})