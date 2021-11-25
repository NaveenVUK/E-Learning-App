import React from "react";
import { useDispatch } from "react-redux";

import { StartAdminLogin } from "../../../Actions/UserActions";

import LogInForm from "./LogInForm";

const AdminLogIn = (props) => {
    const dispatch = useDispatch()
    const { userLoggedStatus } = props

    const formSubmit = (formData) => {
        dispatch(StartAdminLogin(formData, props, userLoggedStatus))
    }

    return (
        <LogInForm userLoggedStatus={userLoggedStatus} name="Admin" formSubmit={formSubmit} />
    )
}

export default AdminLogIn