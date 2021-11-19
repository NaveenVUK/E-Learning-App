
const userInitialState = {
    user: {},
    errors: [],
    isLoading: false
}

const UserRedcuers = (state = userInitialState, Action) => {
    switch (Action.type) {
        case "ADD-USER-INFO": {
            return { ...state, user: { ...Action.payload } }
        }
        default: {
            return state
        }
    }
}

export default UserRedcuers