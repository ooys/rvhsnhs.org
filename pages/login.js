import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import initFirebase from "../services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function SignIn() {
    const router = useRouter();
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((results) => {
            try {
                var profile = results.additionalUserInfo.profile;
                createProfile(profile);
            } catch (error) {
                console.error(error);
                // auth.signOut();
                // router.push("/login");
            }
        });
    };

    async function checkRole(email) {
        const sid = email.slice(0, -9);
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
            <button className="sign-in" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
            <p>Hello world!</p>
        </>
    );
}

function Login() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <>Fetching data...</>;
    }
    if (error != undefined || user == undefined) {
        return <SignIn />;
    } else {
        router.push("/");
        return <>Signed in!</>;
    }
}

export default Login;
