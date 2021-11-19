import React from "react";
import { useDispatch } from "react-redux";

import { StartAdminLogin } from "../../Actions/UserActions";

import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup"


const LogInForm = (props) => {
    const { userLoggedStatus } = props
    const dispatch = useDispatch()

    const formValidation = yup.object({
        email: yup.string().email("Enter valid email").required("Email is required"),
        password: yup.string().required(),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            dispatch(StartAdminLogin(values, props, userLoggedStatus))
        },
        validationSchema: formValidation
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <br />
                <TextField
                    id="email"
                    name="email"
                    label="email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                /><br /><br />
                <TextField
                    id="password"
                    name="password"
                    label="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                /><br /><br />
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default LogInForm