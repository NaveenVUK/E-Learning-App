import React from "react";

import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup"

const formValidation = yup.object({
    username: yup.string().required("username is required"),
    email: yup.string().email("Enter valid email").required("Email is required"),
    password: yup.string().required(),
    Academyname: yup.string().required()
})

const RegisterForm = () => {
    const formik = useFormik(
        {
            initialValues: {
                username: "",
                email: "",
                password: "",
                Academyname: "",
                website: ""
            },
            onSubmit: (values) => {
                console.log("formdata", values);
            },
            validationSchema: formValidation
        }
    )

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
                    id="Academyname"
                    name="Academyname"
                    label="Academy name"
                    type="text"
                    value={formik.values.Academyname}
                    onChange={formik.handleChange}
                    error={formik.touched.Academyname && Boolean(formik.errors.Academyname)}
                    helperText={formik.touched.Academyname && formik.errors.Academyname}
                /><br /><br />
                <TextField
                    id="website"
                    name="website"
                    label="website"
                    type="text"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                /><br /><br />
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default RegisterForm