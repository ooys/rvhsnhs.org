import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import withAuth from "/components/auth/withAuth.js";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

initFirebase();
const db = firebase.firestore();
const auth = firebase.auth();

function TutorSelect() {
    const router = useRouter();
    const tuteeRef = db.collection("tutee-requests");
    const [snapshot, loading, error] = useCollectionOnce(tuteeRef);
    const [user, loading2, error2] = useAuthState(auth);
    const [verify, setVerify] = useState("false");

    function TuteeApproveModal({ tuteeData, docId }) {
        if (verify == docId) {
            return (
                <div className={"modal is-active"} id="tutee-approve-modal">
                    <div
                        className="modal-background"
                        onClick={() => {
                            setVerify("false");
                        }}></div>
                    <div className="modal-content tutee-approve-modal-content columns is-multiline">
                        <div className="tutee-approve-modal-title column is-full">
                            Verify Tutee Information
                            <hr className="tutee-approve-modal-line"></hr>
                        </div>

                        <div className="columns is-multiline is-mobile tutee-modal is-gapless">
                            <div className="column is-full tutee-card-title">
                                {tuteeData.tutee.first +
                                    " " +
                                    tuteeData.tutee.last}
                            </div>
                            <div className="column is-half tutee-card-body">
                                <div className="columns tutee-card-left is-multiline is-gapless">
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.tutee.school.name}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {"Grade " +
                                            tuteeData.tutee.school.grade}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.termlength}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-half tutee-card-body">
                                <div className="columns tutee-card-left is-multiline is-gapless">
                                    <div className="column is-full tutee-card-left-text">
                                        <b>{tuteeData.tutee.school.subject}</b>
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.tutee.school.course}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-full tutee-card-tags">
                                Availabilities:{" "}
                                {tuteeData.availability.studyhall.toString() ===
                                "None" ? null : (
                                    <a className="tag tutee-card-tag">
                                        {tuteeData.availability.studyhall}
                                    </a>
                                )}
                                {tuteeData.availability.exterior.map(
                                    (time, index) => {
                                        return (
                                            <a className="tag tutee-card-tag">
                                                {time}
                                            </a>
                                        );
                                    }
                                )}
                            </div>
                            <div className="column is-full tutee-card-tags">
                                {tuteeData.comments.toString() === "" ? null : (
                                    <>
                                        <br></br>Comments: {tuteeData.comments}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="warning-text">
                            Please double check all fields before submitting a
                            pairing request. Once approved by Riverside NHS, you
                            are responsible for scheduling and providing
                            tutoring service for this respective student.
                        </div>
                        <div className="tutee-approve-modal-actions">
                            <a
                                className="tutee-modal-accept"
                                onClick={() => {
                                    console.log("Accepted" + docId);
                                }}>
                                Submit
                                <span className="hero-button-icon">
                                    <FontAwesomeIcon
                                        icon={faArrowRight}></FontAwesomeIcon>
                                </span>
                            </a>
                            <a
                                className="tutee-modal-cancel"
                                onClick={() => {
                                    setVerify("false");
                                }}>
                                Cancel
                                <span className="hero-button-icon">
                                    <FontAwesomeIcon
                                        icon={faArrowRight}></FontAwesomeIcon>
                                </span>
                            </a>
                        </div>
                        <br></br>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => {
                            setVerify("false");
                        }}></button>
                </div>
            );
        } else {
            return null;
        }
    }

    function DisplayTutees({ tutees }) {
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
                {tutees.docs.map((tutee, index) => {
                    if (tutee.id != "master") {
                        let tuteeData = tutee.data();
                        return (
                            <>
                                <TuteeApproveModal
                                    tuteeData={tuteeData}
                                    docId={tutee.id}
                                />
                                <div
                                    key={index}
                                    className="column is-full tutee-card-wrapper">
                                    <div className="columns tutee-card-spacer">
                                        <div className="column is-9 tutee-card-info">
                                            <div className="columns is-multiline is-mobile tutee-card is-gapless">
                                                <div className="column is-full tutee-card-title">
                                                    {tuteeData.tutee.first +
                                                        " " +
                                                        tuteeData.tutee.last}
                                                </div>
                                                <div className="column is-half tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-left-text">
                                                            {
                                                                tuteeData.tutee
                                                                    .school.name
                                                            }
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {"Grade " +
                                                                tuteeData.tutee
                                                                    .school
                                                                    .grade}
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {
                                                                tuteeData.termlength
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column is-half tutee-card-body">
                                                    <div className="columns tutee-card-left is-multiline is-gapless">
                                                        <div className="column is-full tutee-card-left-text">
                                                            <b>
                                                                {
                                                                    tuteeData
                                                                        .tutee
                                                                        .school
                                                                        .subject
                                                                }
                                                            </b>
                                                        </div>
                                                        <div className="column is-full tutee-card-left-text">
                                                            {
                                                                tuteeData.tutee
                                                                    .school
                                                                    .course
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    Availabilities:{" "}
                                                    {tuteeData.availability.studyhall.toString() ===
                                                    "None" ? null : (
                                                        <a className="tag tutee-card-tag">
                                                            {
                                                                tuteeData
                                                                    .availability
                                                                    .studyhall
                                                            }
                                                        </a>
                                                    )}
                                                    {tuteeData.availability.exterior.map(
                                                        (time, index) => {
                                                            return (
                                                                <a className="tag tutee-card-tag">
                                                                    {time}
                                                                </a>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <div className="column is-full tutee-card-tags">
                                                    {tuteeData.comments.toString() ===
                                                    "" ? null : (
                                                        <>
                                                            <br></br>Comments:{" "}
                                                            {tuteeData.comments}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-3 tutee-card-action">
                                            <div className="columns is-centered is-vcentered is-multiline tutee-card-action-wrapper">
                                                <div className="column tutee-card-button-wrapper">
                                                    <a
                                                        className="tutee-card-accept"
                                                        onClick={() => {
                                                            setVerify(tutee.id);
                                                        }}>
                                                        Tutor
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

    if (loading || loading2) {
        return <div>Loading...</div>;
    }
    if (
        error != undefined ||
        error2 != undefined ||
        snapshot == undefined ||
        user == undefined
    ) {
        return <div></div>;
    } else {
        return (
            <>
                <Navbar user="member" />
                <div className="page-wrapper" id="find-tutee">
                    <DisplayTutees tutees={snapshot} />
                </div>
                <Footer />
            </>
        );
    }
}

export default withAuth(TutorSelect, "member");
