import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Button, Grid, InputLabel, MenuItem, Paper, Select, TextField, FormControl } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"
import { HowToRegRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
import { AiFillFolderAdd } from "react-icons/ai";
import { startAddLecture } from '../../../Actions/AdminActions';

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

const AddLecture = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const classes = useStyles()
    const { id } = props

    const errors = useSelector((state) => {
        return state.user.errors
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formValidation = yup.object({
        title: yup.string().required("title is required"),
        description: yup.string().required("description is required"),
        assetType: yup.string().required("assetType is required"),
        assetURL: yup.string().required("assetURL is required"),
        course: yup.string().required("course is required"),
    })

    const clearForm = () => {
        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            assetType: "",
            assetURL: "",
            course: ""
        },
        onSubmit: (values) => {
            dispatch(startAddLecture(id, values))
        },
        validationSchema: formValidation
    })

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} style={{ margin: "10px 180px 10px 10px", borderRadius: "22px" }} >
                Add Lecture
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
                                <strong> Add Lecture </strong>
                            </DialogTitle>
                            <Avatar className={classes.avatarStyle} style={{ color: "green", backgroundColor: "lightgrey" }}>
                                <AiFillFolderAdd />
                            </Avatar>
                            {errors && (
                                <Alert severity="error">
                                    <AlertTitle style={{ color: "red" }}> Error : <strong> {errors} </strong></AlertTitle>

                                </Alert>
                            )}
                            <form onSubmit={formik.handleSubmit}>
                                <br />
                                <TextField
                                    id="title"
                                    name="title"
                                    label="title"
                                    type="text"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                    onBlur={formik.onBlur}
                                    fullWidth
                                /> <br /><br />
                                <TextField
                                    id="description"
                                    name="description"
                                    label="description"
                                    type="text"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    fullWidth
                                /><br /><br />
                                <FormControl fullWidth>
                                    <InputLabel>asset Type </InputLabel>
                                    <Select
                                        id="assetType"
                                        name="assetType"
                                        label="assetType"
                                        value={formik.values.assetType}
                                        onChange={formik.handleChange}
                                        error={formik.touched.assetType && Boolean(formik.errors.assetType)}
                                        helperText={formik.touched.assetType && formik.errors.assetType}
                                        fullWidth
                                    >
                                        <MenuItem value="video">video</MenuItem>
                                        <MenuItem value="audio">audio</MenuItem>
                                        <MenuItem value="text">text</MenuItem>
                                        <MenuItem value="pdf">pdf</MenuItem>
                                        <MenuItem value="img">img</MenuItem>
                                    </Select>
                                </FormControl><br /><br />
                                <TextField
                                    id="assetURL"
                                    name="assetURL"
                                    label="assetURL"
                                    type="text"
                                    value={formik.values.assetURL}
                                    onChange={formik.handleChange}
                                    error={formik.touched.assetURL && Boolean(formik.errors.assetURL)}
                                    helperText={formik.touched.assetURL && formik.errors.assetURL}
                                    fullWidth
                                /><br /><br />
                                <FormControl fullWidth>
                                    <InputLabel>cources</InputLabel>
                                    <Select
                                        id="course"
                                        name="course"
                                        label="course"
                                        type="text"
                                        value={formik.values.course}
                                        onChange={formik.handleChange}
                                        error={formik.touched.course && Boolean(formik.errors.course)}
                                        helperText={formik.touched.course && formik.errors.course}
                                        fullWidth
                                    >
                                        <MenuItem value="HTML">HTML</MenuItem>
                                        <MenuItem value="CSS">CSS</MenuItem>
                                        <MenuItem value="reactjs">reactjs</MenuItem>
                                        <MenuItem value="nodejs">nodejs</MenuItem>
                                        <MenuItem value="expressjs">expressjs</MenuItem>
                                        <MenuItem value="mongodb">mongodb</MenuItem>
                                        <MenuItem value="javascript">javascript</MenuItem>
                                    </Select>
                                </FormControl><br /><br />
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
                                        onClick={() => {
                                            handleClose()
                                            formik.resetForm()
                                        }}
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

export default withRouter(AddLecture)