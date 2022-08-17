import { combineReducers, createStore } from "redux";
import tasksReducer from "./reducer";

const reducer = combineReducers({
    tasksReducer: tasksReducer
});

const store = createStore(reducer);

export default store;