import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router';

import { startStudentRegister } from '../../Actions/AdminActions';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const AddStudentForm = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formValidation = yup.object({
        name: yup.string().required("username is required"),
        email: yup.string().email("Enter valid email").required("Email is required"),
        password: yup.string().required().min(8)
    })

    const clearForm = () => {
        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(startStudentRegister(values, props, handleClose, clearForm))
        },
        validationSchema: formValidation
    })

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} style={{ margin: "10px 180px 10px 10px", borderRadius: "22px" }} >
                Add Student
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{ width: "520px" }}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid align="center">
                            <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
                                <strong> Add Student </strong>
                            </DialogTitle>
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
                                        // onClick={() => props.history.push("/dashboard")}
                                        onClick={handleClose}
                                    >Cancel</Button>
                                </Box>
                            </form>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div >
    );
}

const NewAddStudentForm = withRouter(AddStudentForm)
export default NewAddStudentForm