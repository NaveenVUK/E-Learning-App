import React from "react";
import { useDispatch } from "react-redux";

import { StartAdminRegister } from "../../Actions/UserActions";

import { Button, TextField } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"

const formValidation = yup.object({
    username: yup.string().required("username is required"),
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup.string().required(),
    academy: yup.object({
        name: yup.string().required('Academy name is required'),
    })
})

const RegisterForm = (props) => {
    const dispatch = useDispatch()
    console.log("register", props);

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            academy: {
                name: "",
                website: ""
            }
        },
        onSubmit: (values) => {
            dispatch(StartAdminRegister(values))
        },
        validationSchema: formValidation
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <br />
                <TextField
                    id="username"
                    name="username"
                    label="username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                /> <br /><br />
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
                <TextField
                    id="name"
                    name="academy.name"
                    label="Academy name"
                    type="text"
                    value={formik.values.academy.name}
                    onChange={formik.handleChange}
                    error={getIn(formik.touched, "academy.name") && Boolean(getIn(formik.errors, "academy.name"))}
                    helperText={getIn(formik.touched, "academy.name") && getIn(formik.errors, "academy.name")}
                /><br /><br />
                <TextField
                    id="website"
                    name="academy.website"
                    label="Academy website"
                    type="text"
                    value={formik.values.academy.website}
                    onChange={formik.handleChange}
                /><br /><br />
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default RegisterForm