import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";

initFirebase();
const db = firebase.firestore();

function CreateSession() {
    return (
        <>
            <div>Create Tutoring Session</div>
        </>
    );
}

export default withAuth(
    withFrame(CreateSession, "Create Session"),
    "moderator"
);
