import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker";

// import { startStudentRegister } from '../../Actions/AdminActions';

import { Avatar, Button, Grid, Paper, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useFormik, getIn } from "formik";
import * as yup from "yup"
import { HowToRegRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box } from "@mui/system";
import { startCreateCourses, startGetCourses } from '../../../Actions/AdminActions';

const useStyles = makeStyles({
    paperStyle: {
        padding: 30,
        height: "auto",
        width: 780,
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

const CreateCourse = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const formValidation = yup.object({
        name: yup.string().required("Name is required"),
        description: yup.string().required("description is required"),
        duration: yup.number().required("duration is required"),
        category: yup.string().required("category is required"),
        validity: yup.string().required("validity is required"),
        level: yup.string().required("level is required"),
        author: yup.string().required("author is required"),

    })

    const clearForm = () => {
        formik.resetForm()
    }

    const navigate = () => {
        props.history.push("/admin/courses")
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            duration: "",
            releaseDate: "",
            isDelete: false,
            category: "",
            validity: "",
            level: "",
            author: "",
            startDate: new Date()
        },
        onSubmit: (values) => {
            console.log("values", values);
            dispatch(startCreateCourses(values, clearForm, navigate))
        },
        validationSchema: formValidation
    })

    return (
        <div>
            <Paper className={classes.paperStyle}>
                <Grid align="center">
                    <h2 className={classes.headingStyle}> Create Course</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container >
                            <Grid item xs={5.5} marginRight="52px">
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
                            </Grid>
                            <Grid item xs={5.5}>
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
                            </Grid>
                        </Grid>

                        <TextField
                            id="duration"
                            name="duration"
                            label="duration"
                            type="number"
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                            helperText={formik.touched.duration && formik.errors.duration}
                            onFocus={formik.onFocus}
                            fullWidth
                        /><br /><br />
                        <TextField
                            id="releaseDate"
                            name="releaseDate"
                            label="releaseDate"
                            type="date"
                            value={formik.values.releaseDate}
                            onChange={formik.handleChange}
                            onFocus={formik.onFocus}
                            fullWidth
                        /><br /><br />
                        <TextField
                            id="isDelete"
                            name="isDelete"
                            label="isDelete"
                            type=""
                            value={formik.values.isDelete}
                            onChange={formik.handleChange}
                            onFocus={formik.onFocus}
                            fullWidth
                        /><br /><br />
                        <FormControl fullWidth>
                            <InputLabel>category</InputLabel>
                            <Select
                                id="category"
                                name="category"
                                label="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                                onFocus={formik.onFocus}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>none</em>
                                </MenuItem>
                                <MenuItem value="HTML">HTML</MenuItem>
                                <MenuItem value="CSS">CSS</MenuItem>
                                <MenuItem value="reactjs">reactjs</MenuItem>
                                <MenuItem value="nodejs">nodejs</MenuItem>
                                <MenuItem value="expressjs">expressjs</MenuItem>
                                <MenuItem value="mongodb">mongodb</MenuItem>
                                <MenuItem value="javascript">javascript</MenuItem>
                            </Select>
                        </FormControl><br /><br />
                        <TextField
                            id="validity"
                            name="validity"
                            label="validity"
                            type="number"
                            value={formik.values.validity}
                            onChange={formik.handleChange}
                            error={formik.touched.validity && Boolean(formik.errors.validity)}
                            helperText={formik.touched.validity && formik.errors.validity}
                            onFocus={formik.onFocus}
                            fullWidth
                        /><br /><br />
                        <FormControl fullWidth>
                            <InputLabel>Level</InputLabel>
                            <Select
                                id="level"
                                name="level"
                                label="Level"
                                value={formik.values.level}
                                onChange={formik.handleChange}
                                error={formik.touched.level && Boolean(formik.errors.level)}
                                helperText={formik.touched.level && formik.errors.level}
                                onFocus={formik.onFocus}
                                fullWidth

                            >
                                <MenuItem value="">
                                    <em>none</em>
                                </MenuItem>
                                <MenuItem value="beginner">beginner</MenuItem>
                                <MenuItem value="intermediate">intermediate</MenuItem>
                                <MenuItem value="expert">expert</MenuItem>
                            </Select>
                        </FormControl>
                        <br /><br />
                        <TextField
                            id="author"
                            name="author"
                            label="author"
                            type="author"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            error={formik.touched.author && Boolean(formik.errors.author)}
                            helperText={formik.touched.author && formik.errors.author}
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
                                onClick={() => props.history.push("/admin/courses")}
                            >Cancel</Button>
                        </Box>
                    </form>
                </Grid>
            </Paper>
        </div >
    );
}

// const NewAddStudentForm = withRouter(AddStudentForm)
export default CreateCourse
