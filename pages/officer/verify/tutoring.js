import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer.js";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import withAuth from "/components/auth/withAuth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import sendEmail from "/components/email/sendEmail.js";
import swal from "sweetalert";

initFirebase();
const db = firebase.firestore();

function Hours() {
    const router = useRouter();
    const caseRef = db.collection("tutor-requests");
    const [snapshot, loading, error] = useCollectionOnce(caseRef);
    let emailHtml = "";
    let email = "";

    function DisplayPair({ pairs }) {
        const subjects = [
            "English",
            "Social Sciences & History",
            "Mathematics",
            "Science",
            "World Languages",
            "Arts",
            "Music",
        ];
        return (
            <div className="columns is-multiline tutee-list">
                {pairs.docs.map((pair, index) => {
                    if (pair.id != "master") {
                        let pairData = pair.data();
                        return (
                            <>
                                {/* <TuteeApproveModal
                                    pairData={pairData}
                                    docId={tutee.id}
                                    uid={user.uid}
                                /> */}
                                <div
                                    key={index}
                                    className="column is-full tutee-card-wrapper">
                                    <div className="columns is-multiline tutee-card-spacer">
                                        <div className="column is-full field-title">
                                            Tutee Information
                                            <hr className="pair-verify-field-title-hr"></hr>
                                        </div>
                                        <div className="column is-full tutee-card-info">
                                            <div className="columns is-multiline is-mobile tutee-card is-gapless">
                                                <div className="column is-full tutee-card-title">
                                                    {pairData.tutee.first +
                                                        " " +
                                                        pairData.tutee.last}
                                                </div>
                                                <div className="column is-half tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-left-text">
                                                            {
                                                                pairData.tutee
                                                                    .school.name
                                                            }
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {"Grade " +
                                                                pairData.tutee
                                                                    .school
                                                                    .grade}
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {
                                                                pairData.termlength
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column is-half tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-left-text">
                                                            <b>
                                                                {
                                                                    pairData
                                                                        .tutee
                                                                        .school
                                                                        .subject
                                                                }
                                                            </b>
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {
                                                                pairData.tutee
                                                                    .school
                                                                    .course
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    Availabilities:{" "}
                                                    {pairData.availability.studyhall.toString() ===
                                                    "None" ? null : (
                                                        <a className="tag tutee-card-tag">
                                                            {
                                                                pairData
                                                                    .availability
                                                                    .studyhall
                                                            }
                                                        </a>
                                                    )}
                                                    {pairData.availability.exterior.map(
                                                        (time, index) => {
                                                            return (
                                                                <a
                                                                    key={index}
                                                                    className="tag tutee-card-tag">
                                                                    {time}
                                                                </a>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    {pairData.comments.toString() ===
                                                    "" ? null : (
                                                        <>
                                                            <br></br>Comments:{" "}
                                                            {pairData.comments}
                                                        </>
                                                    )}
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    <br></br>
                                                    Student Email:{" "}
                                                    {pairData.tutee.email}
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    Teacher:{" "}
                                                    {
                                                        pairData.tutee.school
                                                            .teacher.first
                                                    }{" "}
                                                    {
                                                        pairData.tutee.school
                                                            .teacher.last
                                                    }
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    Teacher Email:{" "}
                                                    {
                                                        pairData.tutee.school
                                                            .teacher.email
                                                    }
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    Parent:{" "}
                                                    {pairData.parent.first}{" "}
                                                    {pairData.parent.last}
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    Parent Email:{" "}
                                                    {pairData.parent.email}
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    Counselor Email:{" "}
                                                    {
                                                        pairData.tutee.school
                                                            .counseloremail
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-full field-title">
                                            Tutor Information
                                            <hr className="pair-verify-field-title-hr"></hr>
                                        </div>
                                        <div className="column is-full tutee-card-info">
                                            <div className="columns is-multiline is-mobile tutee-card is-gapless">
                                                <div className="column is-full tutee-card-title">
                                                    {pairData.tutor.first +
                                                        " " +
                                                        pairData.tutor.last}
                                                </div>
                                                <div className="column is-full tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-left-text">
                                                            Riverside High
                                                            School
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {"Grade " +
                                                                pairData.tutor
                                                                    .grade}
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {"Student Email " +
                                                                pairData.tutor
                                                                    .email}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column is-full tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-title">
                                                            <br></br>
                                                            Tutoring History
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            Pending:{" "}
                                                            {
                                                                pairData
                                                                    .tutorstatus
                                                                    .pending
                                                            }
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            Ongoing:{" "}
                                                            {
                                                                pairData
                                                                    .tutorstatus
                                                                    .active
                                                            }
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            Completed:{" "}
                                                            {
                                                                pairData
                                                                    .tutorstatus
                                                                    .completed
                                                            }
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            Completed Hours:{" "}
                                                            {
                                                                pairData
                                                                    .tutorstatus
                                                                    .completedhours
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-full tutee-card-action">
                                            <div className="columns is-centered is-vcentered is-mobile is-multiline tutee-card-action-wrapper">
                                                <div className="column tutee-card-button-wrapper">
                                                    <a
                                                        className="pair-card-approve"
                                                        onClick={() => {
                                                            console.log(
                                                                pair.id
                                                            );
                                                        }}>
                                                        Approve
                                                        <span className="hero-button-icon">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faArrowRight
                                                                }></FontAwesomeIcon>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="column tutee-card-button-wrapper">
                                                    <a
                                                        className="pair-card-reject"
                                                        onClick={() => {
                                                            setVerify(
                                                                console.log(
                                                                    pair.id
                                                                )
                                                            );
                                                        }}>
                                                        Reject
                                                        <span className="hero-button-icon">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faArrowRight
                                                                }></FontAwesomeIcon>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    }
                })}
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || snapshot == undefined) {
        return <div>Error: {error}</div>;
    } else {
        console.log(snapshot.docs[0].id);
        return (
            <>
                <Navbar user="officer" />
                <div className="page-wrapper" id="verify-tutoring">
                    <DisplayPair pairs={snapshot} />
                </div>
                <Footer />
            </>
        );
    }
}

export default withAuth(Hours, "moderator");
