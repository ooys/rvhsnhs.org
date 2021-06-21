import Link from "next/link";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "../services/firebase.js";

initFirebase();
const auth = firebase.auth();

function SignOut() {
    return (
        auth.currentUser && (
            <Link href="/login">
                <button
                    className="sign-out"
                    onClick={() => {
                        auth.signOut();
                    }}>
                    Sign Out
                </button>
            </Link>
        )
    );
}

function Index() {
    return (
        <>
            <div>Home</div>
            <Link href="/login">
                <a>Login</a>
            </Link>
            <SignOut />
        </>
    );
}

export default Index;