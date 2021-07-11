import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import initFirebase from "/services/firebase.js";
import { useRouter } from "next/router";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useState, useRef } from "react";

initFirebase();
const db = firebase.firestore();
const fs = firebase.storage();

function EventDetail({ data, uid, eid }) {
    // console.log(data);
    // console.log(uid);
    const router = useRouter();
    const profileRef = db.collection("users").doc(uid);
    const [value, loading, error] = useDocumentDataOnce(profileRef);
    const [disable, setDisable] = useState(false);
    const [verify, setVerify] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef(null);

    function completeVerification(task, index, first, last, type, url) {
        if (type === "file") {
            const caseRef = db.collection("hours-submitted");
            caseRef
                .add({
                    first: first,
                    last: last,
                    eid: eid,
                    event_title: data.title,
                    tid: index,
                    task_title: task.title,
                    task_description: task.description,
                    hours: task.hours,
                    uid: uid,
                    url: url,
                    timestamp: new firebase.firestore.Timestamp.now(),
                })
                .then(function (docRef) {
                    console.log("Case Created.");
                    const userRef = db.collection("users").doc(uid);
                    userRef.update({
                        [`opportunities.${eid}.status`]: "submitted",
                        [`opportunities.${eid}.case`]: docRef.id,
                    });
                })
                .then(() => {
                    console.log("User Info Updated.");
                    setVerify(false);
                    setProgress(0);
                    setDisable(true);
                    window.alert("Verification Submitted.");
                    router.reload(window.location.pathname);
                });
        }
        if (type === "email") {
        }
    }

    function sendVerifyEmail() {}

    function uploadFile(taskinfo, index, first, last) {
        if (fileInputRef.current.files[0] != null) {
            var file = fileInputRef.current.files[0];
            var storageRef = fs.ref(eid + "/" + uid);
            var task = storageRef.put(file);
            console.log(taskinfo, index);
            task.on(
                "state_change",
                function progress(snapshot) {
                    setProgress(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                function error(err) {
                    console.log("Error: ", err);
                },
                function complete() {
                    console.log("Upload Complete");
                    storageRef.getDownloadURL().then((url) => {
                        completeVerification(
                            taskinfo,
                            index,
                            first,
                            last,
                            "file",
                            url
                        );
                    });
                }
            );
        }
    }

    function VerifyModal({ task, index, first, last }) {
        if (verify == true) {
            return (
                <div className={"modal is-active"} id="verify-modal">
                    <div
                        className="modal-background"
                        onClick={() => {
                            setVerify(false);
                            setProgress(0);
                        }}></div>
                    <div className="modal-content" id="verify-modal-content">
                        <input
                            className="hidden"
                            type="file"
                            // onChange={uploadFile}
                            ref={fileInputRef}></input>
                        <progress
                            className="progress is-info"
                            value={progress}
                            max={100}></progress>
                        <a
                            className="button is-success"
                            onClick={() => {
                                uploadFile(task, index, first, last);
                            }}>
                            Submit
                        </a>
                        <div>OR</div>
                        <a className="button is-warning">
                            Teacher Verification
                        </a>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => {
                            setVerify(false);
                            setProgress(0);
                        }}></button>
                </div>
            );
        } else {
            return null;
        }
    }

    function RegisterButton({ task, index, disable, setDisable }) {
        if (loading) {
            return <a className="event-detail-tasks-register">Loading...</a>;
        }
        if (error != undefined || data == undefined) {
            return <a className="event-detail-tasks-register">Error!</a>;
        } else {
            let existing_registration = value.opportunities[eid];
            if (existing_registration) {
                if (
                    existing_registration.task_id.toString() ===
                    index.toString()
                ) {
                    if (
                        existing_registration.status.toString() === "registered"
                    ) {
                        return (
                            <>
                                <a
                                    className="event-detail-tasks-register is-registered"
                                    onClick={() => {
                                        setVerify(true);
                                    }}>
                                    Verify
                                </a>
                                <VerifyModal
                                    task={task}
                                    index={index}
                                    first={value.first}
                                    last={value.last}
                                />
                            </>
                        );
                    } else if (
                        existing_registration.status.toString() === "submitted"
                    ) {
                        return (
                            <>
                                <a className="event-detail-tasks-register is-submitted">
                                    Submitted
                                </a>
                            </>
                        );
                    } else if (
                        existing_registration.status.toString() === "verified"
                    ) {
                        return (
                            <>
                                <a className="event-detail-tasks-register is-verified">
                                    Verified
                                </a>
                            </>
                        );
                    }
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
                                [`opportunities.${eid}`]: {
                                    title: data.title,
                                    task_id: index,
                                    task_title: data.tasks[index].title,
                                    status: "registered",
                                    date: data.date,
                                    hours: data.tasks[index].hours,
                                    timestamp:
                                        new firebase.firestore.Timestamp.now(),
                                },
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
