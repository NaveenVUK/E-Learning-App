import React from "react";

import RegisterForm from "./RegisterForm/RegisterForm";
import LogInForm from "./LoginForm.js/LogInForm";
import Home from "./Home";

import { Link, Route, Switch } from "react-router-dom"

const NavBarContainor = () => {

    return (
        <>
            <Link to="/"> Home </Link>|
            <Link to="/register"> Register </Link>|
            <Link to="/login"> LogIn </Link>|

            <Switch>
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LogInForm} />
                <Route path="/" component={Home} />
            </Switch>
        </>
    )
}

export default NavBarContainor