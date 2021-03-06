import axios from "axios"
import jwt_decode from "jwt-decode";
import { updateAdminInfo } from "./AdminActions"
import swal from "sweetalert";
import { AddError } from "./AdminActions";

export const startStudentLogin = (values, props, userLoggedStatus) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/students/login", values)
            .then((response) => {
                const loginResponse = response.data
                if (loginResponse.hasOwnProperty("errors")) {
                    dispatch(AddError(loginResponse.errors))
                } else {
                    const decoded = jwt_decode(loginResponse.token)
                    localStorage.setItem("token", loginResponse.token)
                    localStorage.setItem("user", JSON.stringify(decoded))
                    alert("Successfully logged in")
                    userLoggedStatus()
                    props.history.push("/")
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const startStudentUpdate = (id, formData, handleClose, title) => {
    return (dispatch) => {
        axios.put(`https://dct-e-learning.herokuapp.com/api/students/${id}`, formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const updateResponse = response.data
                if (updateResponse.hasOwnProperty("errors")) {
                    alert(updateResponse.errors)
                } else {
                    // (title === "student" ? (
                    //     dispatch(updateStudent(updateResponse))
                    // ) : (
                    //     dispatch(updateAdminInfo(updateResponse))
                    // ))
                    swal("Details are modified")
                    handleClose()
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const updateStudent = (updateInfo) => {
    return {
        type: "UPDATE-STUDENT",
        payload: updateInfo
    }
}

export const startGetStudent = (id) => {
    return (dispatch) => {
        axios.get(`https://dct-e-learning.herokuapp.com/api/students/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const getResponse = response.data
                if (getResponse.hasOwnProperty("errors")) {
                    alert(getResponse.errors)
                } else {
                    dispatch(updateAdminInfo(getResponse))
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const startEnrollCourse = (courseID) => {
    console.log("courseID", courseID);
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${courseID}`, {}, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const enrollResponse = response.data
                console.log("enrollResponse", enrollResponse);
                if (enrollResponse.hasOwnProperty("errors")) {
                    alert(enrollResponse.errors)
                } else {
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert("else", error)
            })
    }
}

export const startUnEnrollCourse = (courseID) => {
    console.log("courseID", courseID);
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/unenroll?courseId=${courseID}`, {}, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const enrollResponse = response.data
                console.log("enrollResponse", enrollResponse);
                if (enrollResponse.hasOwnProperty("errors")) {
                    alert(enrollResponse.errors)
                } else {
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert("else", error)
            })
    }
}