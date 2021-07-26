import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

initFirebase();
const db = firebase.firestore();

function PlanSessions() {
    const router = useRouter();
    const { pid } = router.query;
    const userRef = db.collection("tutor-pairs").doc(pid);
    const [data, loading, error] = useDocumentDataOnce(userRef);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || data == undefined) {
        return null;
    } else {
        return (
            <>
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Plan Sessions
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">test</div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(PlanSessions, "Plan Sessions"), "member");
