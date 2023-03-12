import ActionTypes from "../action-types";
import { Action } from "../actions";

type DataMap = {[key: string]: string};

const dataMapReducer = (state: DataMap = {}, action: Action) : DataMap => {
    switch(action.type) {
        case ActionTypes.UPDATE_CLASSROOM: 
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default dataMapReducer;