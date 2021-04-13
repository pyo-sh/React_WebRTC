import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from 'styles/GlobalStyle';
// Redux 기본 Setting
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// Redux / Saga 나의 Setting
import rootReducer from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);