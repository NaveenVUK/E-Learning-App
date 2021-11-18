import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ConfigureStore from "./Store/ConfigureStore"

const store = ConfigureStore()

store.subscribe(() => {
  console.log("subscribe", store.getState());
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


