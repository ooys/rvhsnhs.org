import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import DisplayCalendar from "/components/Calendar.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

const WelcomeTour = dynamic(() => import("/components/WelcomeTour"), {
    ssr: false,
});

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function Dashboard() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [allEvents, setAllEvents] = useState([]);
    const [userData, setUserData] = useState(["null", "null"]);
    const [isTourOpen, setIsTourOpen] = useState(true);

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

    const steps = [
        {
            selector: "",
            content: (
                <>
                    <div className="tour-header">
                        Hello, {userData[1].first}!
                    </div>
                    <div className="tour-body">
                        Welcome to Riverside NHS Portal!
                        <br></br>
                        <br></br>
                        This is the place where you can manage all your
                        resources, including your NHS <b>profile</b>,{" "}
                        <b>volunteering</b> opportunities, and <b>tutoring</b>{" "}
                        pairs.
                        <br></br>
                        <br></br>
                        Let's go on a quick tour!
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
        {
            selector: ".tutor-list-title",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        This is your <b>Dashboard</b>.<br></br>
                        <br></br>
                        It is the first place you will reach upon login.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
        {
            selector: ".calendar-wrapper",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Your interactive <b>Calendar</b> displays all your
                        NHS-related events.<br></br>
                        <br></br>
                        We have already loaded for you all the dates and times
                        of our full chapter meetings this year. check them out
                        by flipping the pages!
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
        {
            selector: ".frame-toolbar-member",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        This is your <b>member toolbar</b>.<br></br>
                        <br></br>
                        All the pages you can visit are listed here.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
            stepInteraction: false,
        },
        {
            selector: "#toolbar-element-Profile",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Let's check out your <b>NHS profile</b>!<br></br>
                        <br></br>
                        Click "Profile" to continue.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || user == undefined) {
        return <div></div>;
    } else {
        return (
            <>
                <WelcomeTour
                    steps={steps}
                    open={isTourOpen}
                    setOpen={setIsTourOpen}
                    route={"/member"}
                    startAt={0}
                    offset={0}
                />
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Dashboard
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full calendar-wrapper">
                        <CalendarWrapper uid={user.uid} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(Dashboard, "Home", true), "member");
