import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import withFrame from "/components/Frame.js";

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

function PairCards({ sessionData }) {
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
                                        console.log("Verify" + pair.pair_id);
                                    }}>
                                    Check in
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div>Add Pair</div>
        </div>
    );
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
                            Pairs Registered: {sessionData.registrants.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SessionInfo() {
    const router = useRouter();
    const { sessionId } = router.query;
    const sessionRef = db.collection("tutor-sessions").doc(sessionId);
    const [data, loading, error] = useDocumentDataOnce(sessionRef);

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
                        <PairCards sessionData={data} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(SessionInfo, "Create Session"), "moderator");
