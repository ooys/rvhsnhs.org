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
                                <div className="about-section-header">
                                    Eligibility
                                </div>
                                <div className="about-section-body">
                                    National Honor Society is open to juniors
                                    and seniors only. Possible candidates will
                                    be first notified in the Fall. A student who
                                    meets the following requirements will be
                                    considered.
                                    <br />
                                    <br />
                                    <li>
                                        Must have been in attendance for at
                                        least the equivalent of one full
                                        semester at Riverside.{" "}
                                    </li>
                                    <li>
                                        A member of the junior or senior class{" "}
                                    </li>
                                    <li>
                                        Met the minimum scholarship requirement
                                        of a 3.50 cumulative GPA.
                                    </li>
                                    <br />
                                    All academically eligible students are then
                                    given the opportunity to complete an
                                    application by a specific date. As a
                                    minimum, each candidate must have the
                                    following.
                                    <br />
                                    <br />
                                    <li>
                                        Demonstrate full participation in{" "}
                                        <u>at least</u> two school activities{" "}
                                    </li>
                                    <li>
                                        Have verifiable community and school
                                        service
                                    </li>
                                    <li>
                                        Practice leadership through either
                                        elective office, positions of
                                        responsibility, or documented
                                        opportunities
                                    </li>
                                    <li>
                                        Exemplify the highest standard of
                                        character.
                                    </li>
                                    <br></br>
                                    <b>
                                        Membership in NHS is an honor, not a
                                        right, and is based upon outstanding
                                        achievement in each of the four areas
                                        mentioned.{" "}
                                    </b>
                                    <u></u>A Faculty Council consisting of
                                    faculty members selected by the principal
                                    has the duty of determining which
                                    academically-eligible students have met not
                                    only the minimum criteria, but have gone on
                                    to establish themselves as truly outstanding
                                    young people as demonstrated in the
                                    information forms supplied at the time of
                                    selection.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="column about-section is-full is-bg-shade"
                        id="about-column-2">
                        <div class="custom-shape-divider-top-1629826782">
                            <svg
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none">
                                <path
                                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                                    opacity=".25"
                                    class="shape-fill"></path>
                                <path
                                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                                    opacity=".5"
                                    class="shape-fill"></path>
                                <path
                                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                                    class="shape-fill"></path>
                            </svg>
                        </div>
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered" +
                                (hidden >= 2 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text align-right is-half">
                                <div className="about-section-header">
                                    Meeting Attendence
                                </div>
                                <div className="about-section-body">
                                    All students in NHS are expected to attend
                                    monthly meetings as scheduled at the start
                                    of the year, maintain their standards of
                                    selection, and to complete a specific
                                    quantity of quality service hours as
                                    determined by the organization’s leadership
                                    with support by the Faculty Council and
                                    school principal. NHS meetings are only
                                    subject to change in emergencies or by
                                    administrative approval. Officers are
                                    obligated to meet prior to the full NHS
                                    meeting as required by the NHS adviser. Any
                                    NHS student who misses three meetings
                                    throughout the course of the school year or
                                    who fails to complete the required service
                                    hours by the assigned due dates at the end
                                    of the first and/or second semesters may be
                                    dismissed from the organization by the
                                    Faculty Council.
                                </div>
                            </div>

                            <div
                                className="column about-section-picture is-half"
                                id="about-column-picture-1">
                                <LazyLoad once={true}>
                                    <img
                                        src="images/nhsceremony1.jpg"
                                        alt="holiday_party"
                                    />
                                </LazyLoad>
                            </div>
                        </div>
                    </div>
                    <div
                        className="column about-section is-full is-bg-light"
                        id="about-column-3">
                        <div class="custom-shape-divider-bottom-1629829254">
                            <svg
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none">
                                <path
                                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                                    opacity=".25"
                                    class="shape-fill"></path>
                                <path
                                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                                    opacity=".5"
                                    class="shape-fill"></path>
                                <path
                                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                                    class="shape-fill"></path>
                            </svg>
                        </div>
                        <div
                            className={
                                "columns profile-section-wrapper is-multiline" +
                                (hidden >= 2 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text is-full">
                                <div className="about-section-header">
                                    Hours Information
                                </div>
                                <div className="about-section-body">
                                    Information regarding the hour requirements
                                    of ALL members of National Honor Society for
                                    the 2021-2022 school year.
                                </div>
                                <br></br>
                            </div>
                            <div className="column is-full">
                                <div className="columns is-multiline is-centered">
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered about-section-body">
                                            <b>Fall 2020 Inductees</b>
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            Semester 1: 5 hours tutoring, 10
                                            hours volunteering <br></br>
                                            Semester 2: 5 hours tutoring, 10
                                            hours volunteering
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered about-section-body">
                                            <b>Fall 2021 Inductees</b>
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            Semester 1: 3 hours tutoring, 5
                                            hours volunteering <br />
                                            Semester 2: 5 hours tutoring, 10
                                            hours volunteering
                                            <br /> <br /> <br />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            SPECIAL NOTE: The hours stated are
                                            MINIMUM requirements. These must be
                                            met by their respective due dates.
                                            Members are free to do as many hours
                                            as they prefer, but must meet these
                                            requirements.
                                        </div>
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
