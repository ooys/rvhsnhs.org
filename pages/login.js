import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import initFirebase from "../services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

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
                var credential = results.credential;
                updateProfile(profile, credential);
            } catch (error) {
                console.error(error);
                auth.signOut();
                router.push("/login");
            }
        });
    };

    async function updateProfile(profile, credential) {
        const userRef = db
            .collection("users")
            .doc(firebase.auth().currentUser.uid);

        var org = "";
        if (typeof profile.hd === "undefined") {
            org = "public";
        } else {
            org = profile.hd;
        }

        await userRef.set({
            first: profile.given_name,
            last: profile.family_name,
            email: profile.email,
            organization: org,
            profilePicture: profile.picture,
            accessToken: credential.accessToken,
            idToken: credential.idToken,
            lastLogin: new firebase.firestore.Timestamp.now(),
        });
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
