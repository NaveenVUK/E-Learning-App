import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import ConfigureStore from "./Store/ConfigureStore"



const store = ConfigureStore()

store.subscribe(() => {
  console.log("subscribe", store.getState());
})

const Result = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(Result, document.getElementById('root'));


