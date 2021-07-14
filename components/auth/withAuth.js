import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

initFirebase();
const auth = firebase.auth();
const db = firebase.firestore();

function withAuth(C, authlevel) {
    function toLevels(role) {
        if (role === "admin") {
            return 4;
        } else if (role === "moderator") {
            return 3;
        } else if (role === "officer") {
            return 2;
        } else if (role === "member") {
            return 1;
        } else if (role === "student") {
            return 0.5;
        } else if (role === "visitor") {
            return 0.1;
        } else {
            return 0;
        }
    }

    function CheckAuthLevel(curr, req, router) {
        curr = toLevels(curr);
        req = toLevels(req);
        console.log(curr, req);
        if (curr >= req) {
            return (
                <>
                    <C />
                </>
            );
        } else {
            router.push("/login/" + authlevel);
            return (
                <div>
                    Your authorization level of {curr} is not high enough for{" "}
                    {req}!
                </div>
            );
        }
    }
    function GetAuth() {
        const [user, loading, error] = useAuthState(auth);
        const router = useRouter();
        if (loading) {
            // Hooks inside if statements - definitely need to fix later.
            const profileRef = db.collection("users").doc("await");
            const [value, loading2, error2] = useDocumentDataOnce(profileRef);
            return <>Fetching data...</>;
        }
        if (error != undefined || user == undefined) {
            router.push("/login/" + authlevel);
            const profileRef = db.collection("users").doc("await");
            const [value, loading2, error2] = useDocumentDataOnce(profileRef);
            return <div>Unauthorized, back to login!</div>;
        } else {
            // console.log("Authorized.");
            const profileRef = db.collection("users").doc(user.uid);
            const [value, loading2, error2] = useDocumentDataOnce(profileRef);
            if (loading2) {
                return <>Authorized, fetching more data...</>;
            }
            if (error2 != undefined || value == undefined) {
                // console.log("error");
                return <div>Unauthorized, back to login!</div>;
            } else {
                // console.log(value.role);
                return CheckAuthLevel(value.role, authlevel, router);
            }
        }
    }

    return class AuthComponent extends React.Component {
        render() {
            return (
                <>
                    <GetAuth />
                </>
            );
        }
    };
}

export default withAuth;
