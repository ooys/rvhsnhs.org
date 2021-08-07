import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import withFrame from "/components/Frame.js";
import swal from "sweetalert";

initFirebase();
const db = firebase.firestore();

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

const currDate = new Date().setHours(0, 0, 0, 0);

function SessionInfo() {
    const router = useRouter();
    const { sessionId } = router.query;
    const sessionRef = db.collection("tutor-sessions").doc(sessionId);
    const [data, loading, error] = useDocumentDataOnce(sessionRef);

    async function addHours(hours, userId) {
        const userRef = db.collection("users").doc(userId);
        userRef.update({
            [`hours.tutoring`]: firebase.firestore.FieldValue.increment(hours),
        });
    }

    function pairCheckIn(pairId, sessionData) {
        const pairRef = db.collection("tutor-pairs").doc(pairId);
        // find the pair in sessionData.registrants where pairId = pairId and update status to complete
        const pair = sessionData.registrants.findIndex(
            (pair) => pair.pair_id.toString() === pairId
        );
        sessionData.registrants[pair].status = "completed";
        sessionRef
            .update({
                ...sessionData,
            })
            .then(() => {
                pairRef.get().then((pairRawData) => {
                    let pairData = pairRawData.data();

                    const pairSession = pairData.sessions.findIndex(
                        (session) => session.sessionId.toString() === sessionId
                    );
                    pairData.sessions[pairSession].status = "completed";
                    pairRef.update({ sessions: pairData.sessions }).then(() => {
                        // compute the difference in hours between sessionData.time_start and sessionData.time_end
                        const timeDiff =
                            new Date(
                                sessionData.date +
                                    "T" +
                                    sessionData.time_end +
                                    ":00"
                            ) -
                            new Date(
                                sessionData.date +
                                    "T" +
                                    sessionData.time_start +
                                    ":00"
                            );

                        addHours(
                            timeDiff / 1000 / 60 / 60,
                            pairData.tutor.uid
                        ).then(() => {
                            swal(
                                "Checked In!",
                                "Tutoring pair is checked in for this session.",
                                "success"
                            ).then(() => {
                                router.reload(window.location.pathname);
                            });
                        });
                    });
                });
            });
    }

    function PairCards({ sessionData, status }) {
        if (status === "registered") {
            return (
                <div className="columns is-multiline pair-list">
                    <div className="column is-full pair-list-title">
                        <div className="columns is-mobile">
                            <div className="column is-4">Tutor</div>
                            <div className="column is-4">Tutee</div>
                            <div className="column is-4">Actions</div>
                        </div>
                    </div>
                    {sessionData.registrants.map((pair) => {
                        if (pair.status === "registered") {
                            return (
                                <div className="column is-full pair-card">
                                    <div className="columns is-mobile">
                                        <div className="column is-4">
                                            {pair.tutor.first} {pair.tutor.last}
                                        </div>
                                        <div className="column is-4">
                                            {pair.tutee.first} {pair.tutee.last}
                                        </div>
                                        <div className="column is-4">
                                            <a
                                                onClick={() => {
                                                    pairCheckIn(
                                                        pair.pair_id,
                                                        sessionData
                                                    );
                                                }}>
                                                Check in
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else return null;
                    })}
                    <div className="column is-full pair-add">Add Pair</div>
                </div>
            );
        } else if (status === "present") {
            return (
                <div className="columns is-multiline pair-list">
                    <div className="column is-full pair-list-title">
                        <div className="columns is-mobile">
                            <div className="column is-4">Tutor</div>
                            <div className="column is-4">Tutee</div>
                            <div className="column is-4">Actions</div>
                        </div>
                    </div>
                    {sessionData.registrants.map((pair) => {
                        if (pair.status === "completed") {
                            return (
                                <div className="column is-full pair-card">
                                    <div className="columns is-mobile">
                                        <div className="column is-4">
                                            {pair.tutor.first} {pair.tutor.last}
                                        </div>
                                        <div className="column is-4">
                                            {pair.tutee.first} {pair.tutee.last}
                                        </div>
                                        <div className="column is-4">
                                            Present
                                        </div>
                                    </div>
                                </div>
                            );
                        } else return null;
                    })}
                </div>
            );
        }
    }

    function SessionCard({ sessionData }) {
        return (
            <div className="column is-full session-card session-is-locked">
                <div className="columns is-gapless is-multiline is-mobile">
                    <div className="column is-6">
                        <div className="columns is-gapless is-multiline">
                            <div className="column is-full">
                                {sessionData.date}
                                {" " +
                                    getDayOfWeek(sessionData.date)
                                        .substring(0, 3)
                                        .toUpperCase()}
                            </div>
                            <div className="column is-full">
                                {sessionData["time_start"] +
                                    " - " +
                                    sessionData["time_end"]}
                            </div>
                            <div className="column is-full">
                                {sessionData.format}
                            </div>
                            <div className="column is-full">
                                {sessionData.location}
                            </div>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="columns is-gapless is-multiline">
                            <div className="column is-full">
                                Max Pairs: {sessionData["max_pairs"]}
                            </div>
                            <div className="column is-full">
                                Pairs Registered:{" "}
                                {sessionData.registrants.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || data == undefined) {
        return <div></div>;
    } else {
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Session Information
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <SessionCard sessionData={data} />
                    </div>
                    <div className="column is-full tutor-list-title">
                        Registrations
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <PairCards sessionData={data} status={"registered"} />
                    </div>
                    <div className="column is-full tutor-list-title">
                        Marked Present
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <PairCards sessionData={data} status={"present"} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(SessionInfo, "Create Session"), "moderator");
