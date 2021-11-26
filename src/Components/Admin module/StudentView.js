import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { startStudentRegister, startStudentUpdate } from '../../Actions/StudentActions';
import { withRouter } from 'react-router';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"
import { HowToRegRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

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

const StudentView = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const classes = useStyles()
    const { _id, name, email, isAllowed, role } = props

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
            dispatch(startStudentUpdate(_id, values, handleClose))
        },
        validationSchema: formValidation
    })

    return (
        <div>
            {/* <Button variant="contained" onClick={handleClickOpen} style={{ marginTop: "10px", marginLeft: "0px" }}>
                Add Student
            </Button> */}
            <VisibilityIcon onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{ width: "520px" }}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid align="left">
                            <Typography variant="h4"> Name : {name}</Typography> <br />
                            <Typography variant="h5"> Email : {email}</Typography>
                            <Typography variant="h5"> Allowed : {isAllowed ? "Yes" : "No"}</Typography>
                            <Typography variant="h5"> Role : {role}</Typography>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default StudentView