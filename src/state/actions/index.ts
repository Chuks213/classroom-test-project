import ClassRecord from "../../data/responses/class-record";
import ActionType from "../action-types";

interface SessionAction {
    type: ActionType.SIGN_IN | ActionType.LOGOUT | ActionType.LOADING,
    payload?: ClassRecord[]
}

interface StudentAction {
    type: ActionType.UPDATE_STUDENT,
    payload: string
}

interface UpdateDataMapAction {
    type: ActionType.UPDATE_CLASSROOM,
    payload: {}
}

export type Action = SessionAction | StudentAction | UpdateDataMapAction;