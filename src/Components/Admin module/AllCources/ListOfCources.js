import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material"
import swal from "sweetalert"
import { startDeleteCourse } from "../../../Actions/AdminActions"
import { makeStyles } from "@mui/styles"

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

    // author: "sdfgf"
    // category: "CSS"
    // createdAt: "2021-11-26T12:22:40.456Z"
    // description: "sdfs"
    // duration: 20
    // isDelete: false
    // level: "beginner"
    // name: "Naveen"
    // students: []
    // updatedAt: "2021-11-26T12:22:40.456Z"
    // user: "6195f84e45a0fff08114423d"
    // validity: 30
    // __v: 0
    // _id: "61a0d190ff931720a3b0c1d8"

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
                    onClick={handleImageClick}
                    component="img"
                    height="340"
                    image={imageSrc()}
                    alt="green iguana"

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                        {name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained">Edit</Button>
                    <Button onClick={handleDelete} size="small" variant="contained">Delete</Button>
                    <Button onClick={handleImageClick} size="small" variant="contained">View</Button>
                </CardActions>
            </Card >
        </>
    )
}

export default ListOfCources