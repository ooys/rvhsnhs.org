import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import { Controller, Scene } from "react-scrollmagic";
import React, { useState, useEffect } from "react";

function About() {
    let [hidden, setHidden] = useState(0);

    useEffect(() => {
        function checkPos() {
            const el1 = document
                .querySelector("#about-column-1")
                .getBoundingClientRect().top;
            const el2 = document
                .querySelector("#about-column-2")
                .getBoundingClientRect().top;
            const el3 = document
                .querySelector("#about-column-3")
                .getBoundingClientRect().top;
            const el4 = document
                .querySelector("#about-column-4")
                .getBoundingClientRect().top;
            console.log(el1, el2, el3, el4);
            if (el1 <= 200 && hidden < 1) {
                setHidden(1);
            }
            if (el2 <= 200 && hidden < 2) {
                setHidden(2);
            }
            if (el3 <= 200 && hidden < 3) {
                setHidden(3);
            }
            if (el4 <= 200 && hidden < 4) {
                setHidden(4);
            }
        }
        document.body.onscroll = checkPos;
    });

    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="about">
                <div className="columns columns-wrapper is-multiline">
                    <div className="column about-section is-full is-bg-light">
                        <div className="about-section-top">
                            <div className="about-section-title">
                                The Four Pillars
                            </div>
                            <div className="about-section-subtitle">
                                of National Honor Society
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            "column about-section is-full is-bg-light" +
                            (hidden >= 1 ? "" : " is-scroll-hidden")
                        }
                        id="about-column-1">
                        <div className="columns about-section-wrapper is-vcentered">
                            <div
                                className="column about-section-picture is-half"
                                id="about-column-picture-1">
                                <img
                                    className="scholarship-image"
                                    src="images\splashicons\graduated (1).png"
                                    alt="graduated"
                                />
                            </div>
                            <div className="column about-section-text is-half">
                                <div className="about-section-header">
                                    Scholarship
                                </div>
                                <div className="about-section-body">
                                    Members achieve academic excellence by
                                    maintaining at least a 3.5 cumulative GPA
                                    and tutoring students who need help in their
                                    classes.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            "column about-section is-full is-bg-shade" +
                            (hidden >= 2 ? "" : " is-scroll-hidden")
                        }
                        id="about-column-2">
                        <div className="columns about-section-wrapper is-vcentered">
                            <div className="column about-section-text align-right is-half">
                                <div className="about-section-header">
                                    Service
                                </div>
                                <div className="about-section-body">
                                    Service is about giving back to the
                                    community through meaningful ways with the
                                    intent of improvement. Members have an
                                    enthusiastic and encouraging attitude while
                                    dedicating time and effort to making a
                                    positive difference.
                                </div>
                            </div>

                            <div
                                className="column about-section-picture is-half"
                                id="about-column-picture-1">
                                <img
                                    src="images\splashicons\beneficiary.png"
                                    alt=""
                                    className="scholarship-image"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            "column about-section is-full is-bg-light" +
                            (hidden >= 3 ? "" : " is-scroll-hidden")
                        }
                        id="about-column-3">
                        <div className="columns about-section-wrapper is-vcentered">
                            <div
                                className="column about-section-picture is-half"
                                id="about-column-picture-1">
                                <img
                                    src="images\splashicons\leadership (2).png"
                                    alt=""
                                    className="scholarship-image"
                                />
                            </div>
                            <div className="column about-section-text is-half">
                                <div className="about-section-header">
                                    Leadership
                                </div>
                                <div className="about-section-body">
                                    A leader communicates and inspires the group
                                    to follow the vision to complete the task.
                                    Members will be positive role models by
                                    taking responsibility for their own actions,
                                    communicating with others, and contributing
                                    ideas to the group.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            "column about-section is-full is-bg-shade" +
                            (hidden >= 4 ? "" : " is-scroll-hidden")
                        }
                        id="about-column-4">
                        <div className="columns about-section-wrapper is-vcentered">
                            <div className="column about-section-text align-right is-half">
                                <div className="about-section-header">
                                    Character
                                </div>
                                <div className="about-section-body">
                                    Character is the combination of being
                                    courteous, respectful of others, and
                                    possessing high principles of ethics. Every
                                    member of NHS demonstrates courtesy,
                                    respectfulness, honesty and reliability.
                                </div>
                            </div>

                            <div
                                className="column about-section-picture is-half"
                                id="about-column-picture-1">
                                <img
                                    src="images\splashicons\angel (1).png"
                                    alt=""
                                    className="scholarship-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
