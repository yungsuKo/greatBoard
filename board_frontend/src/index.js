import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import promiseMiddlerware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducer from './_reducers';
import { StoreProvider } from './store';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider
      store={createStoreWidthMiddleware(
        reducer,
        //
        //개발자 도구를 사용하기 위한 설정
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider> */}
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
