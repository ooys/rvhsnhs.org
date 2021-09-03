import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import React, { useState, useEffect } from "react";
import Profile from "../components/Profile.js";
import LazyLoad from "react-lazyload";
import HeadTag from "/components/Head.js";

function About() {
    let [hidden, setHidden] = useState(5);
    return (
        <>
            <HeadTag page={"About Us"} />
            <Navbar />

            <div className="page-wrapper" id="about">
                <div className="columns columns-wrapper is-multiline">
                    <div
                        className="column about-section is-full is-bg-light"
                        id="about-column-1">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered" +
                                (hidden >= 1 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text">
                                <div className="column about-section-header2">
                                    Group Service Projects <br />
                                    <br />
                                </div>
                                <div className="columns gsp-divider">
                                    <div className="column about-section-body is-half is-vcentered">
                                        <div className="column gsp-title-text">
                                            Holiday Party
                                        </div>
                                        The annual Riverside NHS Holiday Party
                                        is a wonderful occasion for members to
                                        come together and help the community
                                        during the joyous winter season.
                                        Students and families from our feeder
                                        elementary schools are invited for a
                                        night full of holiday festivities at
                                        Riverside. NHS members coordinate to set
                                        up various crafts stations and games for
                                        the guests before dinner is served.
                                    </div>
                                    <div className="column about-section-picture is-half">
                                        <LazyLoad once={true}>
                                            <img
                                                src="images/holidaycard.jpg"
                                                alt="holiday_party"
                                            />
                                        </LazyLoad>
                                    </div>
                                </div>
                                <div className="columns picture-holder">
                                    <div className="column about-section-picture is-half">
                                        <LazyLoad once={true}>
                                            <img
                                                src="images/colorcard1.jpg"
                                                alt="holiday_party"
                                            />
                                        </LazyLoad>
                                    </div>
                                    <div className="column about-section-body is-half is-vcentered">
                                        <div className="column gsp-title-text">
                                            Color Run
                                        </div>
                                        The Color Run consists of two events
                                        during spring: a fun-run (one mile) and
                                        a 5K, both beginning with spectacular
                                        color! This event supports global
                                        organizations such as LEAP for Ghana and
                                        the Olivia Newton-John Cancer Wellness
                                        and Research Center. Members worked
                                        together to make sure the event runs
                                        efficiently - helping to set up music
                                        and signs, register participants, and
                                        cheer on runners.
                                    </div>
                                </div>
                                <div className="columns picture-holder">
                                    <div className="column about-section-body is-half is-vcentered">
                                        <div className="column gsp-title-text">
                                            Study Skills
                                        </div>
                                        TIME FRAME: January - March 2021 WHAT
                                        WOULD I DO?: You will be collaborating
                                        with teachers, central office
                                        instructional facilitators, and school
                                        counseling staff to develop a curriculum
                                        and study hall/advisory activities for
                                        study skills that can be implemented
                                        potentially not only at Riverside, but
                                        also district-wide! Ongoing Virtual GSP
                                        Members will working on study skills
                                        curriculum and with other teachers to
                                        create beneficial resources for
                                        students. Great leadership opportunity!
                                    </div>
                                    <div className="column about-section-picture is-half">
                                        <LazyLoad once={true}>
                                            <img
                                                src="images/studycard.jpg"
                                                alt="holiday_party"
                                            />
                                        </LazyLoad>
                                    </div>
                                </div>
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
