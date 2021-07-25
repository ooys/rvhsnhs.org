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
                <div className="columns columns-wrapper is-multiline">
                    <div className="column member-main-section is-full is-bg-off-white">
                        <div className="columns totals-column is-bg-off-white">
                            <div className="column total-column-1 is-bg-light is-10-mobile is-offset-1-mobile">
                                <div className="column total-column-1-mixed ">
                                    Total Mixed
                                </div>
                                <div className="columns mixed-hours-content is-multiline is-mobile">
                                    <img
                                        className="mixed-hours-icon"
                                        src="images\membertotals\volunteericon.svg"
                                    />
                                    <div className="column current-mixed-hours-progress">
                                        <div className="current-mixed-hours-number">
                                            8
                                        </div>
                                        <div className=" current-mixed-hours-bar">
                                            <img
                                                className="progress-bar-icon"
                                                src="images\membertotals\progressbar.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="column total-column-1-semester">
                                    This Semester
                                </div>
                            </div>
                            <div className="column total-column-2 is-bg-light is-10-mobile is-offset-1-mobile">
                                <div className="column total-column-1-mixed">
                                    Total Tutoring
                                </div>
                                <div className="columns mixed-hours-content is-multiline is-mobile">
                                    <img
                                        className="mixed-hours-icon"
                                        src="images\membertotals\classicon.svg"
                                    />
                                    <div className="column current-mixed-hours-progress">
                                        <div className="current-mixed-hours-number">
                                            90
                                        </div>
                                        <div className=" current-mixed-hours-bar">
                                            <img
                                                className="progress-bar-icon"
                                                src="images\membertotals\progressbar.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="column total-column-1-semester">
                                    This Semester
                                </div>
                            </div>
                            <div className="column total-column-3 is-bg-light is-10-mobile is-offset-1-mobile">
                                <div className="column total-column-1-mixed">
                                    Total Hours
                                </div>
                                <div className="columns mixed-hours-content is-multiline is-mobile">
                                    <img
                                        className="mixed-hours-icon"
                                        src="images\membertotals\timeicon.svg"
                                    />
                                    <div className="column current-mixed-hours-progress">
                                        <div className="current-mixed-hours-number">
                                            90
                                        </div>
                                    </div>
                                </div>
                                <div className="column total-column-1-semester">
                                    This Semester
                                </div>
                            </div>
                            <div className="column total-column-4 is-bg-light is-10-mobile is-offset-1-mobile">
                                <div className="column total-column-1-mixed">
                                    Days Left
                                </div>
                                <div className="columns mixed-hours-content is-multiline is-mobile">
                                    <img
                                        className="mixed-hours-icon"
                                        src="images\membertotals\calendaricon.svg"
                                    />
                                    <div className="column current-mixed-hours-progress">
                                        <div className="current-mixed-hours-number">
                                            90
                                        </div>
                                    </div>
                                </div>
                                <div className="column total-column-1-semester">
                                    This Semester
                                </div>
                            </div>
                        </div>
                        <div className="columns member-current-section is-10 is-offset-1 is-bg-off-white is-multiline ">
                            <div className="column member-graph-container is-three-fifths is-bg-light"></div>
                            <div className="column member-current-rank is-bg-light"></div>
                        </div>
                        <div className="column featured-opportunities-text-container is-10 is-offset-1 is-bg-off-white">
                            Featured Opportunities
                        </div>
                        <div className="columns featured-opportunities is-10 is-offset-1 is-bg-off-white">
                            <div className=" member-left-slideshow-arrow is-1">
                                <img
                                    src="/images/slideshow_arrows/left-arrow.svg"
                                    alt=""></img>
                            </div>
                            <div className="column featured-opportunity-1 is-bg-light is-10-mobile is-offset-1-mobile"></div>
                            <div className="column featured-opportunity-2 is-bg-light is-10-mobile is-offset-1-mobile"></div>
                            <div className="column featured-opportunity-3 is-bg-light is-10-mobile is-offset-1-mobile"></div>
                            <div className="column featured-opportunity-4 is-bg-light is-10-mobile is-offset-1-mobile"></div>
                            <div className=" member-right-slideshow-arrow is-1">
                                <img
                                    src="/images/slideshow_arrows/right-arrow.svg"
                                    alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
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
