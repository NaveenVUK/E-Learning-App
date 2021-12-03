import axios from "axios"
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

export const StartAdminRegister = (values) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/register", values)
            .then((response) => {
                const registerResponse = response.data
                if (registerResponse.hasOwnProperty("errors")) {
                    dispatch(AddError(registerResponse.errors))
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
                    Object.keys(data).length === 1 ? dispatch(AddError(data.errors)) : dispatch(AddError(data.message))
                } else {
                    swal("Student Added Successfully !!")
                    dispatch(addStudent(data))
                    clearForm()
                    handleClose()
                    props.history.push("/admin/allstudents")
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
                console.log("now", loginResponse);
                if (loginResponse.hasOwnProperty("errors")) {
                    // alert(loginResponse.errors)
                    dispatch(AddError(loginResponse.errors))
                } else {
                    const decoded = jwt_decode(loginResponse.token)
                    localStorage.setItem("token", loginResponse.token)
                    localStorage.setItem("user", JSON.stringify(decoded))
                    swal("Successfully logged in !!")
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

export const updateAdminInfo = (user) => {
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

export const startCreateCourses = (formData, clearForm, navigate) => {
    console.log("startCreateCourses", formData);
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/courses", formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const courseResponse = response.data
                console.log("courseResponse", courseResponse);
                if (courseResponse.hasOwnProperty("errors")) {
                    alert(courseResponse.errors)
                } else {
                    clearForm()
                    navigate()
                    // dispatch(Courses(courseResponse))
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const startGetCourses = () => {
    return (dispatch) => {
        axios.get("https://dct-e-learning.herokuapp.com/api/courses", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const courseResponse = response.data
                if (courseResponse.hasOwnProperty("errors")) {
                    alert(courseResponse.errors)
                } else {
                    dispatch(Courses(courseResponse))
                    // window.location.reload()
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const Courses = (data) => {
    return {
        type: "COURSES",
        payload: data
    }
}

export const startDeleteCourse = (id, altermsg) => {
    return (dispatch) => {
        axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${id}`, {
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
                    altermsg()
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert(error)
            })
    }
}

export const AddError = (error) => {

    return {
        type: "ADD-ERROR",
        payload: error
    }
}

export const startEnrollStudent = (courseID, studentId) => {
    console.log(courseID, studentId);
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${courseID}&studentId=${studentId}`, {}, {
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

export const startUnEnrollStudent = (courseID, studentId) => {
    console.log(courseID, studentId);
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/unenroll?courseId=${courseID}&studentId=${studentId}`, {}, {
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

export const startAddLecture = (courseID, formData) => {
    return (dispatch) => {
        axios.post(`https://dct-e-learning.herokuapp.com/api/courses/${courseID}/lectures`, formData, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const lectureResponse = response.data
                console.log("lectureResponse", lectureResponse);
                if (lectureResponse.hasOwnProperty("errors")) {
                    alert(lectureResponse.errors)
                } else {
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert("else", error)
            })
    }
}

export const startDeleteLecture = (courseID, lectureID) => {
    return (dispatch) => {
        axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${courseID}/lectures/${lectureID}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const lectureResponse = response.data
                console.log("lectureResponse", lectureResponse);
                if (lectureResponse.hasOwnProperty("errors")) {
                    alert(lectureResponse.errors)
                } else {
                    window.location.reload()
                }
            })
            .catch((error) => {
                alert("else", error)
            })
    }
}
