import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import EventDetail from "/components/EventDetail.js";

initFirebase();
const db = firebase.firestore();
const auth = firebase.auth();

function opportunity() {
    const router = useRouter();
    const { eid } = router.query;
    const eventRef = db.collection("opportunities").doc(eid);
    const [data, loading, error] = useDocumentDataOnce(eventRef);
    const [user, loading2, error2] = useAuthState(auth);

    if (loading || loading2) {
        return <>Loading Event...</>;
    }
    if (
        error != undefined ||
        error2 != undefined ||
        data == undefined ||
        user == undefined
    ) {
        // console.log("error");
        return <div></div>;
    } else {
        return (
            <div className="opportunity">
                <Navbar user="member" />
                <div className="page-wrapper" id="opportunity">
                    <EventDetail data={data} uid={user.uid} eid={eid} />
                </div>
                <Footer />
            </div>
        );
    }
}

export default opportunity;
