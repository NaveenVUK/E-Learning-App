import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"

import { Autocomplete, Button, IconButton, InputBase, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import swal from "sweetalert";
import { startDeletStudent } from "../../Actions/UserActions";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import NewAddStudentForm from "./AddStudentForm";
import NewEditStudentInfo from "./EditStudentInfo";
import StudentView from "./StudentView";

const AllStudents = (props) => {
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
                    dispatch(startDeletStudent(id, altermsg));
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
            }}> All Students - {students.length}</h1>
            <Box display="flex" justifyContent="space-between">
                <Button variant="contained" onClick={() => { props.history.push("/dashboard") }} style={{ margin: "10px 10px 10px 10px", borderRadius: "22px", textAlign: "left" }}>
                    Back
                </Button><br />
                <NewAddStudentForm />
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', width: 300, height: 50 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search username"
                        inputProps={{ 'aria-label': searchInput }}
                        onChange={inputHandleChange}
                    />
                    <IconButton sx={{ p: '15px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
            <table className="table table-striped-bg table-hover table-Primar" style={{ textAlign: "center" }}>
                <thead>
                    <tr className="table-danger">
                        <th > Name </th>
                        <th> Email </th>
                        <th> Role </th>
                        <th> Created Date </th>
                        <th> Updated Data </th>
                        <th> View </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {filterStudent.map((ele) => {
                        return (
                            <tr key={ele._id} className="table-primary">
                                <td> {ele.name} </td>
                                <td> {ele.email}</td>
                                <td> {ele.role} </td>
                                <td> {ele.createdAt && ele.createdAt.slice(0, 10)}</td>
                                <td> {ele.updatedAt && ele.updatedAt.slice(0, 10)}</td>
                                <td> <StudentView {...ele} /> </td>
                                <td> <NewEditStudentInfo {...ele} /> </td>
                                <td> <DeleteRoundedIcon onClick={() => handleEditClick(ele._id)} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default AllStudents