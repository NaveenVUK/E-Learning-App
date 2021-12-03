import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteLecture, startEnrollStudent, startUnEnrollStudent } from "../../../Actions/AdminActions";
import axios from "axios";
import ReactPlayer from "react-player"
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import AddLecture from "../Lectures/AddLecture";
import { Box } from "@mui/system";
import { Grid, IconButton, InputBase, ListItem, Paper } from "@mui/material";
import { Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        "&:hover": {
            transform: "hello",
        }
    }
})

const CourseDetail = (props) => {
    const id = props.match.params.id
    const dispatch = useDispatch()
    const [video, setvideo] = useState([])
    const classes = useStyles()

    useEffect(() => {
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${id}/lectures`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const LectureResponse = response.data
                setvideo(LectureResponse)
                console.log("LectureResponse", LectureResponse)
            })
            .catch((error) => {
                alert("else", error)
            })

    }, [])

    const students = useSelector((state) => {
        return state.user.students
    })

    const course = useSelector((state) => {
        const result = state.user.courses.find((ele) => {
            return ele._id === id
        })
        return result
    })

    const handleRemove = (lectureId) => {
        dispatch(startDeleteLecture(id, lectureId))
    }

    const checkEnrollment = (studentId) => {
        const student = students.find(ele => ele._id === studentId)
        if (student.courses.length === 0) {
            return <Button variant="contained" color="primary" onClick={() => {
                dispatch(startEnrollStudent(id, studentId))
            }}> Enroll</Button>
        } else {
            const result = student.courses.find((ele) => {
                return ele.course === id
            })
            if (result) {
                return <Button variant="contained" color="success" onClick={() => {
                    dispatch(startUnEnrollStudent(id, studentId))
                }}> Un-Enroll</Button>
            } else {
                return <Button variant="contained" color="primary" onClick={() => {
                    dispatch(startEnrollStudent(id, studentId))
                }}> Enroll</Button>
            }
        }
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <h1> <strong> CourseDetail </strong> </h1>
            <h2> Name - {course && course.category}</h2>
            <h2> Description - {course && course.description}</h2>
            <hr />
            <Box display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={() => props.history.push("/admin/courses")}> Back to Course </Button>
                <AddLecture id={course && course._id} />
            </Box>
            <h1 > All Students - {students.length} </h1>
            <table className="table table-striped-bg table-hover table-Primar" style={{ textAlign: "center" }}>
                <thead>
                    <tr className="table-danger">
                        <th> Name </th>
                        <th> Email </th>
                        <th> Status </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((ele) => {
                        return (
                            <tr key={ele._id} className="table-primary">
                                <td> {ele.name} </td>
                                <td> {ele.email} </td>
                                <td> {checkEnrollment(ele._id)} </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> <br />
            <h1> Lectures </h1>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-around" marginTop="20px">
                        {video.map((ele) => {
                            return (
                                <Card className={classes.root} sx={{ width: "auto", backgroundColor: "grey", borderRadius: "12px" }}>
                                    <ReactPlayer controls url={ele.assetURL} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" fontWeight="bold" textAlign="center">
                                            {ele.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{ fontSize: "40px", justifyContent: "space-around" }} >
                                        <AiFillEdit />
                                        <AiFillDelete onClick={() => {
                                            handleRemove(ele._id)
                                        }} />
                                    </CardActions>
                                </Card >
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const newCourseDetail = withRouter(CourseDetail)

export default newCourseDetail