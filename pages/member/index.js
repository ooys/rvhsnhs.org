import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

initFirebase();
const auth = firebase.auth();
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
                <span className="events-title" />
                <div className="columns is-multiline is-4 is-variable is-mobile events">
                    {opportunities.map((opportunity) => {
                        return <Event opportunity={opportunity} />;
                    })}
                </div>
            </div>
        );
    }
}

function Member() {
    return (
        <div className="member">
            <Navbar user="member" />
            <div className="page-wrapper" id="member">
                <img src="/images/mainpage.png" alt=""></img>
            </div>
            <Footer />
        </div>
    );
}

export default withAuth(Member, "member");

/*
<div className="member-top-page-wrapper">
                    <div className="slideshow-wrapper">
                        <Events />
                    </div>
                    <div className="member-side-column">
                        <div className="member-side-column-upcoming">
                            <p> Upcoming Events </p>
                        </div>
                        <div className="member-side-column-text">
                            <p>
                                <li>July 28 - Freshmen Tours</li>
                                <li>September 18 - Full Chapter Meeting</li>
                                <li>September 30 - NHS Shirt Pickup</li>
                                <li>October 10 - Full Chapter Meeting</li>
                                <li>
                                    October 29 - Loudoun Hunger Relief Drive
                                    Closes
                                </li>
                                <li>November 16 - Full Chapter Meeting</li>
                                <li>December 17 - Holidy Party GSP</li>
                                <li>December 31 - Hour Logs Due</li>
                                <li>
                                    January 16 - Spring NHS Members Inducted
                                </li>
                                <li>Janury 28 - Full Chapter Meeting</li>
                                <li>February 18 - Full Chapter Meeting</li>
                            </p>
                        </div>
                    </div>
                </div>
*/
