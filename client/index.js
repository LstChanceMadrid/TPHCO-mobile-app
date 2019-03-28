import React from 'react'

import { applyMiddleware, compose, createStore } from 'redux'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './src/store/reducers';

import AddStock from './src/components/energyStocks/stockModal/AddStock'
import AgreeToTerms from './src/components/terms/AgreeToTerms'
import EnergyNews from './src/components/energyNews/EnergyNews'
import EnergyNewsHeader from './src/components/energyNews/header/EnergyNewsHeader'
import EnergyStocks from './src/components/energyStocks/EnergyStocks';
import EnergyTechWeekly from './src/components/energyTechWeekly/EnergyTechWeekly';
import ForgotPassword from './src/components/authentication/ForgotPassword';
import Initializing from './src/components/Initializing'
import Issue from './src/components/energyTechWeekly/issue/Issue'
import IssueList from './src/components/energyTechWeekly/issueList/IssueList'
import Login from './src/components/authentication/Login'
import Register from './src/components/authentication/Register'
import RemoveStock from './src/components/energyStocks/stockModal/RemoveStock'
import Settings from './src/components/settings/Settings'
import StockModalToggle from './src/components/energyStocks/stockModal/StockModalToggle'
import StocksHeader from './src/components/energyStocks/header/StocksHeader'
import TermsOfService from './src/components/terms/TermsOfService';
import TPHEvents from './src/components/tPHEvents/TPHEvents'

//
// creating the store adding thunk middleware
//

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

//
// registering all components that navigate using 'react-native-navigation'
//

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

Navigation.registerComponent('EnergyNews', () => (props) => (
    <Provider store={store}>
        <EnergyNews {...props} />
    </Provider>
), () => EnergyNews)

Navigation.registerComponent('EnergyNewsHeader', () => (props) => (
    <Provider store={store}>
        <EnergyNewsHeader {...props} />
    </Provider>
), () => EnergyNewsHeader)

Navigation.registerComponent('EnergyStocks', () => (props) => (
    <Provider store={store}>
        <EnergyStocks {...props} />
    </Provider>
), () => EnergyStocks)

Navigation.registerComponent('EnergyTechWeekly', () => (props) => (
    <Provider store={store}>
        <EnergyTechWeekly {...props} />
    </Provider>
), () => EnergyTechWeekly)

Navigation.registerComponent('ForgotPassword', () => (props) => (
    <Provider store={store}>
        <ForgotPassword {...props} />
    </Provider>
), () => ForgotPassword)

Navigation.registerComponent('Initializing', () => (props) => (
    <Provider store={store}>
        <Initializing {...props} />
    </Provider>
), () => Initializing)

Navigation.registerComponent('Issue', () => (props) => (
    <Provider store={store}>
        <Issue {...props} />
    </Provider>
), () => Issue)

Navigation.registerComponent('IssueList', () => (props) => (
    <Provider store={store}>
        <IssueList {...props} />
    </Provider>
), () => IssueList)

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

Navigation.registerComponent('Settings', () => (props) => (
    <Provider store={store}>
        <Settings {...props} />
    </Provider>
), () => Settings)

Navigation.registerComponent('StockModalToggle', () => (props) => (
    <Provider store={store}>
        <StockModalToggle {...props} />
    </Provider>
), () => StockModalToggle)

Navigation.registerComponent('StocksHeader', () => (props) => (
    <Provider store={store}>
        <StocksHeader {...props} />
    </Provider>
), () => StocksHeader)

Navigation.registerComponent('TermsOfService', () => (props) => (
    <Provider store={store}>
        <TermsOfService {...props} />
    </Provider>
), () => TermsOfService)

Navigation.registerComponent('TPHEvents', () => (props) => (
    <Provider store={store}>
        <TPHEvents {...props} />
    </Provider>
), () => TPHEvents)

//
// registering the topBar/side menu buttons
//

Navigation.events().registerNavigationButtonPressedListener(event => {
    Navigation.push(event.componentId, {
        component: {
            name: event.buttonId,
            options: {
                bottomTabs: {
                    visible: false,
                    drawBehind: true,
                },
                topBar: {
                    background: {
                        color: 'rgba(0, 55, 80, 1)'
                    },
                    backButton: {
                        showTitle: false
                    },
                }
            }
        }
    })
})

//
// launching the app
//

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                id: 'Initializing',
                name: 'Initializing',
                options: {
                    topBar: {
                        drawBehind: true,
                        visible: false
                    }
                }
            }
        }
    })
})