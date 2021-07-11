import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer.js";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import withAuth from "/components/auth/withAuth.js";

initFirebase();
const db = firebase.firestore();

function Hours() {
    const router = useRouter();
    const caseRef = db.collection("hours-submitted");
    const [snapshot, loading, error] = useCollectionOnce(caseRef);

    function verifyCase(id, values, action) {
        if (action === "accept") {
            const verifyRef = db.collection("hours-verified");
            verifyRef
                .add({
                    values,
                    time_verified:
                        firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(function (docRef) {
                    const userRef = db.collection("users").doc(values.uid);
                    userRef.update({
                        [`opportunities.${values.eid}.status`]: "verified",
                        [`opportunities.${values.eid}.case`]: docRef.id,
                    });
                })
                .then(() => {
                    caseRef.doc(id).delete();
                })
                .then(() => {
                    window.alert("Verification accepted.");
                    router.reload(window.location.pathname);
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
