import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

//polyfill
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support

import '../node_modules/react-flexbox-grid/dist/react-flexbox-grid.css';
import './styles/styles.css';

import reducers from './reducers';
import App from './App';

const GlobalStyle = createGlobalStyle`
  ${reset};
`;

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk, promiseMiddleware()))
      )
    : createStore(
        reducers,
        composeEnhancers(
          applyMiddleware(thunk, createLogger(), promiseMiddleware())
        )
      );

ReactDOM.render(
  <Provider store={store}>
    <>
      <GlobalStyle />
      <App />
    </>
  </Provider>,
  document.getElementById('root')
);
