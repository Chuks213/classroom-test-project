import * as React from "react";
import "../styles/classroom.css";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../state/reducers";
import { doGet } from "../networking/api-helper";
import StudentRecord from "../data/responses/student-record";
import ClassRecord from "../data/responses/class-record";
import ActionType from "../state/action-types";


const Classroom: React.FC = () => {
    const dispatch = useDispatch();
    const session = useSelector((state: State) => state.session);
    const dataMap = useSelector((state: State) => state.dataMap);

    const classData: ClassRecord[] = session.classRoomData as ClassRecord[];

    React.useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            for (let i = 0; i < classData.length; i++) {
                let { Students } = classData[i].fields;
                for(let j = 0; j < Students.length; j++) {
                    const studentRecord = await findStudent(Students[j]);
                    if(studentRecord) dispatch({type: ActionType.UPDATE_CLASSROOM, payload: {[studentRecord.id]: studentRecord.fields.Name}});
                }
            }
        }

        bootstrapAsync();
    }, []);

    const findStudent = async (studentId: string): Promise<StudentRecord | null> => {
        const studentResponse = await doGet(`https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/Students/${studentId.trim()}`);
        if (studentResponse.responseCode === 79)
            return null;
        else
            return studentResponse.data as StudentRecord;
    }

    const getClearStudents = (students: string[]): string => {
        const result: string[] = [];
        for (let c = 0; c < students.length; c++) {
            const foundStudent = dataMap[students[c]];
            if(foundStudent) result.push(foundStudent);
        }

        return result.toString();
    }

    return (
        <div className="custom-container">
            {classData.map((clasRecord, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="item">
                            <label>Name</label>
                            <div>{clasRecord.fields.Name}</div>
                        </div>
                        <div className="item">
                            <label>Students</label>
                            <div>{getClearStudents(clasRecord.fields.Students)}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Classroom;