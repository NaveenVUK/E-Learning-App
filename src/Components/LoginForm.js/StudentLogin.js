import React from "react";
import { useDispatch } from "react-redux";

import { StartAdminLogin } from "../../Actions/UserActions";
import LogInForm from "./LogInForm";

const StudentLogIn = (props) => {
    const dispatch = useDispatch()
    const { userLoggedStatus } = props

    const formSubmit = (formData) => {
        dispatch(StartAdminLogin(formData, props, userLoggedStatus))
    }

    return (
        <LogInForm userLoggedStatus={userLoggedStatus} formSubmit={formSubmit} />
    )
}

export default StudentLogIn