import React from "react";

import { Button, TextField, Grid, Paper, Avatar, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup"
import { makeStyles } from "@mui/styles";
import { HowToRegRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    paperStyle: {
        padding: 30,
        height: "auto",
        width: 380,
        marginTop: "90px",
        margin: "20px auto",
        backgroundColor: "whitesmoke",
        borderRadius: "17px",
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

const LogInForm = (props) => {
    const { formSubmit, name } = props
    const classes = useStyles()

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
            formSubmit(values)
        },
        validationSchema: formValidation
    })

    return (
        <div>
            <Paper className={classes.paperStyle}>
                <Grid align="center">
                    <Avatar className={classes.avatarStyle} style={{ color: "green", backgroundColor: "lightgrey" }}>
                        <HowToRegRounded />
                    </Avatar>
                    <h2 className={classes.headingStyle}> {name} Login</h2>
                    < form onSubmit={formik.handleSubmit} >
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
                            fullWidth
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
                            fullWidth
                        /><br /><br />
                        <Box display="flex" justifyContent="space-between" marginTop="10px" marginBottom="10px">
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
                            have an {name} Account ? {name === "Admin" ? <Link to="/register"> Sign up </Link> : <strong> <br /> Connect with your admin</strong>}
                        </Typography>
                    </form >
                </Grid>
            </Paper>
        </div >
    )
}

const newLogInForm = withRouter(LogInForm)
export default newLogInForm