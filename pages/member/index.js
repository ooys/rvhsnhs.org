import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import DisplayCalendar from "/components/Calendar.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Uid from "../officer/[uid]";
import { Calendar } from "react-big-calendar";

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function Dashboard() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [allEvents, setAllEvents] = useState([]);
    const [userData, setUserData] = useState(["null", "null"]);

    async function getUserData(uid) {
        if (userData[0] != uid) {
            const userRef = db.collection("users").doc(uid);
            userRef.get().then((snapshot) => {
                const data = snapshot.data();
                setUserData([uid, data]);
                return data;
            });
        } else {
            return userData[1];
        }
    }

    async function loadEvents(uid) {
        const data = await getUserData(uid);
        if (data) {
            let events = [
                // {
                //     title: "test",
                //     start: new Date(),
                //     end: new Date(),
                //     specialType: "test",
                //     allDay?: true,
                //     resource?: any,
                // },
                // Full Chapter Meetings
            ];
            const fullChapterMeetingDates = [
                "2021-9-30",
                "2021-10-28",
                "2021-11-18",
                "2021-12-02",
                "2022-01-27",
                "2022-02-24",
                "2022-03-24",
                "2022-04-28",
                "2022-05-26",
            ];
            fullChapterMeetingDates.forEach((date) => {
                events.push({
                    title: "Full Chapter Meeting",
                    start: new Date(date + "T08:15"),
                    end: new Date(date + "T09:00"),
                    specialType: "chapter-meeting",
                    allDay: false,
                    resource: "https://www.google.com",
                });
            });

            // Load Opportunities

            Object.keys(data.opportunities).map((key) => {
                const opportunity = data.opportunities[key];
                events.push({
                    title: "Opportunity: " + opportunity.title,
                    start: new Date(
                        opportunity.date + "T" + opportunity.time_start
                    ),
                    end: new Date(
                        opportunity.date + "T" + opportunity.time_end
                    ),
                    specialType: "opportunity",
                });
            });
            Object.keys(data.tutoring).map((key) => {
                const pair = data.tutoring[key];
                pair.sessions.map((session) => {
                    events.push({
                        title: "Tutoring: " + pair.first + " " + pair.last,
                        start: new Date(
                            session.date + "T" + session.time_start
                        ),
                        end: new Date(session.date + "T" + session.time_end),
                        specialType: "tutoring",
                    });
                });
            });
            setAllEvents(events);
        }
    }

    function CalendarWrapper({ uid }) {
        if (allEvents.length > 0) {
            return <DisplayCalendar events={allEvents} />;
        } else {
            loadEvents(uid);
            return null;
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || user == undefined) {
        return <div></div>;
    } else {
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Dashboard
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <CalendarWrapper uid={user.uid} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(Dashboard, "Home"), "member");
