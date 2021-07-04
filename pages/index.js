import Link from "next/link";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import initFirebase from "../services/firebase.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection.js";

initFirebase();
const auth = firebase.auth();

function Index() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <div className="pillar-page-wrapper">
                <div className="pillar-bg1">
                    <div className="pillar-div-1">
                        <img
                            src="images\splashicons\graduated (1).png"
                            alt=""
                            className="scholarship-image"
                        />
                        <div className="scholarship-wrapper">
                            <p> Scholarship </p>
                            <div className="scholarship-desc-wrapper">
                                Scholarship is achieving academic excellence by
                                maintaining at least a 3.5 cumulative GPA in
                                their high school career. Members are also
                                expected to tutor students that need help in
                                their classes.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pillar-bg2">
                    <div className="pillar-div-2">
                        <div className="service-wrapper">
                            <p> Service </p>
                            <div className="service-desc-wrapper">
                                Service is about giving back to the community
                                and school through various meaningful ways with
                                the intent of improvement. The member will have
                                an enthusiastic and encouraging attitude while
                                dedicating time and effort to making a positive
                                difference.
                            </div>
                        </div>
                        <img
                            src="images\splashicons\beneficiary.png"
                            alt=""
                            className="scholarship-image"
                        />
                    </div>
                </div>
                <div className="pillar-bg3">
                    <div className="pillar-div-3">
                        <img
                            src="images\splashicons\leadership (2).png"
                            alt=""
                            className="scholarship-image"
                        />
                        <div className="leadership-wrapper">
                            <p> Leadership </p>
                            <div className="leadership-desc-wrapper">
                                Leadership is about directing and enabling a
                                group of people to work cooperatively to achieve
                                a goal. A leader is someone who must possess the
                                skills of communication, delegation, commitment,
                                and be able to inspire the group to follow the
                                vision and to complete the task. Members will be
                                positive role models by taking responsibility
                                and accountability for their own actions,
                                communicating with others, and contributing
                                ideas to others.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pillar-bg4">
                    <div className="pillar-div-4">
                        <div className="character-wrapper">
                            <p> Character </p>
                            <div className="character-desc-wrapper">
                                Character is the combination of being courteous,
                                respectful of others, and possessing high
                                principles of ethics. Every member of NHS
                                demonstrate courtesy, respectfulness, honesty
                                and reliability.
                            </div>
                        </div>
                        <img
                            src="images\splashicons\angel (1).png"
                            alt=""
                            className="scholarship-image"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Index;
