import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import sendEmail from "/components/email/sendEmail.js";
import swal from "sweetalert";
import Empty from "/components/utils/Empty.js";

initFirebase();
const db = firebase.firestore();

const currDate = new Date().setHours(0, 0, 0, 0);

function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
        ? null
        : [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
          ][dayOfWeek];
}

function TutorPair() {
    const router = useRouter();
    const { pid } = router.query;
    const userRef = db.collection("tutor-pairs").doc(pid);
    const [data, loading, error] = useDocumentDataOnce(userRef);
    const sessionsRef = db.collection("tutor-sessions").doc("master");
    const [data2, loading2, error2] = useDocumentDataOnce(sessionsRef);
    const [verify, setVerify] = useState(false);

    function TuteeInfo({ tuteeData }) {
        return (
            <>
                <div className="columns tutee-card-spacer">
                    <div className="column is-full tutee-card-info">
                        <div className="columns is-multiline is-mobile tutee-card is-gapless">
                            <div className="column is-full tutee-card-title">
                                {tuteeData.tutee.first +
                                    " " +
                                    tuteeData.tutee.last}
                            </div>
                            <div className="column is-half tutee-card-body">
                                <div className="columns tutee-card-left is-multiline is-gapless">
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.tutee.school.name}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {"Grade " +
                                            tuteeData.tutee.school.grade}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.termlength}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.format.toString() ===
                                        "No Preference"
                                            ? "In Person/Virtual"
                                            : tuteeData.format}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-half tutee-card-body">
                                <div className="columns tutee-card-left is-multiline is-gapless">
                                    <div className="column is-full tutee-card-left-text">
                                        <b>{tuteeData.tutee.school.subject}</b>
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.tutee.school.course}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-full tutee-card-tags">
                                Availabilities:{" "}
                                {tuteeData.availability.studyhall.toString() ===
                                "None" ? null : (
                                    <a className="tag tutee-card-tag">
                                        {tuteeData.availability.studyhall}
                                    </a>
                                )}
                                {tuteeData.availability.exterior.map(
                                    (time, index) => {
                                        return (
                                            <a
                                                key={index}
                                                className="tag tutee-card-tag">
                                                {time}
                                            </a>
                                        );
                                    }
                                )}
                            </div>
                            <div className="column is-full tutee-card-tags">
                                {tuteeData.comments.toString() === "" ? null : (
                                    <>
                                        <br></br>
                                        Comments: {tuteeData.comments}
                                    </>
                                )}
                            </div>
                            <div className="column is-full tutee-card-tags">
                                <br></br>
                                Student Email:{" " + tuteeData.tutee.email}
                                <br></br>
                                Parent Email:{" " + tuteeData.parent.email}
                                <br></br>
                                Course Teacher Name:{" "}
                                {" " +
                                    tuteeData.tutee.school.teacher.first +
                                    " " +
                                    tuteeData.tutee.school.teacher.last}
                                <br></br>
                                Course Teacher Email:
                                {" " + tuteeData.tutee.school.teacher.email}
                                <br></br>
                                Counselor Email:
                                {" " + tuteeData.tutee.school.counseloremail}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function registerSession(sessionId, pairData, sessionData) {
        const registerRef = db.collection("tutor-sessions").doc(sessionId);
        registerRef.get().then((snapshot) => {
            if (snapshot.exists) {
                const snapshotData = snapshot.data();
                // check if tutee uid or tutor uid are not found in any of the snapshotData registrants
                if (
                    !(
                        snapshotData.registrants.some(
                            (s) => s.tutee.uid === pairData.tutee.uid
                        ) ||
                        snapshotData.registrants.some(
                            (s) => s.tutor.uid === pairData.tutor.uid
                        )
                    )
                ) {
                    if (
                        snapshotData.registrants.length < snapshotData.max_pairs
                    ) {
                        registerRef
                            .update({
                                registrants:
                                    firebase.firestore.FieldValue.arrayUnion({
                                        pair_id: pid,
                                        status: "registered",
                                        tutee: {
                                            email: pairData.tutee.email,
                                            first: pairData.tutee.first,
                                            last: pairData.tutee.last,
                                            uid: pairData.tutee.uid,
                                        },
                                        tutor: {
                                            email: pairData.tutor.email,
                                            first: pairData.tutor.first,
                                            last: pairData.tutor.last,
                                            uid: pairData.tutor.uid,
                                        },
                                    }),
                            })
                            .then(() => {
                                const pairRef = db
                                    .collection("tutor-pairs")
                                    .doc(pid);
                                pairRef
                                    .update({
                                        sessions:
                                            firebase.firestore.FieldValue.arrayUnion(
                                                {
                                                    sessionId: sessionId,
                                                    status: "registered",
                                                    date: sessionData.date,
                                                    time_start:
                                                        sessionData.time_start,
                                                    time_end:
                                                        sessionData.time_end,
                                                    location:
                                                        sessionData.location,
                                                    format: sessionData.format,
                                                }
                                            ),
                                    })
                                    .then(() => {
                                        const userRef2 = db
                                            .collection("users")
                                            .doc(pairData.tutor.uid);
                                        userRef2
                                            .update({
                                                [`tutoring.${pid}.sessions`]:
                                                    firebase.firestore.FieldValue.arrayUnion(
                                                        {
                                                            sessionId:
                                                                sessionId,
                                                            date: sessionData.date,
                                                            time_start:
                                                                sessionData.time_start,
                                                            time_end:
                                                                sessionData.time_end,
                                                            location:
                                                                sessionData.location,
                                                            format: sessionData.format,
                                                        }
                                                    ),
                                            })
                                            .then(() => {
                                                const emailHtml = `You have registered for the tutoring session on ${sessionData.date} from ${sessionData.time_start} to ${sessionData.time_end}. Please make sure to arrive at location: ${sessionData.location} on time to be checked in by a faculty facilitator.`;
                                                sendEmail(
                                                    pairData.tutee.email +
                                                        "," +
                                                        pairData.tutor.email,
                                                    "Tutoring: Session Registered on " +
                                                        sessionData.date,
                                                    "Session Registered!",
                                                    emailHtml
                                                ).then(() => {
                                                    swal(
                                                        "Success!",
                                                        "You have successfully registered for the session.",
                                                        "success"
                                                    ).then(() => {
                                                        router.reload(
                                                            window.location
                                                                .pathname
                                                        );
                                                    });
                                                });
                                            });
                                    });
                            });
                    } else {
                        swal(
                            "Error!",
                            "The session is full! Please register another session instead.",
                            "error"
                        );
                    }
                } else {
                    swal(
                        "Error!",
                        "You have already registered for this session.",
                        "error"
                    );
                }
            }
        });
    }

    function FutureSessions({ data, tuteeData }) {
        if (data.sessions.length === 0) {
            return <Empty />;
        }
        console.log(data.sessions);
        return (
            <div className="columns is-multiline">
                {data.sessions.map((session) => {
                    // if session id is not in the list of sessions in tuteeData.sessions, return
                    if (
                        !tuteeData.sessions.some(
                            (s) => s.sessionId === session.sessionId
                        )
                    ) {
                        const sessionDate = new Date(session.date);
                        if (sessionDate > currDate) {
                            return (
                                <div className="column is-full session-card">
                                    <div className="columns is-gapless is-multiline">
                                        <div className="column is-2">
                                            {session.date}
                                            {" " + getDayOfWeek(session.date)}
                                        </div>
                                        <div className="column is-2">
                                            {session["time_start"] +
                                                " - " +
                                                session["time_end"]}
                                        </div>
                                        <div className="column is-2">
                                            {session.format}
                                        </div>
                                        <div className="column is-4">
                                            {session.location}
                                        </div>
                                        <div className="column is-2">
                                            <a
                                                onClick={() => {
                                                    registerSession(
                                                        session.sessionId,
                                                        tuteeData,
                                                        session
                                                    );
                                                }}>
                                                Register
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }
                })}
            </div>
        );
    }

    function FutureSessionsModal({ data, tuteeData }) {
        if (verify) {
            return (
                <div className={"modal is-active"} id="session-register-modal">
                    <div
                        className="modal-background"
                        onClick={() => {
                            setVerify(false);
                        }}></div>
                    <div
                        className="modal-content session-register-modal-content columns is-multiline"
                        id="selection-modal-content">
                        <div className="verify-modal-title column is-full">
                            Upcoming Sessions
                            <hr className="verify-modal-line"></hr>
                        </div>
                        <div className="column is-full">
                            <FutureSessions data={data} tuteeData={tuteeData} />
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => {
                            setVerify(false);
                        }}></button>
                </div>
            );
        } else return null;
    }

    function SessionsDisplay({ data, status }) {
        return (
            <div className="columns is-multiline">
                {data.map((session) => {
                    if (status === session.status) {
                        const sessionDate = new Date(session.date);
                        return (
                            <div className="column is-full session-card">
                                <div className="columns is-gapless is-multiline">
                                    <div className="column is-2">
                                        {session.date}
                                        {" " + getDayOfWeek(session.date)}
                                    </div>
                                    <div className="column is-2">
                                        {session["time_start"] +
                                            " - " +
                                            session["time_end"]}
                                    </div>
                                    <div className="column is-2">
                                        {session.format}
                                    </div>
                                    <div className="column is-4">
                                        {session.location}
                                    </div>
                                    <div className="column is-2">
                                        {status === "completed" ? (
                                            <div className="text-is-success">
                                                Completed
                                            </div>
                                        ) : new Date(
                                              sessionDate.getTime() +
                                                  24 * 60 * 60 * 1000
                                          ) > currDate ? (
                                            <div className="text-is-warning">
                                                Registered
                                            </div>
                                        ) : (
                                            <div className="text-is-danger">
                                                Missed
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    if (loading || loading2) {
        return <div>Loading...</div>;
    }
    if (
        error != undefined ||
        error2 != undefined ||
        data == undefined ||
        data2 == undefined
    ) {
        return null;
    } else {
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Tutee Information
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <TuteeInfo tuteeData={data} />
                    </div>
                    <div className="column is-full tutor-list-title">
                        Sessions Registered
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <SessionsDisplay
                            data={data.sessions}
                            status={"registered"}
                        />
                        <FutureSessionsModal data={data2} tuteeData={data} />
                        <a
                            onClick={() => {
                                setVerify(true);
                            }}>
                            Register Sessions
                        </a>
                    </div>
                    <div className="column is-full tutor-list-title">
                        Sessions Completed
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <SessionsDisplay
                            data={data.sessions}
                            status={"completed"}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(TutorPair, "Information"), "member");
