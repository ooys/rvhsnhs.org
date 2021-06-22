import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "/services/firebase.js";
import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

initFirebase();
const auth = firebase.auth();

function withAuth(C) {
    // const [user, loading, error] = useAuthState(auth);
    function GetAuth() {
        const [user, loading, error] = useAuthState(auth);
        const router = useRouter();
        if (loading) {
            return <>Fetching data...</>;
        }
        if (error != undefined || user == undefined) {
            router.push("/login");
            return <div>Unauthorized, back to login!</div>;
        } else {
            console.log("Authorized.");
            return (
                <>
                    <C />
                </>
            );
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
