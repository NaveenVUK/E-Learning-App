import React from "react";
import { useDispatch } from "react-redux";

import { StartAdminLogin } from "../../Actions/AdminActions"

import LogInForm from "../Reusable Components/LogInForm";

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