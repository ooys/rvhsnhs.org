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
            <nav
                className="navbar is-info"
                role="navigation"
                aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/">
                        <a className="navbar-item">
                            <img src="/images/newnhslogo.png" />
                        </a>
                    </Link>

                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link href="/">
                            <a className="navbar-item">Home</a>
                        </Link>
                        <Link href="/apply">
                            <a className="navbar-item">Apply</a>
                        </Link>
                        <Link href="/about">
                            <a className="navbar-link">About</a>
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link href="/login">
                                    <a className="button is-light">Log in</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div>Home</div>
            <SignOut />
        </>
    );
}

export default Index;
