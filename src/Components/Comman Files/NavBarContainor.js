import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom"

import RegisterForm from "../Admin module/RegisterForm";
import Home from "./Home";
import Account from "../Admin module/Account";
import AdminLogIn from "../Admin module/AdminLogin";
import StudentLogIn from "../Student Module/StudentLogin";
import AllStudents from "../Admin module/AllStudents";
import DashBoard from "../Admin module/DashBoard";

import { Menu, MenuItem, Button, AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import swal from "sweetalert";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import StudentCourses from "../Student Module/StudentCourses";
import Courses from "../Admin module/AllCources/Courses"
import CreateCourse from "../Admin module/AllCources/CreateCourse";

const useStyle = makeStyles({
    root: {
        marginTop: "5px",
        marginBottom: "5px",
        alignItems: "center",
    },
    linkStyle: {
        color: "inherit",
        textDecoration: "none",
        verticalAlign: 'middle',
        fontFamily: "Arial, sans-serif"

    },
    imageStyle: {
        height: "2rem",
        flexGrow: 1,
        width: "100",
        marginRight: "60rem",
    }
})

const NavBarContainor = (props) => {
    const [isLoggedIn, setIsloggedIn] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyle()

    // const userRole = useSelector((state) => {
    //     return state.user.user.role
    // })

    const userRole = JSON.parse(localStorage.getItem("user"))

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
        localStorage.clear()
        userLoggedStatus()
        swal("Great", "You Have Successfully logged out!!", "success");
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" style={{ backgroundColor: "#5359f5" }}>
                <Toolbar className={classes.root}>
                    <h3 className={classes.imageStyle}> Success Academy  </h3>
                    <Button color="inherit">
                        <Link to="/" className={classes.linkStyle}> Home </Link>
                    </Button>
                    {isLoggedIn ? (
                        <>
                            {userRole.role === "admin" ? (
                                <Button color="inherit">
                                    <Link to="/dashboard" className={classes.linkStyle}> DashBoard</Link>
                                </Button>
                            ) : (
                                <Button color="inherit">
                                    <Link to="/MyCourses" className={classes.linkStyle}> Courses </Link>
                                </Button>
                            )}
                            <Button color="inherit">
                                <Link to="/account" className={classes.linkStyle}> Account </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/" onClick={handleLogOut} className={classes.linkStyle}> Logout </Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit">
                                <Link to="/register" className={classes.linkStyle}> Register </Link>
                            </Button>
                            <Button
                                // aria-controls="menu"
                                onClick={handleOpenMenu}
                                // disableRipple
                                // variant="contained"
                                color="inherit"
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
                                <MenuItem onClick={handleMenuClose}><Link to="/admin/login" className={classes.linkStyle}> Admin </Link> </MenuItem>
                                <MenuItem onClick={handleMenuClose}><Link to="/student/login" className={classes.linkStyle}> Student </Link> </MenuItem>
                            </Menu>
                        </>
                    )
                    }

                </Toolbar>
            </AppBar>

            <Route path="/register" component={RegisterForm} exact />
            <Route path="/" component={Home} exact />
            <Route path="/admin/login" render={(props) => {
                return <AdminLogIn {...props} userLoggedStatus={userLoggedStatus} />
            }} exact />
            <Route path="/student/login" render={(props) => {
                return <StudentLogIn {...props} userLoggedStatus={userLoggedStatus} />
            }} exact />
            <Route path="/dashboard" component={DashBoard} exact />
            <Route path="/MyCourses" component={StudentCourses} exact />
            <Route path="/account" component={Account} exact />
            <Route path="/admin/allstudents" component={AllStudents} exact />
            <Route path="/admin/courses" component={Courses} exact />
            <Route path="/admin/createcourse" component={CreateCourse} exact />
        </>
    )
}

export default NavBarContainor