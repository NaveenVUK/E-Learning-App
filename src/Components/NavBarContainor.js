import React, { useEffect, useState } from "react";

import RegisterForm from "./RegisterForm/RegisterForm";
import LogInForm from "./LoginForm.js/LogInForm";
import Home from "./Home";
import Account from "./AccountInfo/Account";

import { Link, Route } from "react-router-dom"
import DashBoard from "./DashBoard";

const NavBarContainor = (props) => {
    const [isLoggedIn, setIsloggedIn] = useState(false)

    const userLoggedStatus = () => {
        const toggle = !isLoggedIn
        setIsloggedIn(toggle)
    }

    useEffect(() => {
        localStorage.getItem("token") && userLoggedStatus()
    }, [])

    const handleLogOut = () => {
        const confirm = window.confirm("Are you Sure?")
        if (confirm) {
            localStorage.clear()
            userLoggedStatus()
        }
    }

    return (
        <>
            <Link to="/"> Home </Link>|
            {isLoggedIn ? (
                <>
                    <Link to="/dashboard"> DashBoard</Link>|
                    <Link to="/account"> Account </Link>|
                    <Link to="/" onClick={handleLogOut}> Logout </Link>|
                </>
            ) : (
                <>
                    <Link to="/register"> Register </Link>|
                    <Link to="/login"> Login </Link>|
                </>
            )}

            <Route path="/register" component={RegisterForm} />
            <Route path="/" component={Home} exact />
            <Route path="/login" render={(props) => {
                return <LogInForm {...props} userLoggedStatus={userLoggedStatus} />
            }} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/account" component={Account} />
        </>
    )
}

export default NavBarContainor