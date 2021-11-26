import { Button } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

const DashBoard = () => {

    return (
        <div style={{ textAlign: "left", marginTop: "120px" }}>
            <Button variant="contained" style={{ margin: "10px 10px 10px 10px", backgroundColor: "red", borderRadius: "22px" }}>
                <Link to="/allstudents" style={{ color: "white", textDecoration: "none" }}> All Students </Link>
            </Button> <br />
            {/* <Button variant="contained" style={{ margin: "10px 10px 10px 10px", borderRadius: "22px" }}>
                <Link to="/addstudent" style={{ color: "white", textDecoration: "none" }}> Add Student </Link>
            </Button><br /> */}
        </div>
    )
}

export default DashBoard