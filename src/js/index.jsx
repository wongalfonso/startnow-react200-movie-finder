import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from "redux-promise-middleware";
import reducers from './reducers';
import thunk from "redux-thunk";
import logger from "redux-logger";
import App from './app';



/* eslint-disable no-underscore-dangle */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleware()))
);
/* eslint-enable */


render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

