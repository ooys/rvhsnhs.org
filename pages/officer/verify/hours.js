import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer.js";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import withAuth from "/components/auth/withAuth.js";
import sendEmail from "/components/email/sendEmail.js";
import swal from "sweetalert";

initFirebase();
const db = firebase.firestore();

function Hours() {
    const router = useRouter();
    const caseRef = db.collection("hours-submitted");
    const [snapshot, loading, error] = useCollectionOnce(caseRef);
    let emailHtml = "";
    let email = "";

    function verifyCase(id, values, action) {
        if (action === "accept") {
            const verifyRef = db.collection("hours-verified");
            const userRef = db.collection("users").doc(values.uid);
            let doc = "";
            let hours = 0;
            verifyRef
                .add({
                    values,
                    time_verified:
                        firebase.firestore.FieldValue.serverTimestamp(),
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
                                    hours + parseFloat(values.hours),
                                [`opportunities.${values.eid}.status`]:
                                    "verified",
                                [`opportunities.${values.eid}.case`]: doc.id,
                            });
                        })
                        .then(() => {
                            caseRef.doc(id).delete();
                        })
                        .then(() => {
                            emailHtml = `Your volunteer hours for <b>${values.event_title}</b>, <b>${values.task_title}</b>, has been approved. Congratulations on being an upstanding volunteer, we appreciate your dedication to NHS!`;
                            sendEmail(
                                email,
                                "Approved: " + values.event_title,
                                "Approved!",
                                emailHtml
                            );
                        })
                        .then(() => {
                            swal(
                                "Success!",
                                "Member hours verified.",
                                "success"
                            );
                            router.reload(window.location.pathname);
                        });
                });
        }
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
                <div className="page-wrapper" id="admin-group">
                    <div className="verificiation-title">
                        <p>
                            {snapshot.docs.length - 1} submission(s) pending
                            confirmation
                        </p>
                    </div>
                    <div className="verify-hours-table">
                        <table className="table is-bordered is-striped">
                            <thead>
                                <tr>
                                    <th>Member Name</th>
                                    <th>Event Title</th>
                                    <th>Task Title</th>
                                    <th>Task Description</th>
                                    <th>Hours Claimed</th>
                                    <th>Verification</th>
                                    <th>Timestamp</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {snapshot.docs.map((data, index) => {
                                    if (data.id != "init") {
                                        const values = data.data();
                                        console.log(values.timestamp);
                                        return (
                                            <tr
                                                className="verify-hours-table-row"
                                                key={index}>
                                                <td>
                                                    {values.last},{values.first}
                                                </td>
                                                <td>{values["event_title"]}</td>
                                                <td>{values["task_title"]}</td>
                                                <td>
                                                    {values["task_description"]}
                                                </td>
                                                <td>{values.hours}</td>
                                                <td>
                                                    <img
                                                        className="verification-image"
                                                        src={values.url}
                                                    />
                                                </td>
                                                <td>
                                                    {new Date(
                                                        values.timestamp
                                                            .seconds * 1000
                                                    ).toString()}
                                                </td>
                                                <td>
                                                    <div className="verification-action-wrapper">
                                                        <a
                                                            className="verification-action is-accept"
                                                            onClick={() => {
                                                                verifyCase(
                                                                    data.id,
                                                                    values,
                                                                    "accept"
                                                                );
                                                            }}>
                                                            Accept
                                                        </a>
                                                        <a
                                                            className="verification-action is-decline"
                                                            onClick={() => {
                                                                verifyCase(
                                                                    data.id,
                                                                    values,
                                                                    "decline"
                                                                );
                                                            }}>
                                                            Decline
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default withAuth(Hours, "moderator");
