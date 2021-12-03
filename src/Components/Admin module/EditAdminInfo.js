import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"
import { HowToRegRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box } from "@mui/system";
import { startStudentRegister, StartAdminUpdate } from '../../Actions/AdminActions';
import { startStudentUpdate } from '../../Actions/StudentActions';
import { withRouter } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const useStyles = makeStyles({
    paperStyle: {
        padding: 30,
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

const EditAdminInfo = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const classes = useStyles()
    const { name, title } = props

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formValidation = yup.object({
        name: yup.string().required("username is required"),
    })

    const formik = useFormik({
        initialValues: {
            name: name ? name : "",
        },
        onSubmit: (values) => {
            let formData = {}
            formData[title] = values.name

            if (localStorage.hasOwnProperty("token")) {
                const userRole = JSON.parse(localStorage.getItem("user"))
                if (userRole.role === "admin") {
                    dispatch(StartAdminUpdate(formData, handleClose))
                } else if (userRole.role === "student") {
                    const studentId = JSON.parse(localStorage.getItem("user"))
                    console.log("hhh", studentId);
                    dispatch(startStudentUpdate(studentId._id, formData, handleClose, "user"))
                }
            }

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
                                <strong> Update {title} information </strong>
                            </DialogTitle>
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

export default EditAdminInfo