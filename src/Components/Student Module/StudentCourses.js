import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";

import NewAddStudentForm from "../Admin module/AddStudentForm"

import { Button, IconButton, InputBase, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import swal from "sweetalert";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';

const StudentCourses = (props) => {
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState("")

    const students = useSelector((state) => {
        return state.user.students
    })

    const inputHandleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const filterStudent = students.filter((ele) => {
        return ele.name.includes(searchInput)
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
                    // dispatch(startDeletStudent(id, altermsg));
                } else {
                    swal("User is safe!");
                }
            })
    }

    return (
        <div style={{ textAlign: "left", marginTop: "100px" }}>
            <h1 style={{
                backgroundColor: "white",
                margin: "10px 80px 30px 80px",
                borderRadius: "15px",
                textAlign: "center"
            }}> All Courses - {students.length}</h1>
            <Box display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={() => { props.history.push("/") }} style={{ margin: "10px 10px 10px 10px", borderRadius: "22px", textAlign: "left" }}>
                    Back
                </Button><br />
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
    )
}

export default StudentCourses