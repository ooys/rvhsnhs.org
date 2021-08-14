import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

initFirebase();
const auth = firebase.auth();

function OfficerRouter() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    if (loading) {
        return <>Fetching data...</>;
    }
    if (error != undefined || user == undefined) {
        router.push("/");
        return <>Unauthorized, back to login.</>;
    } else {
        router.push("/officer/" + user.uid);
        return <>Routing to dashboard...</>;
    }
}

export default withAuth(OfficerRouter, "officer");
