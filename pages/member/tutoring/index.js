import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import withAuth from "/components/auth/withAuth.js";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

initFirebase();
const db = firebase.firestore();

function TutorSelect() {
    const router = useRouter();
    const tuteeRef = db.collection("tutee-requests");
    const [snapshot, loading, error] = useCollectionOnce(tuteeRef);

    function TuteeCard(tutee) {
        return null;
    }

    function DisplayTutees({ tutees }) {
        const subjects = [
            "English",
            "Social Sciences & History",
            "Mathematics",
            "Science",
            "World Languages",
            "Arts",
            "Music",
        ];
        return (
            <div className="columns is-multiline tutee-list">
                {tutees.docs.map((tutee, index) => {
                    if (tutee.id != "init") {
                        let tuteeData = tutee.data();
                        return (
                            <div
                                key={index}
                                className="column is-full tutee-card-wrapper">
                                <div className="columns is-multiline is-mobile tutee-card is-gapless">
                                    <div className="column is-full tutee-card-title">
                                        {tuteeData.tutee.first +
                                            ", " +
                                            tuteeData.tutee.last}
                                    </div>
                                    <div className="column is-half tutee-card-body">
                                        <div className="columns tutee-card-left is-multiline is-gapless">
                                            <div className="column is-full tutee-card-left-text">
                                                {tuteeData.tutee.school.name}
                                            </div>
                                            <div className="column is-full tutee-card-left-text">
                                                {"Grade " +
                                                    tuteeData.tutee.school
                                                        .grade}
                                            </div>
                                            <div className="column is-full tutee-card-left-text">
                                                {tuteeData.termlength}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-half tutee-card-body">
                                        <div className="columns tutee-card-left is-multiline is-gapless">
                                            <div className="column is-full tutee-card-left-text">
                                                <b>
                                                    {
                                                        tuteeData.tutee.school
                                                            .subject
                                                    }
                                                </b>
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
                                            <span className="tag tutee-card-tag">
                                                {
                                                    tuteeData.availability
                                                        .studyhall
                                                }
                                            </span>
                                        )}
                                        {tuteeData.availability.exterior.map(
                                            (time, index) => {
                                                return (
                                                    <span className="tag tutee-card-tag">
                                                        {time}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error != undefined || snapshot == undefined) {
        return <div>Error: {error}</div>;
    } else {
        return (
            <>
                <Navbar user="member" />
                <div className="page-wrapper" id="tutor-index">
                    <DisplayTutees tutees={snapshot} />
                </div>
                <Footer />
            </>
        );
    }
}

export default withAuth(TutorSelect, "member");
