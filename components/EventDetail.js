import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import { useRouter } from "next/router";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useState } from "react";

initFirebase();
const db = firebase.firestore();

function EventDetail({ data, uid, eid }) {
    // console.log(data);
    // console.log(uid);
    const router = useRouter();
    const profileRef = db.collection("users").doc(uid);
    const [value, loading, error] = useDocumentDataOnce(profileRef);
    const [disable, setDisable] = useState(false);

    function RegisterButton({ task, index, disable, setDisable }) {
        if (loading) {
            return <a className="event-detail-tasks-register">Loading...</a>;
        }
        if (error != undefined || data == undefined) {
            return <a className="event-detail-tasks-register">Error!</a>;
        } else {
            let existing_registration = value.opportunities.find(
                (element) => element.eid === eid
            );
            if (existing_registration) {
                if (
                    existing_registration.task_id.toString() ===
                    index.toString()
                ) {
                    return (
                        <a className="event-detail-tasks-register is-registered">
                            Registered
                        </a>
                    );
                } else {
                    return (
                        <a className="event-detail-tasks-register is-locked">
                            Unavailable
                        </a>
                    );
                }
            } else if (
                task["max-registrants"] - task.registrations.length <=
                0
            ) {
                return (
                    <a className={"event-detail-tasks-register is-locked"}>
                        Unavailable
                    </a>
                );
            } else {
                if (disable) {
                    return null;
                } else {
                    return (
                        <a
                            className={"event-detail-tasks-register"}
                            onClick={() => {
                                console.log(index);
                                register(index, setDisable);
                            }}>
                            Register
                        </a>
                    );
                }
            }
        }
    }

    async function register(index, setDisable) {
        setDisable(true);
        const taskRef = db.collection("opportunities").doc(eid);
        let updatedTasks = await taskRef.get().then((snapshot) => {
            let currTasks = snapshot.data().tasks;
            if (
                currTasks[index].registrations.find(
                    (element) => element === uid
                )
            ) {
                window.alert(
                    "You have already signed up for this task! Refreshing page."
                );
                router.reload(window.location.pathname);
            }
            if (
                currTasks[index].registrations.length <
                currTasks[index]["max-registrants"]
            ) {
                currTasks[index].registrations.push(uid);
            } else {
                window.alert(
                    "All spots filled for this task! Refreshing page."
                );
                router.reload(window.location.pathname);
            }
            return currTasks;
        });
        console.log(updatedTasks);

        await taskRef
            .update({
                tasks: updatedTasks,
            })
            .then(() => {
                taskRef.get().then((snapshot) => {
                    let currTasks = snapshot.data().tasks;
                    if (
                        currTasks[index].registrations.find(
                            (element) => element === uid
                        )
                    ) {
                        console.log("Success!");
                        const userRef = db.collection("users").doc(uid);
                        userRef
                            .update({
                                opportunities:
                                    firebase.firestore.FieldValue.arrayUnion({
                                        eid: eid,
                                        title: data.title,
                                        task_id: index,
                                        task_title: data.tasks[index].title,
                                        status: "registered",
                                        timestamp:
                                            new firebase.firestore.Timestamp.now(),
                                    }),
                            })
                            .then(() => {
                                window.alert("Registration approved.");
                                router.reload(window.location.pathname);
                            });
                    } else {
                        window.alert(
                            "All spots filled for this task! Refreshing page."
                        );
                        router.reload(window.location.pathname);
                    }
                });
            });
    }

    return (
        <div className="event-detail">
            <div
                className="event-detail-title"
                style={{
                    backgroundImage: `url("` + data.picture + `")`,
                }}>
                <div className="event-detail-title-overlay">
                    <div>{data.title}</div>
                </div>
            </div>
            <div className="event-detail-descriptions">
                <div className="event-detail-descriptions-title">
                    Event Details
                </div>
                <hr></hr>
                <div className="event-detail-date">Date: {data.date}</div>
                <div className="event-detail-time">
                    Time: {data["start-time"]} - {data["end-time"]}
                </div>
                <div className="event-detail-time">
                    Location: {data.location}
                </div>
                <br></br>
                <div className="event-detail-description">
                    {data.description}
                </div>
            </div>
            <div className="event-detail-tasks">
                <div className="event-detail-descriptions-title">Tasks</div>
                <hr></hr>
                <table className="table is-bordered is-fullwidth event-detail-tasks-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Hours </th>
                            <th>Availability</th>
                            <th>Register</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tasks.map((task, index) => {
                            return (
                                <tr key={index}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.hours}</td>
                                    <td>
                                        {task["max-registrants"] -
                                            task.registrations.length}{" "}
                                        out of {task["max-registrants"] + " "}
                                        spots available
                                    </td>
                                    <td className="event-detail-tasks-register-wrapper">
                                        <RegisterButton
                                            task={task}
                                            index={index}
                                            disable={disable}
                                            setDisable={setDisable}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EventDetail;
