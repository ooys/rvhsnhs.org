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

function badgeModal(info) {}

function badge(name) {
    let src = "";
    let desc = "";
    let title = "";
    switch (name) {
        case "officer":
            title = "Officer";
            desc = "Is an National Honor Society Officer.";
            src = "/images/badges/officer.svg";
            break;
        case "beta_tester":
            title = "Beta Tester";
            desc =
                "Helped test the National Honor Society Website in its beta stages.";
            src = "/images/badges/beta_tester.svg";
            break;
        case "bug_hunter":
            title = "Bug Hunter";
            desc = "Found and reported a significant bug.";
            src = "/images/badges/bug_hunter.svg";
            break;
        case "overachiever":
            title = "Overachiever";
            desc = "Log in during a school break.";
            src = "/images/badges/overachiever.svg";
            break;
        case "volunteer_of_the_month":
            title = '"Volunteer of the Month" Award';
            desc = "Selected as Volunteer of the Month by the NHS committee.";
            src = "/images/badges/medal.svg";
            break;
    }
    return (
        <a className="column is-2 is-offset-1 badge-wrapper" title={title}>
            <img className="badge" src={src} alt={title}></img>
        </a>
    );
}

function HourBadge({ hours }) {
    let src = "";
    let desc = "";
    let title = "";
    let color = "";
    if (hours >= 80) {
        color = "dark_purple";
        desc =
            "Very few members will ever be awarded the Master badge, as members in this tier come close to doubling the official amount of hours required by NHS. Volunteers in this tier dedicate a significant portion of their time to volunteering and for this reason they are awarded the highest tier badge for their efforts.";
        if (hours >= 95) {
            title = "Master Volunteer IV";
            src = "/images/badges/rank4.svg";
        } else if (hours >= 90) {
            title = "Master Volunteer III";
            src = "/images/badges/rank3.svg";
        } else if (hours >= 85) {
            title = "Master Volunteer II";
            src = "/images/badges/rank2.svg";
        } else {
            title = "Master Volunteer I";
            src = "/images/badges/rank1.svg";
        }
    } else if (hours >= 60) {
        color = "light_purple";
        desc =
            "Members in the Expert tier have gone outside the official requirements of NHS and begun volunteering for the greater good of the community. At this tier, members have surpassed significant contributions to their community and have embraced what it truly means to be an NHS volunteer.";
        if (hours >= 75) {
            title = "Expert Volunteer IV";
            src = "/images/badges/rank4.svg";
        } else if (hours >= 70) {
            title = "Expert Volunteer III";
            src = "/images/badges/rank3.svg";
        } else if (hours >= 65) {
            title = "Expert Volunteer II";
            src = "/images/badges/rank2.svg";
        } else {
            title = "Expert Volunteer I";
            src = "/images/badges/rank1.svg";
        }
    } else if (hours >= 40) {
        color = "gold";
        desc =
            "Members in the advanced tier are more often than not senior members of NHS. At this tier, members have made a significant contribution to the community through their volunteer work and continue to excel in their volunteer pursuits. These members are awarded a gold status for their hard work.";
        if (hours >= 55) {
            title = "Advanced Volunteer IV";
            src = "/images/badges/rank4.svg";
        } else if (hours >= 50) {
            title = "Advanced Volunteer III";
            src = "/images/badges/rank3.svg";
        } else if (hours >= 45) {
            title = "Advanced Volunteer II";
            src = "/images/badges/rank2.svg";
        } else {
            title = "Advanced Volunteer I";
            src = "/images/badges/rank1.svg";
        }
    } else if (hours >= 20) {
        color = "silver";
        desc =
            "Members in this tier have begun to spread their wings as a National Honor Society volunteer. Seasoned volunteers are beginning to make a significant impact on the community, devoting a significant portion of their time to serving as an NHS member.";
        if (hours >= 35) {
            title = "Seasoned Volunteer IV";
            src = "/images/badges/rank4.svg";
        } else if (hours >= 30) {
            title = "Seasoned Volunteer III";
            src = "/images/badges/rank3.svg";
        } else if (hours >= 25) {
            title = "Seasoned Volunteer II";
            src = "/images/badges/rank2.svg";
        } else {
            title = "Seasoned Volunteer I";
            src = "/images/badges/rank1.svg";
        }
    } else {
        color = "bronze";
        desc =
            "Members in the novice tier are often newer members or those who have yet to engage in significant volunteer work. While it may not be the most visually appealing badge, it’s a starting point for our volunteering journey.";
        if (hours >= 15) {
            title = "Novice Volunteer IV";
            src = "/images/badges/rank4.svg";
        } else if (hours >= 10) {
            title = "Novice Volunteer III";
            src = "/images/badges/rank3.svg";
        } else if (hours >= 5) {
            title = "Novice Volunteer II";
            src = "/images/badges/rank2.svg";
        } else {
            title = "Novice Volunteer I";
            src = "/images/badges/rank1.svg";
        }
    }
    return (
        <a className="column is-2 is-offset-1 badge-wrapper" title={title}>
            <img className={"badge " + color} src={src} alt={title}></img>
        </a>
    );
}

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
                            <div className="profile-badges-title">Badges</div>
                            <hr className="profile-line small-margins"></hr>
                            <div className="columns is-mobile is-multiline profile-badges">
                                {data.badges.map((name) => {
                                    return badge(name);
                                })}
                                <HourBadge
                                    hours={
                                        data.hours.tutoring +
                                        data.hours.volunteering
                                    }
                                />
                            </div>
                            <br></br>
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
