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
                            <div
                                className="column about-section-picture is-half"
                                id="about-column-picture-1">
                                <LazyLoad once={true}>
                                    <img
                                        src="images/nhs/induction.jpg"
                                        alt="induction"
                                    />
                                </LazyLoad>
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
                                <LazyLoad once={true}>
                                    <img
                                        src="images/nhs/holiday_party.jpg"
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
                                                // picture="/images/profile/b_trocki.jpg"
                                                email="1007655@lcps.org"
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Hunter Habersaat"
                                                position="Vice President"
                                                picture="/images/profile/h_habersaat.jpg"
                                                email="895090@lcps.org"
                                            />
                                            <Profile
                                                name="Elizabeth Joo"
                                                position="Vice President"
                                                picture="/images/profile/el_joo.jpg"
                                                email="829997@lcps.org"
                                            />
                                            <Profile
                                                name="Edward Joo"
                                                position="Vice President"
                                                picture="/images/profile/ed_joo.jpg"
                                                email="830000@lcps.org"
                                            />
                                            <Profile
                                                name="Noelle Koo"
                                                position="Vice President"
                                                // picture="/images/profile/n_koo.jpg"
                                                email="1004782@lcps.org"
                                            />
                                            <Profile
                                                name="Shyamanth Kudum"
                                                position="Vice President"
                                                // picture="/images/profile/s_kudam.jpg"
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
                                                // picture="/images/profile/l_price.jpg"
                                                email="836568@lcps.org"
                                            />
                                            <Profile
                                                name="Naina Sharma"
                                                position="Admin Secretary"
                                                // picture="/images/profile/n_sharma.jpg"
                                                email="857580@lcps.org"
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Laasya Doppalapudi"
                                                position="Project Coordinator"
                                                // picture="/images/profile/l_doppalapudi.jpg"
                                                email="837713@lcps.org"
                                            />
                                            <Profile
                                                name="Ayush Gupta"
                                                position="Project Coordinator"
                                                // picture="/images/profile/a_gupta.jpg"
                                                email="840536@lcps.org"
                                            />
                                            <Profile
                                                name="Colin Habersaat"
                                                position="Project Coordinator"
                                                picture="/images/profile/c_habersaat.jpg"
                                                email="895088@lcps.org"
                                            />
                                            <Profile
                                                name="Sriya Jakka"
                                                position="Project Coordinator"
                                                picture="/images/profile/s_jakka.jpg"
                                                email="813694@lcps.org"
                                            />
                                            <Profile
                                                name="Noah Selehi"
                                                position="Project Coordinator"
                                                // picture="/images/profile/n_selehi.jpg"
                                                email="812991@lcps.org"
                                            />
                                        </div>
                                    </div>
                                    <div className="column is-full">
                                        <div className="columns is-mobile is-multiline is-centered">
                                            <Profile
                                                name="Ben Gomez"
                                                position="Club Liaison"
                                                // picture="/images/profile/b_gomez.jpg"
                                                email="863509@lcps.org"
                                            />
                                            <Profile
                                                name="Neha Yannam"
                                                position="Club Liaison"
                                                // picture="/images/profile/n_yannam.jpg"
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
                        <div class="custom-shape-divider-top-1629829561">
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
                                                    picture="/images/profile/a_safford.jpg"
                                                    email="ashley.safford@lcps.org"
                                                />
                                                <Profile
                                                    name="Dr. Tripp Di Nicola"
                                                    position="Administration Contact"
                                                    picture="/images/profile/t_nicola.jpg"
                                                    email="tripp.dinicola@lcps.org"
                                                />
                                                <Profile
                                                    name="Mrs. Chelsea Northman"
                                                    position="Administration Contact"
                                                    picture="/images/profile/c_northman.png"
                                                    email="chelsea.northman@lcps.org"
                                                />
                                                <Profile
                                                    name="Mrs. Cassandra Asekhauno"
                                                    position="Counseling Contact"
                                                    picture="/images/profile/c_asekhauno.jpg"
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
