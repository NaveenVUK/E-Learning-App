import axios from "axios"
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

export const StartAdminRegister = (values) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/register", values)
            .then((response) => {
                const registerResponse = response.data
                if (registerResponse.hasOwnProperty("errors")) {
                    alert(registerResponse.errors)
                } else {
                    swal(registerResponse)
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    }
}

export const startStudentRegister = (formData, props) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/students", formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const data = response.data
                console.log("res", data);
                if (data.hasOwnProperty("errors")) {
                    Object.keys(data).length === 1 ? alert(data.errors) : alert(data.message)
                } else {
                    alert("Student Added Successfully !!")
                    dispatch(addStudent(data))
                    props.history.push("/allstudents")
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const StartAdminLogin = (values, props, userLoggedStatus) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/login", values)
            .then((response) => {
                const loginResponse = response.data
                // const result = loginResponse.token
                // const decoded = jwt_decode(result)
                if (loginResponse.hasOwnProperty("errors")) {
                    alert(loginResponse.errors)
                } else {
                    localStorage.setItem("token", loginResponse.token)
                    // localStorage.setItem("user", JSON.stringify(decoded))
                    swal("Successfully logged in !!")
                    userLoggedStatus()
                    props.history.push("/")
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const startStudentLogin = (values, props, userLoggedStatus) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/students/login", values)
            .then((response) => {
                const loginResponse = response.data
                const result = loginResponse.token
                console.log("token", result);
                if (loginResponse.hasOwnProperty("errors")) {
                    alert(loginResponse.errors)
                } else {
                    localStorage.setItem("token", result)
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

export const StartUserInfo = () => {
    return (dispatch) => {
        axios.get("https://dct-e-learning.herokuapp.com/api/admin/account", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const userResponse = response.data
                dispatch(AddUserInfo(userResponse))
            })
            .catch((error) => {
                alert("StartUserInfo", error)
            })
    }
}

const AddUserInfo = (user) => {
    return {
        type: "ADD-USER-INFO",
        payload: user
    }
}

export const StartUserUpdate = (formData, EditToggle) => {
    return (dispatch) => {
        axios.put("https://dct-e-learning.herokuapp.com/api/admin", formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const userResponse = response.data
                dispatch(AddUserInfo(userResponse))
                EditToggle()
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const StartGetStudents = () => {
    return (dispatch) => {
        axios.get("https://dct-e-learning.herokuapp.com/api/admin/students", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const students = response.data
                dispatch(allStudents(students))

            })
            .catch((error) => {
                alert("StartGetStudents", error)
            })
    }
}

export const allStudents = (students) => {
    return {
        type: "ALL-STUDENTS",
        payload: students
    }
}

export const addStudent = (student) => {
    return {
        type: "ADD-STUDENT",
        payload: student
    }
}

export const startDeletStudent = (id, alertmsg) => {
    return (dispatch) => {
        axios.delete(`https://dct-e-learning.herokuapp.com/api/admin/students/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const deleteResponse = response.data
                console.log("deleteResponse", deleteResponse);
                if (deleteResponse.hasOwnProperty("errors")) {
                    alert(deleteResponse.errors)
                } else {
                    alertmsg()
                    dispatch(removeStudent(deleteResponse))
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const removeStudent = (student) => {
    return {
        type: "REMOVE-STUDENT",
        payload: student
    }
}
