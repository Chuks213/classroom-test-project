import ClassRecord from "../../data/responses/class-record";
import ActionTypes from "../action-types";
import { Action } from "../actions";

const initialState = {isLoggedIn: false, isLoading: false};

export interface SessionData {
    isLoggedIn: boolean,
    isLoading: boolean,
    classRoomData?: ClassRecord[]
}

const sessionReducer = (state: SessionData = initialState, action: Action) : SessionData => {
    switch(action.type) {
        case ActionTypes.SIGN_IN: 
            return {isLoggedIn: true, isLoading: false, classRoomData: action.payload};
        case ActionTypes.LOGOUT: 
            return {isLoggedIn: false, isLoading: false};
        case ActionTypes.LOADING: 
            return {isLoggedIn: false, isLoading: true};
        default:
            return state;
    }
}

export default sessionReducer;