import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withFrame from "/components/Frame.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

initFirebase();
const db = firebase.firestore();

function Event({ opportunity }) {
    const router = useRouter();
    return (
        <>
            <a
                className="column is-full event"
                key={opportunity.eid}
                onClick={() => {
                    router.push("/member/opportunities/" + opportunity.eid);
                }}
                style={{
                    backgroundImage: `url("` + opportunity.picture + `")`,
                }}>
                <div className="event-title">{opportunity.title}</div>
            </a>
        </>
    );
}

function Events() {
    const eventRef = db.collection("opportunities").doc("master");
    const [data, loading, error] = useDocumentDataOnce(eventRef);
    if (loading) {
        return <>Loading Events...</>;
    }
    if (error != undefined || data == undefined) {
        // console.log("error");
        return <div>Error!</div>;
    } else {
        const opportunities = data.ongoing;
        return (
            <div className="columns is-multiline is-mobile events">
                {opportunities.map((opportunity, index) => {
                    return <Event key={index} opportunity={opportunity} />;
                })}
            </div>
        );
    }
}

function Opportunities() {
    return (
        <div className="columns is-multiline tutor-list">
            <div className="column is-full tutor-list-title">
                Hours Opportunities
                <hr className="tutor-list-hr"></hr>
            </div>
            <div className="column is-full">
                <Events />
            </div>
        </div>
    );
}

export default withAuth(withFrame(Opportunities, "Find Opportunity"), "member");
