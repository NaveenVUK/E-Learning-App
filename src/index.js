import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import { StartGetStudents, StartGetAdminInfo, startGetCourses } from './Actions/AdminActions';
import App from './App';
import ConfigureStore from "./Store/ConfigureStore"
import { startGetStudent } from './Actions/StudentActions';

const store = ConfigureStore()

store.subscribe(() => {
  console.log("subscribe", store.getState());
})

if (localStorage.hasOwnProperty("token")) {
  const userRole = JSON.parse(localStorage.getItem("user"))
  if (userRole.role === "admin") {
    store.dispatch(StartGetAdminInfo())
    store.dispatch(StartGetStudents())
    store.dispatch(startGetCourses())
  } else if (userRole.role === "student") {
    store.dispatch(startGetStudent(userRole._id))
  }
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
