import withAuth from "/components/auth/withAuth.js";
import withFrame from "/components/Frame.js";
import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import router, { useRouter } from "next/router";
import { useState } from "react";
import Rank from "/components/Rank.js";
import dynamic from "next/dynamic";

const WelcomeTour = dynamic(() => import("/components/WelcomeTour"), {
    ssr: false,
});

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function BadgeModal(props) {
    if (props.active === props.title) {
        return (
            <div className={"modal is-active"} id="badge-modal">
                <div
                    className="modal-background"
                    onClick={() => {
                        props.setActive("");
                    }}></div>
                <div className="modal-content" id="badge-modal-content">
                    <div className="columns is-mobile is-variable is-4 modal-wrapper">
                        <div className="column is-one-third modal-picture">
                            <img
                                className={"modal-badge " + props.color}
                                src={props.src}
                                alt={props.title}></img>
                        </div>
                        <div className="column is-two-thirds modal-text">
                            <div className="modal-title">{props.title}</div>
                            <hr></hr>
                            <div className="modal-desc">{props.desc}</div>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => {
                        props.setActive("");
                    }}></button>
            </div>
        );
    } else {
        return <></>;
    }
}

function Badge(name, active, setActive) {
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
            desc = "Logged in during a school break.";
            src = "/images/badges/overachiever.svg";
            break;
        case "volunteer_of_the_month":
            title = '"Volunteer of the Month" Award';
            desc = "Selected as Volunteer of the Month by the NHS committee.";
            src = "/images/badges/medal.svg";
            break;
    }
    return (
        <>
            <a
                className="column is-2 is-offset-1 badge-wrapper"
                title={title}
                onClick={() => {
                    setActive(title);
                }}>
                <img className="badge" src={src} alt={title}></img>
            </a>
            <BadgeModal
                active={active}
                title={title}
                desc={desc}
                src={src}
                setActive={setActive}
            />
        </>
    );
}

function convertRole(role) {
    let org = ", Loudoun County Public Schools";
    switch (role) {
        case "member":
            org = ", Riverside National Honor Society";
            break;
        case "officer":
            org = ", Riverside National Honor Society";
            break;
        case "moderator":
            role = "officer";
            org = ", Riverside National Honor Society";
            break;
        case "admin":
            role = "officer";
            org = ", Riverside National Honor Society";
            break;
    }
    return role.charAt(0).toUpperCase() + role.slice(1) + org;
}

function Status(status, eid) {
    if (status != "registered") {
        return status.charAt(0).toUpperCase() + status.slice(1);
    } else {
        return (
            <>
                <div>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
                <div
                    className="button is-warning"
                    onClick={() => {
                        router.push("/member/opportunities/" + eid);
                    }}>
                    Submit Verification
                </div>
            </>
        );
    }
}

