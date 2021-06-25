import withAuth from "/components/auth/withAuth.js";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

initFirebase();
const db = firebase.firestore();

function Profile() {
    const router = useRouter();
    const { uid } = router.query;
    const userRef = db.collection("users").doc(uid);
    const [data, loading, error] = useDocumentDataOnce(userRef);

    if (loading) {
        return <>Loading Events...</>;
    }
    if (error != undefined || data == undefined) {
        // console.log("error");
        return <div>Error!</div>;
    } else {
        console.log(data);
        return (
            <div id="profile">
                <Navbar user="member" />
                <div className="page-wrapper">
                    <br></br>
                    <span className="profile-title">User Profile</span>
                    <div className="columns profile-full">
                        <div
                            className="column is-4 profile-info"
                            id="profile-small">
                            <div className="profile-picture-wrapper">
                                <img
                                    className="profile-picture"
                                    src={data.profilePicture}
                                    alt={data.first}
                                />
                            </div>
                            <div className="profile-badges">Badges</div>
                            <hr className="profile-line small-margins"></hr>
                        </div>
                        <div
                            className="column is-8 profile-info"
                            id="profile-large">
                            <div className="profile-name">
                                {data.first.charAt(0).toUpperCase() +
                                    data.first.slice(1).toLowerCase()}{" "}
                                {data.last}
                            </div>
                            <div className="profile-role">
                                {data.role.charAt(0).toUpperCase() +
                                    data.role.slice(1) +
                                    ", Riverside National Honor Society"}
                            </div>
                            <div className="profile-year">SY 2021-2022</div>
                            <hr className="profile-line"></hr>
                            <div className="profile-hours">
                                <div className="profile-hours-title">
                                    Hours Summary
                                </div>
                                <table className="table is-bordered is-fullwidth profile-hours-table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Tutoring</td>
                                            <td>{data.hours.tutoring}</td>
                                        </tr>
                                        <tr>
                                            <td>Volunteering</td>
                                            <td>{data.hours.volunteering}</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td>
                                                {data.hours.tutoring +
                                                    data.hours.volunteering}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withAuth(Profile, "member");
