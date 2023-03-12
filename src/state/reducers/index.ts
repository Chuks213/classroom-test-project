import {combineReducers} from "redux";
import dataMapReducer from "./dataMapReducer";
import sessionReducer from "./sessionReducer";
import studentReducer from "./studentReducer";

const reducers = combineReducers({session: sessionReducer, student: studentReducer, dataMap: dataMapReducer});

export default reducers;

export type State = ReturnType<typeof reducers>;