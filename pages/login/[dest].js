import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import initFirebase from "../../services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Navbar from "../../components/Navbar.js";
import Footer from "../../components/Footer";

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function SignIn() {
    const router = useRouter();

    // function redirect() {
    //     const profileRef = db
    //         .collection("users")
    //         .doc(firebase.auth().currentUser.uid);
    //     const [value, loading2, error2] = useDocumentDataOnce(profileRef);
    //     if (loading2) {
    //         return <>Authorized, fetching more data...</>;
    //     }
    //     if (error2 != undefined || value == undefined) {
    //         // console.log("error");
    //         return <div>Unauthorized, back to login!</div>;
    //     } else {
    //         // console.log(value.role);
    //         return <div>{value.role}</div>;
    //     }
    // }
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((results) => {
            try {
                var profile = results.additionalUserInfo.profile;
                checkProfile(profile);
            } catch (error) {
                console.error(error);
                auth.signOut();
                router.push("/login");
            }
        });
    };

    async function checkProfile(profile) {
        const profileRef = db
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
        profileRef.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
                createProfile(profile);
            }
        });
    }

    async function checkRole(email) {
        const sid = email.slice(0, -9);
        var regExp = /[a-zA-Z]/g;

        if (regExp.test(sid)) {
            /* do something if letters are found in your string */
            return "faculty";
        }

        // console.log(sid);
        const rolesRef = db.collection("permissions").doc("roles");
        const role = await rolesRef.get().then((snapshot) => {
            let role_list = snapshot.data();

            if (role_list.members.includes(sid)) {
                // console.log("member");
                return "member";
            } else if (role_list.officers.includes(sid)) {
                // console.log("officer");
                return "officer";
            } else if (role_list.moderators.includes(sid)) {
                // console.log("moderator");
                return "moderator";
            } else if (role_list.admins.includes(sid)) {
                // console.log("admin");
                return "admin";
            } else {
                // console.log("student");
                return "student";
            }
        });
        return role;
    }

    async function createProfile(profile) {
        // Check Organization
        let org = "";
        let role = "";
        if (typeof profile.hd != "undefined" && profile.hd === "lcps.org") {
            org = profile.hd;
            // Check Role
            role = await checkRole(profile.email);
            // console.log(role);
        } else {
            org = "exterior";
            role = "visitor";
        }

        // Create Profile
        const userRef = db
            .collection("users")
            .doc(firebase.auth().currentUser.uid);

        await userRef.set(
            {
                first: profile.given_name,
                last: profile.family_name,
                email: profile.email,
                role: role,
                profilePicture: profile.picture,
                firstLogin: new firebase.firestore.Timestamp.now(),
            },
            { merge: false }
        );
    }

    return (
        <>
            <Navbar />
            <div className="body-container">
                <div className="login-box">
                    <span className="log-in-text">User Login</span>
                    <a className="sign-in" onClick={signInWithGoogle}>
                        <span className="google-icon">
                            <FontAwesomeIcon
                                icon={fab.faGoogle}></FontAwesomeIcon>
                        </span>
                        Sign in with Google
                    </a>
                    <span className="middle-text">SY 2021 - 2022</span>
                    <div className="bottom-logos">
                        <img className="bottom-nhs" src="/images/nhslogo.png" />
                        <span className="bottom-text">
                            Riverside National Honor Society
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

function Login() {
    const router = useRouter();
    const { dest } = router.query;
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <>Fetching data...</>;
    }
    if (error != undefined || user == undefined) {
        return <SignIn />;
    } else {
        router.push("/" + dest);
        return <>Signed in!</>;
    }
}

export default Login;
