import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StartUserUpdate } from "../Actions/UserActions";

const EditForm = (props) => {
    const dispatch = useDispatch()
    const { data, editID, EditToggle } = props
    const [feildData, setFeildData] = useState(data ? data : "")
    // console.log(editID);

    const handleInputChnage = (e) => {
        setFeildData(e.target.value)
    }

    const handleSubmite = (e) => {
        e.preventDefault()
        let formData = {}
        formData[editID] = feildData
        dispatch(StartUserUpdate(formData, EditToggle))
    }

    return (
        <form>
            <input type="text" value={feildData} onChange={handleInputChnage} />
            <Button onClick={handleSubmite}> Submit</Button>
        </form>
    )
}

export default EditForm