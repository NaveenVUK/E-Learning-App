import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

import EditForm from "./EditForm"
import { Button } from "@mui/material";

const Account = () => {
    const dispatch = useDispatch()
    const [isEdiClick, setisEditClick] = useState(false)
    const [editFormData, setEditFormData] = useState("")
    const [editKey, setEditId] = useState("")

    const user = useSelector((state) => {
        return state.user.user
    })

    const EditToggle = () => {
        const toggle = !isEdiClick
        setisEditClick(toggle)
    }

    const handleEditClick = (data, key) => {
        setEditFormData(data)
        setEditId(key)
        EditToggle()
    }

    return (
        <div style={{ textAlign: "center", marginTop: "90px" }}>
            {isEdiClick && (
                <>
                    <EditForm data={editFormData} editID={editKey} EditToggle={EditToggle} />
                    <Button onClick={EditToggle}> Cancel </Button>
                </>
            )}
            {Object.keys(user).length !== 0 ? (
                <>
                    <h1>Account Info </h1>
                    <h4>UserName - {user.username} <EditIcon onClick={() => {
                        handleEditClick(user.username, "username")
                    }} /> </h4>
                    <h4>Email - {user.email} <EditIcon onClick={() => {
                        handleEditClick(user.email, "email")
                    }} /></h4>
                    <h4>Role - {user.role} </h4> <br />
                    <h1> Acedamy Information </h1>
                    <h4> AcademyName - {user.academy.name} <EditIcon onClick={() => {
                        handleEditClick(user.academy.name, "academy.name")
                    }} /></h4>
                    <h4> AcademyName - {user.academy.website} <EditIcon onClick={() => {
                        handleEditClick(user.academy.website, "academy.website")
                    }} /></h4>
                </>
            ) : (
                <p> Loading .... </p>
            )}

        </div>
    )
}

export default Account