function Profile() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState(["null", "null"]);
    const [active, setActive] = useState("");
    const [isTourOpen, setIsTourOpen] = useState(true);

    async function getUserData(uid) {
        if (userData[0] != uid) {
            const userRef = db.collection("users").doc(uid);
            userRef.get().then((snapshot) => {
                const data = snapshot.data();
                setUserData([uid, data]);
                return data;
            });
        } else {
            return userData[1];
        }
    }

    function DisplayProfile({ uid }) {
        if (userData[0] === uid) {
            const data = userData[1];
            return (
                <>
                    <div className="columns profile-wrapper">
                        <div className="column is-8" id="profile-large">
                            <div className="profile-large-tour">
                                <div className="profile-name">
                                    {data.first.charAt(0).toUpperCase() +
                                        data.first.slice(1).toLowerCase()}{" "}
                                    {data.last}
                                </div>
                                <div className="profile-role">
                                    {convertRole(data.role)}
                                </div>
                                <div className="profile-year">SY 2021-2022</div>
                                <hr className="profile-line"></hr>
                                <div className="profile-hours">
                                    <div className="profile-hours-title">
                                        Hours Summary
                                    </div>
                                    <table className="table is-bordered is-fullwidth is-hoverable">
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
                                                <td>
                                                    {data.hours.volunteering}
                                                </td>
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
                                <div className="profile-hours">
                                    <div className="profile-hours-title">
                                        Volunteer Opportunities
                                    </div>
                                    <table className="table is-bordered is-fullwidth is-hoverable">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Event</th>
                                                <th>Task Group</th>
                                                <th>Hours</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(
                                                data.opportunities
                                            ).map((keyName, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                data
                                                                    .opportunities[
                                                                    keyName
                                                                ].date
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                data
                                                                    .opportunities[
                                                                    keyName
                                                                ].title
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                data
                                                                    .opportunities[
                                                                    keyName
                                                                ]["task_title"]
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                data
                                                                    .opportunities[
                                                                    keyName
                                                                ].hours
                                                            }
                                                        </td>
                                                        <td>
                                                            {Status(
                                                                data
                                                                    .opportunities[
                                                                    keyName
                                                                ].status,
                                                                keyName
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-wrapper"></div>
                            </div>
                        </div>
                        <div className="column is-4" id="profile-small">
                            <div className="profile-small-tour">
                                <Rank
                                    hours={
                                        data.hours.tutoring +
                                        data.hours.volunteering
                                    }
                                    active={active}
                                    setActive={setActive}
                                />

                                <div className="profile-badges-title">
                                    Badges
                                </div>
                                <hr className="profile-line small-margins"></hr>
                                <div className="columns is-mobile is-multiline profile-badges">
                                    {data.badges.map((name) => {
                                        return Badge(name, active, setActive);
                                    })}
                                </div>
                            </div>
                            <br></br>
                        </div>
                    </div>
                </>
            );
        } else {
            getUserData(uid);
            return null;
        }
    }

    const steps = [
        {
            selector: "",
            content: (
                <>
                    <div className="tour-header">Member Profile</div>
                    <div className="tour-body">
                        This is your <b>NHS profile</b>.<br></br>
                        <br></br>
                        Here, all your NHS related data are displayed. Don't
                        worry, only you (and your admin leader, of course) can
                        see this information.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
        {
            selector: ".profile-large-tour",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Your <b>hours</b> and <b>opportunities</b> are displayed
                        here.<br></br>
                        <br></br>
                        No more hours logs, woohoo! We now count the hours for
                        you so that you may focus on volunteering.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
        {
            selector: ".profile-small-tour",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        We implemented a <b>rank</b> and <b>badges</b> system.
                        <br></br>
                        <br></br>
                        The more volunteering you do, the higher your rank will
                        be. You can also obtain <b>unique badges</b> through
                        special events, awards, and opportunities.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
            stepInteraction: false,
        },
        {
            selector: ".frame-toolbar-volunteering",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Here are pages for <b>volunteering</b>.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
            stepInteraction: false,
        },
        {
            selector: "#toolbar-element-FindOpportunity",
            content: (
                <>
                    <div className="tour-header"></div>
                    <div className="tour-body">
                        Let's go see all your new <b>opportunities</b>.<br></br>
                        <br></br>
                        Click "Find Opportunity" to continue.
                    </div>
                    <div className="tour-footer">
                        <img src="/images/nhslogo.png" />
                    </div>
                </>
            ),
        },
    ];

    if (loading) {
        return <>Loading Events...</>;
    }
    if (error != undefined || user == undefined) {
        // console.log("error");
        return <div>Error!</div>;
    } else {
        return (
            <>
                <WelcomeTour
                    steps={steps}
                    open={isTourOpen}
                    setOpen={setIsTourOpen}
                    route={"/member"}
                    startAt={0}
                    offset={0}
                />
                <div className="columns is-multiline tutor-list">
                    <div className="column is-full tutor-list-title">
                        Profile
                        <hr className="tutor-list-hr"></hr>
                    </div>
                    <div className="column is-full">
                        <DisplayProfile uid={user.uid} />
                    </div>
                </div>
            </>
        );
    }
}

export default withAuth(withFrame(Profile, "Profile", true), "member");
