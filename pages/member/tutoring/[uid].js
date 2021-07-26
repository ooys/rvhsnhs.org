import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import withFrame from "/components/Frame.js";

initFirebase();
const db = firebase.firestore();

function TutorHome() {
    const router = useRouter();
    const { uid } = router.query;
    const userRef = db.collection("users").doc(uid);
    const [data, loading, error] = useDocumentDataOnce(userRef);

    function DisplayTutees({ tutees }) {
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
                                        "/member/tutoring/pair/" + keyId
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
                                                        {tuteeData.termlength}
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
                                                            {tuteeData.subject}
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
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || data == undefined) {
        return <div></div>;
    } else {
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    {/* <div className="column is-full find-tutee-button-wrapper">
                        <a
                            className="find-tutee-button"
                            onClick={() => {
                                router.push("/member/tutoring/findtutee");
                            }}>
                            Find Tutee
                        </a>
                    </div> */}
                    <div className="column is-full tutor-list-title">
                        Your Tutees
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <DisplayTutees tutees={data.tutoring} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(TutorHome, "Dashboard"), "member");
