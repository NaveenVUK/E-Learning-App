import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import ConfigureStore from "./Store/ConfigureStore"



const store = ConfigureStore()

store.subscribe(() => {
  console.log("subscribe", store.getState());
})

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


