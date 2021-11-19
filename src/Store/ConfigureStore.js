import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import UserRedcuers from "../Reducers/UserReducers";

const ConfigureStore = () => {

    const store = createStore(combineReducers({
        user: UserRedcuers
    }), applyMiddleware(thunk))

    return store
}

export default ConfigureStore