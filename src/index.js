import React from 'react';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configure } from '@testing-library/dom';
import { Provider } from 'react-redux';
import Reducer from "./redux/Reducer"
const store = configureStore({
  middleware: [thunk],
  reducer: Reducer
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
