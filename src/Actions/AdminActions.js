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

export const startStudentRegister = (formData, props, handleClose, clearForm) => {
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
                    swal("Student Added Successfully !!")
                    dispatch(addStudent(data))
                    clearForm()
                    handleClose()
                    props.history.push("/allstudents")
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const addStudent = (student) => {
    return {
        type: "ADD-STUDENT",
        payload: student
    }
}

export const StartAdminLogin = (values, props, userLoggedStatus) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/login", values)
            .then((response) => {
                const loginResponse = response.data
                const decoded = jwt_decode(loginResponse.token)
                if (loginResponse.hasOwnProperty("errors")) {
                    alert(loginResponse.errors)
                } else {
                    localStorage.setItem("token", loginResponse.token)
                    localStorage.setItem("user", JSON.stringify(decoded))
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

export const StartGetAdminInfo = () => {
    return (dispatch) => {
        axios.get("https://dct-e-learning.herokuapp.com/api/admin/account", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const userResponse = response.data
                dispatch(updateAdminInfo(userResponse))
            })
            .catch((error) => {
                alert(error)
            })
    }
}

const updateAdminInfo = (user) => {
    return {
        type: "ADD-USER-INFO",
        payload: user
    }
}

export const StartAdminUpdate = (formData, handleClose) => {
    return (dispatch) => {
        axios.put("https://dct-e-learning.herokuapp.com/api/admin", formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const userResponse = response.data
                dispatch(updateAdminInfo(userResponse))
                swal("Details are modified")
                handleClose()
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
                alert(error)
            })
    }
}

export const allStudents = (students) => {
    return {
        type: "ALL-STUDENTS",
        payload: students
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
