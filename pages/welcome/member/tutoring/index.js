import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import withFrame from "/components/Frame.js";
import Empty from "/components/utils/Empty.js";
import dynamic from "next/dynamic";

const WelcomeTour = dynamic(() => import("/components/WelcomeTour"), {
    ssr: false,
});

initFirebase();
const db = firebase.firestore();
const auth = firebase.auth();

function TutorHome() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
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

    function DisplayTutees({ uid }) {
        if (userData[0] === uid) {
            let tutees = userData[1].tutoring;
            if (Object.keys(tutees).length === 0) {
                tutees = {
                    test: {
                        status: "active",
                        first: "Johnny",
                        last: "Appleseed",
                        email: "0000000@lcps.org",
                        school: "Riverside High School",
                        grade: "11",
                        termlength: "Short Term",
                        format: "Virtual",
                        subject: "Mathematics",
                        course: "AP Calculus AB",
                    },
                };
            }

            return (
                <div className="columns is-multiline tutee-list">
                    {Object.keys(tutees).map((keyId, index) => {
                        let tuteeData = tutees[keyId];
                        let cardStatus = "";
                        let isLocked = "";
                        let isHidden = "";
                        let statusState = "";
                        if (tuteeData.status === "requested") {
                            cardStatus = "status-is-pending";
                            isLocked = "tutee-card-is-locked";
                            isHidden = "tutee-card-chevron-is-hidden";
                            statusState = "Pending";
                        } else if (tuteeData.status === "active") {
                            cardStatus = "status-is-active";
                            statusState = "Active";
                        } else if (tuteeData.status === "completed") {
                            cardStatus = "status-is-completed";
                            statusState = "Completed";
                        }
                        return (
                            <>
                                <a
                                    key={index}
                                    className={
                                        "column is-full tutee-card-wrapper " +
                                        isLocked
                                    }
                                    onClick={() => {
                                        router.push(
                                            "/member/tutoring/tutee/" + keyId
                                        );
                                    }}>
                                    <div className="columns tutee-card-spacer">
                                        <div
                                            className={
                                                "column is-2 tutee-card-status " +
                                                cardStatus
                                            }>
                                            {statusState}
                                        </div>
                                        <div className="column is-7 tutee-card-info">
                                            <div className="columns is-multiline is-mobile tutee-card is-gapless">
                                                <div className="column is-full tutee-card-title">
                                                    {tuteeData.first +
                                                        " " +
                                                        tuteeData.last}
                                                </div>
                                                <div className="column is-half tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-left-text">
                                                            {tuteeData.school}
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {"Grade " +
                                                                tuteeData.grade}
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {
                                                                tuteeData.termlength
                                                            }
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {tuteeData.format.toString() ===
                                                            "No Preference"
                                                                ? "In Person/Virtual"
                                                                : tuteeData.format}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column is-half tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-left-text">
                                                            <b>
                                                                {
                                                                    tuteeData.subject
                                                                }
                                                            </b>
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {tuteeData.course}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-3 tutee-card-continue">
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                className={
                                                    "fa-2x " + isHidden
                                                }></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </a>
                            </>
                        );
                    })}
                </div>
            );
        } else {
            getUserData(uid);
            return null;
        }
    }

    const steps = [
        {
            selector: "",
            content: (
                <>
                    <div className="tour-header">Tutoring Dashboard</div>
                    <div className="tour-body">
                        You can find all your tutoring pairs here.<br></br>
                        <br></br>
                        For the active pairings, you can click to{" "}
                        <b>register for a tutoring session</b> and to view more
                        information.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
        {
            selector: ".tutee-list",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        This is a sample!<br></br>
                        <br></br>
                        These information are provided by the tutee upon their
                        registration.
                        <br></br>
                        <br></br>
                        Make sure you don't request for more tutees than you can
                        handle! Quality over quantity!
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
            stepInteraction: false,
        },
        {
            selector: "#toolbar-element-FindTutee",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Let's go <b>pair with a tutee</b>!<br></br>
                        <br></br>
                        Click "Find Tutee" to continue.
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
                        Your Tutees
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <DisplayTutees uid={user.uid} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(
    withFrame(TutorHome, "Tutoring Dashboard", true),
    "member"
);
