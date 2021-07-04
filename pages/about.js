import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import React, { useState, useEffect } from "react";
import Profile from "../components/Profile.js";

function About() {
    let [hidden, setHidden] = useState(5);
    return (
        <>
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
                                    Established 2015
                                </div>
                                <div className="about-section-body">
                                    Riverside High School chapter of the
                                    National Honor Society is committed to
                                    serving the community while upholding the
                                    values of scholarship, service, leadership
                                    and character.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="column about-section is-full is-bg-shade"
                        id="about-column-2">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered" +
                                (hidden >= 2 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text align-right is-half">
                                <div className="about-section-header">
                                    1 Mission
                                </div>
                                <div className="about-section-body">
                                    Whether tutoring peers or supporting our
                                    local businesses, we dedicate time and
                                    effort to making a positive difference in
                                    our community.
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
                        className="column about-section is-full is-bg-light"
                        id="about-column-3">
                        <div
                            className={
                                "columns profile-section-wrapper is-multiline" +
                                (hidden >= 2 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text is-full">
                                <div className="about-section-header">
                                    2021-2022 Officers
                                </div>
                                <div className="about-section-body">
                                    We look forward to bringing you a revised
                                    chapter of National Honor Society.
                                </div>
                                <br></br>
                            </div>
                            <div className="column is-full">
                                <div className="columns is-multiline is-centered">
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Yihong Song"
                                                position="President"
                                                picture="/images/profile/y_song.jpg"
                                                email="1036566@lcps.org"
                                            />
                                            <Profile
                                                name="Brianna Trocki"
                                                position="President"
                                                // picture="/images/profile/y_song.jpg"
                                                email="1007655@lcps.org"
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Hunter Habersaat"
                                                position="Vice President"
                                                // picture="/images/profile/y_song.jpg"
                                                email="895090@lcps.org"
                                            />
                                            <Profile
                                                name="Elizabeth Joo"
                                                position="Vice President"
                                                // picture="/images/profile/y_song.jpg"
                                                email="829997@lcps.org"
                                            />
                                            <Profile
                                                name="Edward Joo"
                                                position="Vice President"
                                                // picture="/images/profile/y_song.jpg"
                                                email="830000@lcps.org"
                                            />
                                            <Profile
                                                name="Noelle Koo"
                                                position="Vice President"
                                                // picture="/images/profile/y_song.jpg"
                                                email="1004782@lcps.org"
                                            />
                                            <Profile
                                                name="Shyamanth Kudum"
                                                position="Vice President"
                                                // picture="/images/profile/y_song.jpg"
                                                email="836587@lcps.org"
                                            />
                                            <Profile
                                                name="Anya Passino"
                                                position="Vice President"
                                                picture="/images/profile/a_passino.png"
                                                email="812857@lcps.org"
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Rachael Michitsch"
                                                position="Admin Secretary"
                                                // picture="/images/profile/y_song.jpg"
                                                email="811908@lcps.org"
                                            />
                                            <Profile
                                                name="Lauren Price"
                                                position="Admin Secretary"
                                                // picture="/images/profile/y_song.jpg"
                                                email="836568@lcps.org"
                                            />
                                            <Profile
                                                name="Naina Sharma"
                                                position="Admin Secretary"
                                                // picture="/images/profile/y_song.jpg"
                                                email="857580@lcps.org"
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Laasya Doppalapudi"
                                                position="Project Coordinator"
                                                // picture="/images/profile/y_song.jpg"
                                                email="837713@lcps.org"
                                            />
                                            <Profile
                                                name="Ayush Gupta"
                                                position="Project Coordinator"
                                                // picture="/images/profile/y_song.jpg"
                                                email="840536@lcps.org"
                                            />
                                            <Profile
                                                name="Colin Habersaat"
                                                position="Project Coordinator"
                                                // picture="/images/profile/y_song.jpg"
                                                email="895088@lcps.org"
                                            />
                                            <Profile
                                                name="Sriya Jakka"
                                                position="Project Coordinator"
                                                // picture="/images/profile/y_song.jpg"
                                                email="813694@lcps.org"
                                            />
                                            <Profile
                                                name="Noah Selehi"
                                                position="Project Coordinator"
                                                // picture="/images/profile/y_song.jpg"
                                                email="812991@lcps.org"
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Ben Gomez"
                                                position="Club Liaison"
                                                // picture="/images/profile/y_song.jpg"
                                                email="863509@lcps.org"
                                            />
                                            <Profile
                                                name="Neha Yannam"
                                                position="Club Liaison"
                                                // picture="/images/profile/y_song.jpg"
                                                email="837719@lcps.org"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="column about-section is-full is-bg-shade"
                        id="about-column-4">
                        <div
                            className={
                                "columns profile-section-wrapper is-multiline" +
                                (hidden >= 2 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text is-full">
                                <div className="about-section-header">
                                    Chapter Advisors
                                </div>
                                <div className="about-section-body">
                                    Riverside High School faculty members
                                    supporting and assisting the chapter.
                                </div>
                                <br></br>
                                <div className="column is-full">
                                    <div className="columns is-multiline is-centered">
                                        <div className="column is-full">
                                            <div className="columns is-mobile is-multiline is-centered">
                                                <Profile
                                                    name="Dr. Ashley Safford"
                                                    position="Faculty Advisor"
                                                    // picture="/images/profile/y_song.jpg"
                                                    email="ashley.safford@lcps.org"
                                                />
                                                <Profile
                                                    name="Dr. Tripp Di Nicola"
                                                    position="Administration Contact"
                                                    // picture="/images/profile/y_song.jpg"
                                                    email="tripp.dinicola@lcps.org"
                                                />
                                                <Profile
                                                    name="Mrs. Chelsea Northman"
                                                    position="Administration Contact"
                                                    // picture="/images/profile/y_song.jpg"
                                                    email="chelsea.northman@lcps.org"
                                                />
                                                <Profile
                                                    name="Mrs. Cassandra Asekhauno"
                                                    position="Counseling Contact"
                                                    // picture="/images/profile/y_song.jpg"
                                                    email="cassandra.asekhauno@lcps.org"
                                                />
                                            </div>
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
