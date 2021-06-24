import Link from "next/link";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "../services/firebase.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";

initFirebase();
const auth = firebase.auth();

function Index() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="index">
                <div>Home</div>
            </div>
            <Footer />
        </>
    );
}

export default Index;
