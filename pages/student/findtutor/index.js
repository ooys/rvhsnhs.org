import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

initFirebase();
const auth = firebase.auth();

function StudentRouter() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    if (loading) {
        return <>Fetching data...</>;
    }
    if (error != undefined || user == undefined) {
        router.push("/login/student");
        return <></>;
    } else {
        router.push("/student/findtutor/" + user.uid);
        return <>Routing to form...</>;
    }
}

export default withAuth(StudentRouter, "student");
