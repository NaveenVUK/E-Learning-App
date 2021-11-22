import React, { useEffect, useState } from "react";

import RegisterForm from "./RegisterForm/RegisterForm";
import Home from "./Home";
import Account from "./AccountInfo/Account";
import AdminLogIn from "./LoginForm.js/AdminLogin";
import StudentLogIn from "./LoginForm.js/StudentLogin";

import { Link, Route } from "react-router-dom"
import DashBoard from "./DashBoard";

import { Menu, MenuItem, Button } from "@mui/material";

const NavBarContainor = (props) => {
    const [isLoggedIn, setIsloggedIn] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const userLoggedStatus = () => {
        const toggle = !isLoggedIn
        setIsloggedIn(toggle)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget)
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
                    {/* <Link to="/admin/login"> Admin Login </Link>|
                    <Link to="/student/login"> Student Login </Link>| */}
                    <Button
                        aria-controls="menu"
                        onClick={handleOpenMenu}
                        disableRipple
                        variant="contained"
                        color="primary"
                    >
                        Log in
                    </Button>
                    <Menu
                        id="menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}><Link to="/admin/login"> Admin </Link> </MenuItem>
                        <MenuItem onClick={handleMenuClose}><Link to="/student/login"> Student </Link> </MenuItem>
                    </Menu>
                </>
            )
            }

            <Route path="/register" component={RegisterForm} />
            <Route path="/" component={Home} exact />
            <Route path="/admin/login" render={(props) => {
                return <AdminLogIn {...props} userLoggedStatus={userLoggedStatus} />
            }} />
            <Route path="/student/login" render={(props) => {
                return <StudentLogIn {...props} userLoggedStatus={userLoggedStatus} />
            }} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/account" component={Account} />
        </>
    )
}

export default NavBarContainor