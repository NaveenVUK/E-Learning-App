
const userInitialState = {
    user: {},
    errors: [],
    isLoading: false,
    students: [],
    courses: []
}

const UserRedcuers = (state = userInitialState, Action) => {
    switch (Action.type) {
        case "ADD-USER-INFO": {
            return { ...state, user: { ...Action.payload } }
        }
        case "ALL-STUDENTS": {
            return { ...state, students: [...Action.payload] }
        }
        case "ADD-STUDENT": {
            return { ...state, students: [...state.students, { ...Action.payload }] }
        }
        case "REMOVE-STUDENT": {
            const result = state.students.filter((ele) => {
                return ele._id != Action.payload._id
            })
            return { ...state, students: [...result] }
        }
        case "UPDATE-STUDENT": {
            const result = state.students.map((student) => {
                if (student._id === Action.payload._id) {
                    return { ...Action.payload }
                } else {
                    return { ...student }
                }
            })
            return { ...state, students: [...result] }
        }
        case "COURSES": {
            return { ...state, courses: [...Action.payload] }
        }
        default: {
            return state
        }
    }
}

export default UserRedcuers