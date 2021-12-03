import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";

import { Button, Grid, IconButton, InputBase, ListItem, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import swal from "sweetalert";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import CreateCourse from "./CreateCourse";
import { Link } from "react-router-dom";
import ListOfCources from "./ListOfCources";

const Courses = (props) => {
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState("")

    const courses = useSelector((state) => {
        return state.user.courses
    })

    const inputHandleChange = (e) => {
        setSearchInput(e.target.value)
    }
    const userRole = JSON.parse(localStorage.getItem("user"))

    const filterCourses = courses.filter((ele) => {
        return ele.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    const handleEditClick = (id) => {
        swal({
            title: "Are you sure you want delete ths user?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const altermsg = () => { swal("Poof! User has been deleted!", { icon: "success", }) }
                } else {
                    swal("User is safe!");
                }
            })
    }

    return (
        <div>
            <div style={{ textAlign: "left", marginTop: "100px" }}>
                <h1 style={{
                    backgroundColor: "white",
                    margin: "10px 680px 30px 680px",
                    borderRadius: "15px",
                    textAlign: "center"
                }}> All Courses - {courses.length}</h1>
                <Box display="flex" justifyContent="space-around">
                    <Button variant="contained" onClick={() => {
                        props.history.push("/dashboard")
                    }} style={{ margin: "10px 10px 10px 10px", borderRadius: "22px", textAlign: "left", backgroundColor: "white", color: "red" }}>
                        Back
                    </Button><br />
                    <Button variant="contained" style={{ margin: "10px 180px 10px 10px", borderRadius: "22px" }}>
                        <Link to="/admin/createcourse" style={{ color: "white", textDecoration: "none" }}> CREATE COURSE </Link>
                    </Button>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', width: 300, height: 50 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search course name"
                            inputProps={{ 'aria-label': searchInput }}
                            onChange={inputHandleChange}
                        />
                        <IconButton sx={{ p: '15px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Box>
            </div >
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-around" marginTop="20px">
                        {filterCourses.map((ele) => {
                            return (
                                <Grid>
                                    <ListItem style={{ marginBottom: "20px" }}>
                                        <ListOfCources key={ele._id} {...ele} />
                                    </ListItem>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Courses