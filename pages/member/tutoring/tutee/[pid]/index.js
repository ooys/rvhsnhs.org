import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

initFirebase();
const db = firebase.firestore();

function TutorPair() {
    const router = useRouter();
    const { pid } = router.query;
    const userRef = db.collection("tutor-pairs").doc(pid);
    const [data, loading, error] = useDocumentDataOnce(userRef);

    function TuteeInfo({ tuteeData }) {
        return (
            <>
                <div className="columns tutee-card-spacer">
                    <div className="column is-full tutee-card-info">
                        <div className="columns is-multiline is-mobile tutee-card is-gapless">
                            <div className="column is-full tutee-card-title">
                                {tuteeData.tutee.first +
                                    " " +
                                    tuteeData.tutee.last}
                            </div>
                            <div className="column is-half tutee-card-body">
                                <div className="columns tutee-card-left is-multiline is-gapless">
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.tutee.school.name}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {"Grade " +
                                            tuteeData.tutee.school.grade}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.termlength}
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.format.toString() ===
                                        "No Preference"
                                            ? "In Person/Virtual"
                                            : tuteeData.format}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-half tutee-card-body">
                                <div className="columns tutee-card-left is-multiline is-gapless">
                                    <div className="column is-full tutee-card-left-text">
                                        <b>{tuteeData.tutee.school.subject}</b>
                                    </div>
                                    <div className="column is-full tutee-card-left-text">
                                        {tuteeData.tutee.school.course}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-full tutee-card-tags">
                                Availabilities:{" "}
                                {tuteeData.availability.studyhall.toString() ===
                                "None" ? null : (
                                    <a className="tag tutee-card-tag">
                                        {tuteeData.availability.studyhall}
                                    </a>
                                )}
                                {tuteeData.availability.exterior.map(
                                    (time, index) => {
                                        return (
                                            <a
                                                key={index}
                                                className="tag tutee-card-tag">
                                                {time}
                                            </a>
                                        );
                                    }
                                )}
                            </div>
                            <div className="column is-full tutee-card-tags">
                                {tuteeData.comments.toString() === "" ? null : (
                                    <>
                                        <br></br>
                                        Comments: {tuteeData.comments}
                                    </>
                                )}
                            </div>
                            <div className="column is-full tutee-card-tags">
                                <br></br>
                                Student Email:{" " + tuteeData.tutee.email}
                                <br></br>
                                Parent Email:{" " + tuteeData.parent.email}
                                <br></br>
                                Course Teacher Name:{" "}
                                {" " +
                                    tuteeData.tutee.school.teacher.first +
                                    " " +
                                    tuteeData.tutee.school.teacher.last}
                                <br></br>
                                Course Teacher Email:
                                {" " + tuteeData.tutee.school.teacher.email}
                                <br></br>
                                Counselor Email:
                                {" " + tuteeData.tutee.school.counseloremail}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

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
                        Tutee Information
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <TuteeInfo tuteeData={data} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(TutorPair, "Information"), "member");
