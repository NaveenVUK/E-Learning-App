import { createStore, combineReducers } from "redux";
import UserRedcuers from "../Reducers/UserReducers";

const ConfigureStore = () => {

    const store = createStore(combineReducers({
        user: UserRedcuers
    }))

    return store
}

export default ConfigureStore