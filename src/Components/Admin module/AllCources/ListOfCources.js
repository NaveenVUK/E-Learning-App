import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material"
import swal from "sweetalert"
import { startDeleteCourse } from "../../../Actions/AdminActions"
import { makeStyles } from "@mui/styles"
import CourseDetail from "./CourseDetails"
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { startEnrollCourse, startUnEnrollCourse } from "../../../Actions/StudentActions"

const useStyles = makeStyles({
    root: {
        "&:hover": {
            transform: "hello",
        }
    }
})

const ListOfCources = (props) => {
    const dispatch = useDispatch()
    const { _id, name, description, category } = props
    const classes = useStyles()

    const userRole = JSON.parse(localStorage.getItem("user"))

    const course = useSelector((state) => {
        return state.user
    })

    let result = undefined

    if (userRole.role === "student") {
        if (course.user.courses) {
            result = course.user.courses.find((ele) => {
                return ele.course === _id
            })
        }
    }

    const checkEnrollment = () => {
        if (result) {
            return <Button variant="contained" color="success" onClick={() => {
                dispatch(startUnEnrollCourse(_id))
            }}> Un-Enroll</Button>
        } else {
            return <Button variant="contained" color="primary" onClick={() => {
                dispatch(startEnrollCourse(_id))
            }}> Enroll</Button>
        }
    }

    const imageSrc = () => {
        if (category === "reactjs") {
            return "https://dz8fbjd9gwp2s.cloudfront.net/orgData/5e85a31d0cf2fc4c81d60c2f/pages/assets/images/ShPpKreact.png"
        } else if (category === "HTML") {
            return "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_640.png"
        } else if (category === "CSS") {
            return "https://i.pinimg.com/originals/d5/b9/3b/d5b93bad3c10cc5b92b47e4678598548.jpg"
        } else if (category === "nodejs") {
            return "https://dz8fbjd9gwp2s.cloudfront.net/orgData/5e85a31d0cf2fc4c81d60c2f/pages/assets/images/NrATanodejs.png"
        } else if (category === "expressjs") {
            return "https://dz8fbjd9gwp2s.cloudfront.net/orgData/5e85a31d0cf2fc4c81d60c2f/pages/assets/images/II7lBexpress.png"
        } else if (category === "javascript") {
            return "https://dz8fbjd9gwp2s.cloudfront.net/orgData/5e85a31d0cf2fc4c81d60c2f/pages/assets/images/CRGOfjs1.png"
        } else if (category === "mongodb") {
            return ""
        }
    }

    const handleDelete = () => {

        swal({
            title: "Are you sure you want delete ths course?",
            text: "Once deleted, you will not be able to recover this course!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const altermsg = () => { swal("Poof! course has been deleted!", { icon: "success", }) }
                    dispatch(startDeleteCourse(_id, altermsg));
                } else {
                    swal("User is safe!");
                }
            })
    }

    const handleImageClick = () => {
        swal(`${description}`)
    }

    return (
        <>
            <Card className={classes.root} sx={{ width: 345, backgroundColor: "grey", borderRadius: "12px" }}>
                <CardMedia
                    onClick={() => {
                        props.history.push(`/course/details/${_id}`)
                    }}
                    component="img"
                    height="340"
                    image={imageSrc()}
                    alt="green iguana"

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bold" textAlign="center">
                        {name}
                    </Typography>
                </CardContent>
                {userRole.role === "admin" && (
                    <CardActions style={{ fontSize: "40px", justifyContent: "space-around" }} >
                        <AiFillEdit />
                        <AiFillDelete onClick={handleDelete} />
                        <Link to={`/course/details/${_id}`}> <AiFillEye /></Link>
                    </CardActions>
                )}
                {userRole.role === "student" && (
                    <CardActions style={{ fontSize: "40px", justifyContent: "space-around" }} >
                        {/* <Button variant="contained"> Enroll </Button> */}
                        {checkEnrollment()}
                    </CardActions>
                )}
            </Card >
        </>
    )
}

const newListOfCources = withRouter(ListOfCources)
export default newListOfCources