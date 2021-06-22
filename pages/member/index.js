import withAuth from "/components/auth/withAuth.js";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function News() {
    const [user, loading, error] = useAuthState(auth);
    return <>News/</>;
}

export default withAuth(News);
