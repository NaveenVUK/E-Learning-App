import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import { StartGetStudents, StartGetAdminInfo } from './Actions/AdminActions';
import App from './App';
import ConfigureStore from "./Store/ConfigureStore"

const store = ConfigureStore()

store.subscribe(() => {
  console.log("subscribe", store.getState());
})

if (localStorage.hasOwnProperty("admin")) {
  store.dispatch(StartGetAdminInfo())
  store.dispatch(StartGetStudents())
}

if (localStorage.hasOwnProperty("student")) {

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
