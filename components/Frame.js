import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "/services/firebase.js";
import React from "react";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

initFirebase();
const db = firebase.firestore();
const auth = firebase.auth();

function withFrame(C, currPage) {
    function Toolbar() {
        const [currRole, setCurrRole] = useState("");
        const [user, loading, error] = useAuthState(auth);

        async function getUserRole(uid) {
            if (currRole === "") {
                const userRef = db.collection("users").doc(uid);
                userRef.get().then((snapshot) => {
                    const data = snapshot.data();
                    setCurrRole(data.role);
                    return data.role;
                });
            } else {
                return currRole;
            }
        }

        function getTuteeId() {
            // get tutee id from location.pathname
            const pathname = window.location.pathname;
            var indices = [];
            var idx = pathname.indexOf("/");
            while (idx != -1) {
                indices.push(idx);
                idx = pathname.indexOf("/", idx + 1);
            }
            if (indices.length === 4) {
                return pathname.substring(pathname.lastIndexOf("/") + 1);
            } else {
                return pathname.substring(indices[3] + 1, indices[4]);
            }
        }

        function toLevels(role) {
            if (role === "admin") {
                return 4;
            } else if (role === "moderator") {
                return 3;
            } else if (role === "officer") {
                return 2;
            } else if (role === "member") {
                return 1;
            } else if (role === "student" || role === "faculty") {
                return 0.5;
            } else if (role === "visitor") {
                return 0.1;
            } else {
                return 0;
            }
        }

        function ToolbarTitle({ page, needRole, isNotHidden }) {
            if (toLevels(currRole) >= toLevels(needRole)) {
                if (typeof isNotHidden != "undefined") {
                    if (!isNotHidden.includes(currPage)) {
                        return null;
                    }
                }
                return (
                    <div className="column is-full toolbar-title toolbar-is-hidden">
                        {page}
                    </div>
                );
            } else return null;
        }

        function ToolbarElement({ page, route, needRole, isNotHidden }) {
            if (toLevels(currRole) >= toLevels(needRole)) {
                if (typeof isNotHidden != "undefined") {
                    if (!isNotHidden.includes(currPage)) {
                        return null;
                    }
                }
                if (currPage === page) {
                    return (
                        <Link href={route}>
                            <a className="column is-full toolbar-element element-selected">
                                {page}
                            </a>
                        </Link>
                    );
                } else {
                    return (
                        <Link href={route}>
                            <a className="column is-full toolbar-element">
                                {page}
                            </a>
                        </Link>
                    );
                }
            } else return null;
        }

        if (loading) {
            return <>Loading Events...</>;
        }
        if (error != undefined || user == undefined) {
            // console.log("error");
            return <div>Error!</div>;
        } else {
            if (currRole === "") {
                getUserRole(user.uid);
            }
            return (
                <>
                    <div className="columns is-multiline frame-toolbar">
                        <ToolbarTitle page="Member" needRole={"member"} />
                        <ToolbarElement
                            page="Home"
                            route="/member"
                            needRole={"member"}
                        />
                        <ToolbarElement
                            page="Profile"
                            route="/profile"
                            needRole={"member"}
                        />
                        <ToolbarTitle
                            page="Opportunities"
                            needRole={"member"}
                        />
                        <ToolbarElement
                            page="Find Opportunity"
                            route="/member/opportunities"
                            needRole={"member"}
                        />
                        <ToolbarTitle page="Tutoring" needRole={"member"} />
                        <ToolbarElement
                            page="Tutoring Dashboard"
                            route="/member/tutoring"
                            needRole={"member"}
                        />
                        <ToolbarElement
                            page="Find Tutee"
                            route="/member/tutoring/findtutee"
                            needRole={"member"}
                        />
                        <ToolbarTitle
                            page="Tutee"
                            isNotHidden={["Information", "Feedback"]}
                            needRole={"member"}
                        />
                        <ToolbarElement
                            page="Information"
                            route={"/member/tutoring/tutee/" + getTuteeId()}
                            isNotHidden={["Information", "Feedback"]}
                            needRole={"member"}
                        />
                        <ToolbarElement
                            page="Feedback"
                            route={
                                "/member/tutoring/tutee/" +
                                getTuteeId() +
                                "/feedback"
                            }
                            isNotHidden={["Information", "Feedback"]}
                            needRole={"member"}
                        />
                        <ToolbarTitle page="Officer" needRole={"officer"} />
                        <ToolbarElement
                            page="Officer Home"
                            route={"/officer"}
                            needRole={"officer"}
                        />
                        <ToolbarElement
                            page="Verify Hours"
                            route={"/officer/verify/hours"}
                            needRole={"officer"}
                        />
                        <ToolbarElement
                            page="Verify Tutoring"
                            route={"/officer/verify/tutoring"}
                            needRole={"officer"}
                        />
                        <ToolbarTitle page="Moderator" needRole={"moderator"} />
                        <ToolbarElement
                            page="Moderator Dashboard"
                            route={"/moderator/"}
                            needRole={"moderator"}
                        />
                        <ToolbarElement
                            page="Create Opportunity"
                            route={"/moderator/create/opportunity"}
                            needRole={"moderator"}
                        />
                        <ToolbarElement
                            page="Create Session"
                            route={"/moderator/create/session"}
                            needRole={"moderator"}
                        />
                    </div>
                </>
            );
        }
    }

    function Frame() {
        return (
            <>
                <Navbar user="member" />
                <div className="frame-wrapper">
                    <div className="columns is-desktop">
                        <div className="column is-3">
                            <Toolbar />
                        </div>
                        <div className="column is-9">
                            <C />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return class FrameComponent extends React.Component {
        render() {
            return (
                <>
                    <Frame />
                </>
            );
        }
    };
}

export default withFrame;
