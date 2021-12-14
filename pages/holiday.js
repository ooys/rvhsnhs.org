import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import React, { useState, useEffect } from "react";
import Sponsor from "../components/Sponsor.js";
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
                                    Holiday Party 2021
                                </div>
                                <div className="about-section-body">
                                    The NHS Holiday Party is an opportunity for
                                    Riverside to give back to the community.
                                    Families in need in Northern Virgina come to
                                    Riverside for nourishments, holiday themed
                                    activities, games, movies, gifts, and more!
                                    <br></br>
                                    <br></br>
                                    Our NHS members collaborate to collect
                                    donations from business sponsors, organize
                                    events, and provide groceries and gifts for
                                    these families. The Holiday Party encourages
                                    engagement with the community during the
                                    holiday season and helps students give back
                                    to families from Riverside feeder schools.
                                </div>
                            </div>
                            <div
                                className="column about-section-picture is-half"
                                id="about-column-picture-1">
                                <LazyLoad once={true}>
                                    <img
                                        src="https://lh3.googleusercontent.com/rnGKk7ce7O6WmaWzonR401oHNQhPrTXSmtMJhh8HcUuz0MMUMgcUDmVwR7fXJ33qBGuTV5dy1T8NxOxvODThYauVUeIZpOTbE-SwAylRCex2ybjJrjfqCQs9m-OzZAbHnqPdcxEE"
                                        alt="induction"
                                    />
                                </LazyLoad>
                            </div>
                        </div>
                    </div>
                    <div
                        className="column about-section is-full is-bg-shade"
                        id="about-column-2">
                        <div className="custom-shape-divider-top-1629826782">
                            <svg
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none">
                                <path
                                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                                    opacity=".25"
                                    className="shape-fill"></path>
                                <path
                                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                                    opacity=".5"
                                    className="shape-fill"></path>
                                <path
                                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                                    className="shape-fill"></path>
                            </svg>
                        </div>
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered" +
                                (hidden >= 2 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text">
                                <div className="about-section-header">
                                    Our Sponsors
                                </div>
                                <div className="about-section-body">
                                    Businesses and companies located in the
                                    Northern Virginia area helped fund the
                                    Holiday Party. The following organizations
                                    provided gifts, food, and more for the
                                    families in attendance.
                                </div>
                                <div className="about-section-body">
                                    <div className="column is-full">
                                        <div className="columns is-multiline is-centered">
                                            <div className="column is-full">
                                                <br></br>

                                                <div className="columns is-mobile is-multiline is-centered">
                                                    <Sponsor
                                                        name="FCN Technology Solutions"
                                                        picture="/images/Holiday Party 2021/Sponsors/FCN.png"
                                                        url="https://fcnit.com/"
                                                    />
                                                    <Sponsor
                                                        name="National Sports Medicine Institute"
                                                        picture="/images/Holiday Party 2021/Sponsors/NSMI.jpeg"
                                                        url="https://www.nationalsportsmed.com/"
                                                    />
                                                    <Sponsor
                                                        name="Veteran Made Digital"
                                                        picture="/images/Holiday Party 2021/Sponsors/Veteran Made Digital.png"
                                                        url="https://veteranmade.com/"
                                                    />
                                                    <Sponsor
                                                        name="Product Knowledge"
                                                        picture="/images/Holiday Party 2021/Sponsors/Product Knowledge.png"
                                                        url="http://www.productknowledge.cc/home.html"
                                                    />
                                                    <Sponsor
                                                        name="GoldSentinel"
                                                        picture="/images/Holiday Party 2021/Sponsors/GoldSentinel.png"
                                                        url="http://goldsentinel.com/"
                                                    />
                                                    <Sponsor
                                                        name="VIP Groceries"
                                                        picture="/images/Holiday Party 2021/Sponsors/VIP Groceries.jpeg"
                                                    />
                                                    <Sponsor
                                                        name="Glaze Nail"
                                                        picture="/images/Holiday Party 2021/Sponsors/Glaze Nail.jpeg"
                                                        url="https://glazenail.com/"
                                                    />
                                                    <Sponsor
                                                        name="Decisiv SRM"
                                                        picture="/images/Holiday Party 2021/Sponsors/Decisiv SRM.png"
                                                        url="https://decisiv.com/"
                                                    />
                                                    <Sponsor
                                                        name="Anthony Vince Nail Spa"
                                                        picture="/images/Holiday Party 2021/Sponsors/Anthony Vince Nail Spa.png"
                                                        url="https://www.anthonyvincenailspa.com/"
                                                    />
                                                    <Sponsor
                                                        name="The Loudoun Kitchen & Bar"
                                                        picture="/images/Holiday Party 2021/Sponsors/The Loudoun Kitchen & Bar.png"
                                                        url="https://theloudounkitchenandbar.com/"
                                                    />
                                                    <Sponsor
                                                        name="Nutrition CPR"
                                                        picture="/images/Holiday Party 2021/Sponsors/Nutrition CPR.png"
                                                        url="https://nutritioncpr.com/"
                                                    />
                                                    <Sponsor
                                                        name="Lockton Companies"
                                                        picture="/images/Holiday Party 2021/Sponsors/Lockton Companies.jpeg"
                                                        url="https://global.lockton.com/us/en"
                                                    />
                                                    <Sponsor
                                                        name="Garrell Group Real Estate"
                                                        picture="/images/Holiday Party 2021/Sponsors/Garrell Group Real Estate.png"
                                                        url="https://www.garrellgroup.com/"
                                                    />
                                                    <Sponsor
                                                        name="Fastlane Swimming"
                                                        picture="/images/Holiday Party 2021/Sponsors/FastLane Swimming.png"
                                                        url="http://www.fastlaneswimming.us/"
                                                    />
                                                    <Sponsor
                                                        name="Fastlane Swimming"
                                                        picture="/images/Holiday Party 2021/Sponsors/Anthony Vince Nail Spa.png"
                                                        url="https://www.anthonyvincenailspa.com/"
                                                    />

                                                    <Sponsor
                                                        name="Crumbl Cookies"
                                                        picture="/images/Holiday Party 2021/Sponsors/Crumbl Cookies.jpeg"
                                                        url="https://crumblcookies.com/"
                                                    />
                                                    <Sponsor
                                                        name="Wegmans"
                                                        picture="/images/Holiday Party 2021/Sponsors/Wegmans.png"
                                                        url="https://www.wegmans.com/"
                                                    />
                                                    <Sponsor
                                                        name="Ihop"
                                                        picture="/images/Holiday Party 2021/Sponsors/Ihop.png"
                                                        url="https://www.ihop.com/en"
                                                    />
                                                    <Sponsor
                                                        name="DC Prime Steak and Lobster"
                                                        picture="/images/Holiday Party 2021/Sponsors/DC Prime Steak and Lobster.png"
                                                        url="https://dcprimesteaks.com/"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div className="about-section-header-center">
                                    Thank you for your donations!
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
