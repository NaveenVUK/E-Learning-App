import React from "react";
import { useDispatch } from "react-redux";

import { startStudentRegister } from "../../Actions/UserActions";

import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"
import { HowToRegRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box } from "@mui/system";

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

const AddStudent = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const formValidation = yup.object({
        name: yup.string().required("username is required"),
        email: yup.string().email("Enter valid email").required("Email is required"),
        password: yup.string().required().min(8)
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            dispatch(startStudentRegister(values, props))
        },
        validationSchema: formValidation
    })

    return (
        <div style={{ textAlign: "center" }}>
            <Paper className={classes.paperStyle}>
                <Grid align="center">
                    <Avatar className={classes.avatarStyle} style={{ color: "green", backgroundColor: "lightgrey" }}>
                        <PersonAddAltIcon />
                    </Avatar>
                    <form onSubmit={formik.handleSubmit}>
                        <br />
                        <TextField
                            id="name"
                            name="name"
                            label="name"
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            onBlur={formik.onBlur}
                            fullWidth
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
                            onFocus={formik.onFocus}
                            fullWidth
                        /><br /><br />
                        <Box display="flex" justifyContent="space-between">
                            <Button
                                className={classes.btnstyle}
                                type="submit"
                                variant="contained"
                            > Submit
                            </Button>
                            <Button
                                className={classes.btnstyle}
                                variant="contained"
                                onClick={() => props.history.push("/dashboard")}
                            >Cancel</Button>
                        </Box>
                    </form>
                </Grid>
            </Paper>
        </div >
    )
}

export default AddStudent