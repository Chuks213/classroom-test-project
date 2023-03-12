import * as React from "react";
import "../styles/app.css";
import { useSelector } from "react-redux";
import { State } from "../state/reducers";
import Login from "./login";
import {useDispatch} from "react-redux";
import ActionType from "../state/action-types";
import Classroom from "./classroom";

const Home: React.FC = () => {
    const session = useSelector((state: State) => state.session);
    const dispatch = useDispatch();

    const logout = () :void => {
        dispatch({type: ActionType.LOGOUT});
    }

    return (
        <>
            {session.isLoggedIn ? <button type="button" className="logout-btn" onClick={() => logout()}>Logout</button> : null}
            <div className="container">
                {!session.isLoggedIn ? <Login /> : <Classroom />}
            </div>
        </>
    )
}

export default Home;