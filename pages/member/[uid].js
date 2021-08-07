import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import DisplayCalendar from "/components/Calendar.js";
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

function Dashboard() {
    const router = useRouter();
    const { uid } = router.query;
    const userRef = db.collection("users").doc(uid);
    const [data, loading, error] = useDocumentDataOnce(userRef);

    let events = [
        // {
        //     title: "test",
        //     start: new Date(),
        //     end: new Date(),
        //     specialType: "test",
        // },
    ];

    function loadEvents(data) {
        // Load Opportunities
        Object.keys(data.opportunities).map((key) => {
            const opportunity = data.opportunities[key];
            events.push({
                title: "Opportunity: " + opportunity.title,
                start: new Date(
                    opportunity.date + "T" + opportunity.time_start
                ),
                end: new Date(opportunity.date + "T" + opportunity.time_end),
                specialType: "opportunity",
            });
        });
        Object.keys(data.tutoring).map((key) => {
            const pair = data.tutoring[key];
            pair.sessions.map((session) => {
                events.push({
                    title: "Tutoring: " + pair.first + " " + pair.last,
                    start: new Date(session.date + "T" + session.time_start),
                    end: new Date(session.date + "T" + session.time_end),
                    specialType: "tutoring",
                });
            });
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || data == undefined) {
        return <div></div>;
    } else {
        loadEvents(data);
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Dashboard
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <DisplayCalendar events={events} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(Dashboard, "Dashboard"), "member");

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
