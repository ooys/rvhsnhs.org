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
            <nav class="navbar is-info" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <img src="/images/newnhslogo.png"/>
                    </a>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                         <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            Home
                        </a>

                        <a class="navbar-item">
                            Apply
                        </a>

                        <div class="navbar-item">
                            <a class="navbar-link">
                                About
                            </a>
                        </div>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-white">
                                    Sign up
                                </a>
                                <a href="/login" class="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            <div>Home</div>
            <Link href="/login">
                <a>Login</a>
            </Link>
            <SignOut />
        </>
    );
}

export default Index;