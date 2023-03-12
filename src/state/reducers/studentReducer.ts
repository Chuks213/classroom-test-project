import ActionTypes from "../action-types";
import { Action } from "../actions";

const initialState = "";

const studentReducer = (state: string = initialState, action: Action) : string => {
    switch(action.type) {
        case ActionTypes.UPDATE_STUDENT: 
            return action.payload;
        default:
            return state;
    }
}

export default studentReducer;