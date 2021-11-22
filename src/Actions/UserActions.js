import axios from "axios"

export const StartAdminRegister = (values) => {
    console.log("regiser", values);
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/register", values)
            .then((response) => {
                const registerResponse = response.data
                if (registerResponse.hasOwnProperty("errors")) {
                    alert(registerResponse.errors)
                } else {
                    alert(registerResponse)
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    }
}

export const StartAdminLogin = (values, props, userLoggedStatus) => {
    return (dispatch) => {
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/login", values)
            .then((response) => {
                const loginResponse = response.data
                if (loginResponse.hasOwnProperty("errors")) {
                    alert(loginResponse.errors)
                } else {
                    localStorage.setItem("token", loginResponse.token)
                    alert("Successfully logged in")
                    userLoggedStatus()
                    props.history.push("/")
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
                alert(error)
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
                console.log('res', userResponse)
                dispatch(AddUserInfo(userResponse))
                EditToggle()
            })
            .catch((error) => {
                alert(error)
            })
    }
}
