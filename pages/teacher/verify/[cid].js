import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import { useRouter } from "next/router";
import sendEmail from "/components/email/sendEmail.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import swal from "sweetalert";

initFirebase();
const db = firebase.firestore();

function EmailHours() {
    const router = useRouter();
    const { cid } = router.query;
    const caseRef = db.collection("hours-emailed").doc(cid);
    const [value, loading, error] = useDocumentDataOnce(caseRef);

    function verifyEmail(value) {
        const verifyRef = db.collection("hours-verified");
        const userRef = db.collection("users").doc(value.uid);
        let doc = "";
        let email = "";
        let hours = 0;
        verifyRef
            .add({
                value,
                time_verified: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function (docRef) {
                doc = docRef;
            })
            .then(() => {
                userRef
                    .get()
                    .then((doc) => {
                        hours = parseFloat(doc.data().hours.volunteering);
                        email = doc.data().email;
                    })
                    .then(() => {
                        userRef.update({
                            [`hours.volunteering`]:
                                hours + parseFloat(value.hours),
                            [`opportunities.${value.eid}.status`]: "verified",
                            [`opportunities.${value.eid}.case`]: doc.id,
                        });
                    })
                    .then(() => {
                        caseRef.delete();
                    })
                    .then(() => {
                        let emailHtml = `Your volunteer hours for ${value.event_title}, ${value.task_title} has been approved. Congratulations on being an upstanding volunteer, we appreciate your dedication to NHS!.`;
                        sendEmail(
                            email,
                            "Verified: " + value.event_title,
                            "Approved!",
                            emailHtml
                        );
                    })
                    .then(() => {
                        swal(
                            "Success!",
                            "Verification has been accepted.",
                            "success"
                        );
                        router.reload(window.location.pathname);
                    });
            });
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined) {
        return <div>Loading... {error}</div>;
    } else if (value == undefined) {
        router.push("/");
        return <div>Case does not exist.</div>;
    } else {
        return (
            <div id="hours-emailed">
                <Navbar />
                <div className="page-wrapper" id="hours-emailed-wrapper">
                    <div className="verification-wrapper columns is-multiline">
                        <div className="verificiation-title column is-full">
                            Verify Hours
                        </div>
                        <div className="verification-details column is-6 is-offset-3">
                            <div className="verification-event-title">
                                <b>
                                    Student Name: {value.first}, {value.last}
                                </b>
                            </div>
                            <div className="verification-event-title">
                                <b>Hours Claimed: {value.hours}</b>
                            </div>
                            <br></br>
                            <div className="verification-event-title">
                                <b>Event Title: {value.event_title}</b>
                            </div>
                            <div className="verification-event-title">
                                Task Title: {value.task_title}
                            </div>
                            <div className="verification-event-title">
                                Task Description: {value.task_description}
                            </div>
                        </div>
                        <div className="verification-statement column is-full">
                            I am a certified organizer of the event above, and I
                            acknowledge the student's participation in this
                            event.
                        </div>
                        <div className="verification-button-wrapper column is-full">
                            <a
                                className="verification-button button is-success"
                                onClick={() => {
                                    verifyEmail(value);
                                }}>
                                Verify Student
                            </a>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default withAuth(EmailHours, "faculty");
