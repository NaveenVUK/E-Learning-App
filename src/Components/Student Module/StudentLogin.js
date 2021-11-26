import React from "react";
import { useDispatch } from "react-redux";

import { startStudentLogin } from "../../Actions/StudentActions";
import LogInForm from "../Reusable Components/LogInForm";

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