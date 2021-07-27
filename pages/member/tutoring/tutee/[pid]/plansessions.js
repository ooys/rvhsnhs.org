import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

initFirebase();
const db = firebase.firestore();

function PlanSessions() {
    const router = useRouter();
    const sessionsRef = db.collection("tutor-sessions").doc("master");
    const [data, loading, error] = useDocumentDataOnce(sessionsRef);

    function FutureSessions({ data }) {
        return (
            <div className="columns is-multiline">
                {data.sessions.map((session) => {
                    return (
                        <div className="column is-full">
                            <div className="columns is-gapless is-multiline">
                                <div className="column is-2">
                                    {session.date}
                                    <br></br>
                                    Wednesday
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
                                    <a>Register</a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || data == undefined) {
        console.log(error);
        return <div>Error</div>;
    } else {
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Upcoming Sessions
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <FutureSessions data={data} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(PlanSessions, "Plan Sessions"), "member");
