import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import swal from "sweetalert";
import sendEmail from "/components/email/sendEmail.js";

initFirebase();
const db = firebase.firestore();
const auth = firebase.auth();

function TutorSelect() {
    const router = useRouter();
    const tuteeRef = db.collection("tutee-requests");
    const [snapshot, loading, error] = useCollectionOnce(tuteeRef);
    const [user, loading2, error2] = useAuthState(auth);
    const [verify, setVerify] = useState("false");
    const [filter, setFilter] = useState({
        format: [],
        termLength: [],
        subject: [],
        availability: [],
    });

    const formatFilter = ["Virtual", "In Person"];
    const termLengthFilter = ["Short Term", "Long Term"];
    const subjectFilter = [
        "English",
        "Social Sciences & History",
        "Mathematics",
        "Science",
        "World Languages",
        "Arts",
        "Music",
    ];
    const availabilityFilter = [
        "Block 1",
        "Block 2",
        "Block 3",
        "Block 4",
        "Block 5",
        "Block 6",
        "Block 7",
        "Block 8",
        "Monday Morning",
        "Monday Afternoon",
        "Tuesday Morning",
        "Tuesday Afternoon",
        "Wednesday Morning",
        "Wednesday Afternoon",
        "Thursday Morning",
        "Thursday Afternoon",
        "Friday Morning",
        "Friday Afternoon",
    ];

    const allFilters = [
        formatFilter,
        termLengthFilter,
        subjectFilter,
        availabilityFilter,
    ];

    function acceptTutee(tuteeData, docId, uid) {
        const tuteeRef2 = db.collection("tutee-requests").doc(docId);
        const tutorRef = db.collection("tutor-requests").doc(docId);
        const userRef = db.collection("users").doc(uid);
        userRef.get().then((userDoc) => {
            const userData = userDoc.data();
            let pairPending = 0;
            let pairActive = 0;
            let pairCompleted = 0;
            Object.keys(userData.tutoring).map((keyName) => {
                if (
                    userData.tutoring[keyName].status.toString() === "requested"
                ) {
                    pairPending++;
                } else if (
                    userData.tutoring[keyName].status.toString() === "active"
                ) {
                    pairActive++;
                } else if (
                    userData.tutoring[keyName].status.toString() === "completed"
                ) {
                    pairCompleted++;
                }
            });
            tuteeRef2.get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                    tutorRef
                        .set({
                            tutee: tuteeData.tutee,
                            availability: tuteeData.availability,
                            parent: tuteeData.parent,
                            termlength: tuteeData.termlength,
                            format: tuteeData.format,
                            comments: tuteeData.comments,
                            timestamp: {
                                tutee: tuteeData.timestamp,
                                tutor: new firebase.firestore.Timestamp.now(),
                            },
                            tutor: {
                                uid: uid,
                                first: userData.first,
                                last: userData.last,
                                email: userData.email,
                                grade: userData.grade,
                            },
                            tutorstatus: {
                                pending: pairPending,
                                active: pairActive,
                                completed: pairCompleted,
                                completedhours: userData.hours.tutoring,
                            },
                        })
                        .then(() => {
                            userRef
                                .update({
                                    [`tutoring.${docId}.status`]: "requested",
                                    [`tutoring.${docId}.first`]:
                                        tuteeData.tutee.first,
                                    [`tutoring.${docId}.last`]:
                                        tuteeData.tutee.last,
                                    [`tutoring.${docId}.email`]:
                                        tuteeData.tutee.email,
                                    [`tutoring.${docId}.school`]:
                                        tuteeData.tutee.school.name,
                                    [`tutoring.${docId}.grade`]:
                                        tuteeData.tutee.school.grade,
                                    [`tutoring.${docId}.subject`]:
                                        tuteeData.tutee.school.subject,
                                    [`tutoring.${docId}.course`]:
                                        tuteeData.tutee.school.course,
                                    [`tutoring.${docId}.termlength`]:
                                        tuteeData.termlength,
                                    [`tutoring.${docId}.format`]:
                                        tuteeData.format,
                                    [`tutoring.${docId}.sessions`]: [],
                                })
                                .then(() => {
                                    tuteeRef2.delete().then(() => {
                                        const emailHtml = `We have received your pairing request for tutee <b>${tuteeData.tutee.first}</b> <b>${tuteeData.tutee.last}</b>. You will receive a follow-up email once the pairing has been approved.`;
                                        sendEmail(
                                            userData.email,
                                            "Receipt: Pairing Request for " +
                                                tuteeData.tutee.first,
                                            "Received!",
                                            emailHtml
                                        ).then(() => {
                                            swal(
                                                "Success!",
                                                "Your tutor pairing request has been submitted.",
                                                "success"
                                            ).then(() => {
                                                router.push("/member/tutoring");
                                            });
                                        });
                                    });
                                });
                        });
                } else {
                    swal(
                        "Oops!",
                        "Looks like we can't find the tutee anymore. Refreshing page...",
                        "warning"
                    ).then(() => {
                        router.reload(window.location.pathname);
                    });
                }
            });
        });
    }

    function TuteeApproveModal({ tuteeData, docId, uid }) {
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
                                    acceptTutee(tuteeData, docId, uid);
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

    function toggleFilter(value, type) {
        if (value.length > 0) {
            if (filter[type].indexOf(value) == -1) {
                // update entire filter by adding filter[type] with value
                filter[type].push(value);
                setFilter({ ...filter });
            } else {
                //remove value from filter[type]
                filter[type].splice(filter[type].indexOf(value), 1);
                setFilter({ ...filter });
            }
        }
    }

    function FilterTag({ name, type }) {
        if (filter[type].indexOf(name) > -1) {
            return (
                <a
                    className="tag filter-tag tag-is-selected"
                    onClick={() => {
                        toggleFilter(name, type);
                    }}>
                    {name}
                </a>
            );
        } else {
            return (
                <a
                    className="tag filter-tag"
                    onClick={() => {
                        toggleFilter(name, type);
                    }}>
                    {name}
                </a>
            );
        }
    }

    function TuteeFilter() {
        return (
            <div className="columns is-gapless is-multiline tutee-filter">
                <div className="column is-full filter-title">Filter</div>
                <div className="column is-full filter-element">
                    Format
                    {formatFilter.map((format, index) => {
                        return (
                            <>
                                <FilterTag
                                    key={index}
                                    name={format}
                                    type={"format"}
                                />
                            </>
                        );
                    })}
                </div>
                <div className="column is-full filter-element">
                    Term Length
                    {termLengthFilter.map((format, index) => {
                        return (
                            <>
                                <FilterTag
                                    key={index}
                                    name={format}
                                    type={"termLength"}
                                />
                            </>
                        );
                    })}
                </div>
                <div className="column is-full filter-element">
                    Subject
                    {subjectFilter.map((format, index) => {
                        return (
                            <>
                                <FilterTag
                                    key={index}
                                    name={format}
                                    type={"subject"}
                                />
                            </>
                        );
                    })}
                </div>
                <div className="column is-full filter-element">
                    Availability
                    {availabilityFilter.map((format, index) => {
                        return (
                            <>
                                <FilterTag
                                    key={index}
                                    name={format}
                                    type={"availability"}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        );
    }

    // OR gate for all filters within type
    // AND gate for all filter types
    function isFiltered(tuteeData) {
        let canReturn2 = true;
        Object.keys(filter).forEach((key) => {
            if (filter[key].length > 0) {
                let canReturn = false;
                filter[key].forEach((element) => {
                    if (key.toString() === "format") {
                        if (
                            tuteeData.format.toString() === element ||
                            tuteeData.format.toString() === "No Preference"
                        ) {
                            canReturn = true;
                        }
                    }
                    if (key.toString() === "termLength") {
                        if (tuteeData.termlength.toString() === element) {
                            canReturn = true;
                        }
                    }
                    if (key.toString() === "subject") {
                        if (
                            tuteeData.tutee.school.subject.toString() ===
                            element
                        ) {
                            canReturn = true;
                        }
                    }
                    if (key.toString() === "availability") {
                        if (
                            tuteeData.availability.studyhall.toString() ===
                                element ||
                            tuteeData.availability.exterior.some(
                                (time) => time.toString() === element
                            )
                        ) {
                            canReturn = true;
                        }
                    }
                });
                if (!canReturn) {
                    canReturn2 = false;
                }
            }
        });
        return canReturn2;
    }

    function DisplayTutees({ tutees }) {
        return (
            <div className="columns is-multiline tutee-list">
                {tutees.docs.map((tutee, index) => {
                    if (tutee.id != "master") {
                        let tuteeData = tutee.data();
                        if (isFiltered(tuteeData)) {
                            return (
                                <>
                                    <TuteeApproveModal
                                        tuteeData={tuteeData}
                                        docId={tutee.id}
                                        uid={user.uid}
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
                                                            tuteeData.tutee
                                                                .last}
                                                    </div>
                                                    <div className="column is-half tutee-card-body">
                                                        <div className="columns tutee-card-left is-multiline is-gapless">
                                                            <div className="column is-full tutee-card-left-text">
                                                                {
                                                                    tuteeData
                                                                        .tutee
                                                                        .school
                                                                        .name
                                                                }
                                                            </div>
                                                            <div className="column is-full tutee-card-left-text">
                                                                {"Grade " +
                                                                    tuteeData
                                                                        .tutee
                                                                        .school
                                                                        .grade}
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
                                                                        tuteeData
                                                                            .tutee
                                                                            .school
                                                                            .subject
                                                                    }
                                                                </b>
                                                            </div>
                                                            <div className="column is-full tutee-card-left-text">
                                                                {
                                                                    tuteeData
                                                                        .tutee
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
                                                            <a
                                                                className="tag tutee-card-tag"
                                                                onClick={() => {
                                                                    toggleFilter(
                                                                        tuteeData
                                                                            .availability
                                                                            .studyhall,
                                                                        "availability"
                                                                    );
                                                                }}>
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
                                                                    <a
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() => {
                                                                            toggleFilter(
                                                                                time,
                                                                                "availability"
                                                                            );
                                                                        }}
                                                                        className="tag tutee-card-tag">
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
                                                                <br></br>
                                                                Comments:{" "}
                                                                {
                                                                    tuteeData.comments
                                                                }
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
                                                                setVerify(
                                                                    tutee.id
                                                                );
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
                        } else {
                            return null;
                        }
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
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Unpaired Tutees
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <TuteeFilter />
                    </div>
                    <div className="column is-full">
                        <DisplayTutees tutees={snapshot} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(TutorSelect, "Find Tutee"), "member");
