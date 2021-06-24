import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

initFirebase();
const db = firebase.firestore();

function Event({ opportunity }) {
    const router = useRouter();
    return (
        <>
            <a
                className="column is-three-fifths is-offset-one-fifth event"
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
            <div className="events-wrapper">
                <span className="events-title">Hours Opportunities</span>
                <div className="columns is-multiline is-4 is-variable is-mobile events">
                    {opportunities.map((opportunity) => {
                        return <Event opportunity={opportunity} />;
                    })}
                </div>
            </div>
        );
    }
}

function Opportunities() {
    return (
        <div className="opportunities">
            <Navbar />
            <div className="page-wrapper" id="opportunities">
                <Events />
            </div>
            <Footer />
        </div>
    );
}

export default withAuth(Opportunities, "member");
