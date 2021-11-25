import React from "react";
import { useDispatch } from "react-redux";

import { StartAdminRegister } from "../../Actions/UserActions";

import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"
import { HowToRegRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    paperStyle: {
        padding: 30,
        height: "auto",
        width: 480,
        marginTop: "90px",
        margin: "20px auto"
    },
    btnstyle: {
        width: '30%',
        height: 40,
    },
    headingStyle: {
        height: "51px",
        width: "275px",
        color: "rgb(114 14 40 / 87%)",
    }
})

const RegisterForm = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const formValidation = yup.object({
        username: yup.string().required("username is required"),
        email: yup.string().email("Enter valid email").required("Email is required"),
        password: yup.string().required(),
        academy: yup.object({
            name: yup.string().required('Academy name is required'),
        })
    })

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
            <Paper className={classes.paperStyle}>
                <Grid align="center">
                    <Avatar className={classes.avatarStyle} style={{ color: "darkred", backgroundColor: "lightgrey" }}>
                        <HowToRegRounded />
                    </Avatar>
                    <h2 className={classes.headingStyle}> Register for Admin </h2>
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
                            fullWidth
                            required
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
                            fullWidth
                            required
                        /><br /><br />
                        <TextField
                            id="standard-adornment-password"
                            name="password"
                            label="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                            required
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
                            fullWidth
                            required
                        /><br /><br />
                        <TextField
                            id="website"
                            name="academy.website"
                            label="Academy website"
                            type="text"
                            value={formik.values.academy.website}
                            onChange={formik.handleChange}
                            fullWidth
                        /><br /><br />
                        <Box display="flex" justifyContent="space-between" marginBottom="10px">
                            <Button
                                className={classes.btnstyle}
                                type="submit"
                                variant="contained">Submit</Button>
                            <Button
                                className={classes.btnstyle}
                                type="submit"
                                onClick={() => formik.resetForm()}
                                variant="contained">Clear</Button>
                            <Button
                                className={classes.btnstyle}
                                variant="contained"
                                onClick={() => props.history.push("/")}
                            >Cancel</Button>
                        </Box>
                        <Typography textAlign="right">
                            Have an admin account ? <Link to="admin/login"> Sign in </Link>
                        </Typography>
                    </form>
                </Grid>
            </Paper>
        </div>
    )
}

export default RegisterForm