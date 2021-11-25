import React from "react";
import { useDispatch } from "react-redux";

import { startStudentLogin } from "../../../Actions/UserActions";
import LogInForm from "./LogInForm";

const StudentLogIn = (props) => {
    const dispatch = useDispatch()
    const { userLoggedStatus } = props

    const formSubmit = (formData) => {
        dispatch(startStudentLogin(formData, props, userLoggedStatus))
    }

    return (
        <LogInForm userLoggedStatus={userLoggedStatus} name="Student" formSubmit={formSubmit} />
    )
}

export default StudentLogIn