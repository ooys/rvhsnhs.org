import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function Member() {
    return (
        <div className="member">
            <Navbar />
            <div className="page-wrapper" id="member"></div>
            <Footer />
        </div>
    );
}

export default withAuth(Member, "member");
