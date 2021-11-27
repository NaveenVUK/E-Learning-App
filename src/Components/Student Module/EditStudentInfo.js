import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { startStudentRegister, startStudentUpdate } from '../../Actions/StudentActions';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { withRouter } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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

const EditStudentInfo = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const classes = useStyles()
    const { _id, name, email } = props

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formValidation = yup.object({
        name: yup.string().required("username is required"),
        email: yup.string().email("Enter valid email").required("Email is required"),
    })

    const formik = useFormik({
        initialValues: {
            name: name ? name : "",
            email: email ? email : "",
        },
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(startStudentUpdate(_id, values, handleClose, "student"))
        },
        validationSchema: formValidation
    })

    return (
        <div>
            {/* <Button variant="contained" onClick={handleClickOpen} style={{ marginTop: "10px", marginLeft: "0px" }}>
                Add Student
            </Button> */}
            <EditIcon onClick={handleClickOpen} />
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
                                <strong> Edit Student Details </strong>
                            </DialogTitle>
                            <Avatar className={classes.avatarStyle} style={{ color: "green", backgroundColor: "lightgrey" }}>
                                <ManageAccountsIcon />
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

const NewEditStudentInfo = withRouter(EditStudentInfo)
export default NewEditStudentInfo