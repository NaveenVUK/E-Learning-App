import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import { StartGetStudents, StartUserInfo } from './Actions/UserActions';
import App from './App';
import ConfigureStore from "./Store/ConfigureStore"

const store = ConfigureStore()

store.subscribe(() => {
  console.log("subscribe", store.getState());
})

if (localStorage.hasOwnProperty("token")) {
  store.dispatch(StartUserInfo())
  store.dispatch(StartGetStudents())
}

const Result = (
  <Provider store={store}>
    <BrowserRouter>
      <div className="bodyStyle">
        <App />
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(Result, document.getElementById('root'));
