import { Button } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const MyCourses = () => {

    return (
        <div style={{
            textAlign: "left", marginTop: "70px", backgroundImage: "url(https://assets.spayee.xyz/themes/theme2/banner-1.png)", height: '100vh',
            backgroundPosition: "center", backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
        }}>
            <div >
                <Button variant="contained" style={{ margin: "90px 10px 10px 90px", backgroundColor: "red", borderRadius: "22px", width: "380px", height: "80px", fontSize: "20px" }}>
                    <Link to="/student/mycources" style={{ color: "white", textDecoration: "none" }}> My Courses </Link>
                </Button> <br />
                <Button variant="contained" style={{ margin: "30px 10px 10px 90px", backgroundColor: "#93e85a", borderRadius: "22px", width: "380px", height: "80px", fontSize: "20px" }}>
                    <Link to="/student/mycources" style={{ color: "white", textDecoration: "none" }}> All Courses </Link>
                </Button><br />

            </div>

        </div >
    )
}

export default MyCourses