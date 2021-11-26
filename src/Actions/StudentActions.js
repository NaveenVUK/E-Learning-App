import axios from "axios"
import jwt_decode from "jwt-decode";

export const startStudentLogin = (values, props, userLoggedStatus) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/students/login", values)
            .then((response) => {
                const loginResponse = response.data
                const decoded = jwt_decode(loginResponse.token)
                if (loginResponse.hasOwnProperty("errors")) {
                    alert(loginResponse.errors)
                } else {
                    localStorage.setItem("token", loginResponse.token)
                    localStorage.setItem("Student", JSON.stringify(decoded))
                    alert("Successfully logged in")
                    userLoggedStatus()
                    props.history.push("/dashboard")
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const startStudentUpdate = (id, formData, alertmsg) => {
    return (dispatch) => {
        axios.put(`https://dct-e-learning.herokuapp.com/api/students/${id}`, formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const updateResponse = response.data
                console.log("updateResponse", updateResponse);
                if (updateResponse.hasOwnProperty("errors")) {
                    alert(updateResponse.errors)
                } else {
                    alertmsg()
                    dispatch(updateStudent(updateResponse))
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