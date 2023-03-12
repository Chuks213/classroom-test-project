import * as React from "react";
import "../styles/login.css";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../state/reducers";
import ActionType from "../state/action-types";
import { doGet } from "../networking/api-helper";
import StudentRecord from "../data/responses/student-record";
import ClassRecord from "../data/responses/class-record";

const Login: React.FC = () => {
    const studentName = useSelector((state: State) => state.student);
    const session = useSelector((state: State) => state.session);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.UPDATE_STUDENT, payload: e.target.value });
    }

    const handleClick = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch({ type: ActionType.LOADING});
        httpCall();
    }

    const httpCall = async (): Promise<void> => {
        const studentRecords: StudentRecord[] = await findStudents();
        if (studentRecords && studentRecords.length > 0) {
            let globalClassRecords: ClassRecord[] = [];
            for (let i = 0; i < studentRecords.length; i++) {
                const classRecords: ClassRecord[] = await findClasses(studentRecords[i].fields.Classes);
                globalClassRecords = globalClassRecords.concat(classRecords);
            }
            dispatch({ type: ActionType.SIGN_IN, payload: globalClassRecords });
        }else {
            alert(`Student: ${studentName} does not exist`);
        }
    }

    const findStudents = async (): Promise<StudentRecord[]> => {
        const studentResponse = await doGet(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students?filterByFormula=%7BName%7D%3D'${studentName.trim()}'`, true);
        if (studentResponse.responseCode === 79) {
            alert(studentResponse.errorMessage);
            return [];
        } else {
            const studentRecords: StudentRecord[] = studentResponse.data as StudentRecord[];
            return studentRecords;
        }
    }

    const findClasses = async (classes: string[]): Promise<ClassRecord[]> => {
        let classRecords: ClassRecord[] = [];
        for (let i = 0; i < classes.length; i++) {
            const classResponse = await doGet(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Classes/${classes[i].trim()}`);
            if (classResponse.responseCode === 99) {
                const classRecord: ClassRecord = classResponse.data as ClassRecord;
                classRecords.push(classRecord);
            }
        }
        return classRecords;
    }

    return (
        <form onSubmit={(e) => handleClick(e)}>
            <div className="form-group">
                <label>Student Name:</label> &nbsp;&nbsp;
                <input type="text" name="studentName" onChange={(e) => handleChange(e)} value={studentName} required />
            </div>
            <div className="form-group">
                {!session.isLoading ? <button type="submit">Login</button> : <button type="submit" disabled>Loading...</button>}
            </div>
        </form>
    );
}

export default Login;