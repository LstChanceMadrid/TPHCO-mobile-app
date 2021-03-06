
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './store/reducers'
import { initialState } from './store/initialState'
import thunk from 'redux-thunk'

import { applyMiddleware, compose, createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import './styles/index.css'; // css styling

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,initialState,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
