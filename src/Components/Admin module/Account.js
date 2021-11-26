import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

import EditAdminInfo from "./EditAdminInfo"
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

            {Object.keys(user).length !== 0 ? (
                <>
                    <h1>Account Info </h1>
                    <h4>UserName - {user.username}</h4> <EditAdminInfo name={user.username} title="username" />
                    <h4>Email - {user.email} <EditAdminInfo name={user.email} title="email" /> </h4>
                    <h4>Role - {user.role} </h4> <br />
                    <h1> Acedamy Information </h1>
                    <h4> Academy Name - {user.academy.name} <EditAdminInfo name={user.academy.name} title="academy.name" /></h4>
                    <h4> Academy Web Site - {user.academy.website} <EditAdminInfo name={user.academy.website} title="academy.website" /></h4>
                </>
            ) : (
                <p> Loading .... </p>
            )}

        </div>
    )
}

export default Account