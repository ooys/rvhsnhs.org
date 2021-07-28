import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";

initFirebase();
const auth = firebase.auth();

function ModeratorHome() {
    return (
        <>
            <div>Moderator Home</div>
            <div>
                To register for tutoring, please login using a{" "}
                <b>Student Google Account provided by LCPS</b>{" "}
                <a
                    href="/login/student"
                    onClick={() => {
                        auth.signOut();
                    }}>
                    here
                </a>
                .
            </div>
        </>
    );
}

export default withAuth(
    withFrame(ModeratorHome, "Moderator Dashboard"),
    "moderator"
);
