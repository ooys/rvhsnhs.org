import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection.js";
import ImageGallery from "react-image-gallery";
import HeadTag from "/components/Head.js";

function Index() {
    let [hidden, setHidden] = useState(0);

    const images = [
        {
            original:
                "https://lh3.googleusercontent.com/klBTzw-SwXWEfogayyBCmP-xFpZAFLOA1rIa9lL7wNF0PPlpHuOZaWIsrBK87Ni2lq8NcOqbvE39QiaXD5M6ih6C1gNHMISoChUYBdCQvZIB_eiDnOnDja3cvkOhidJlkuYFV8NC",
            description:
                "November 24, 2018 - NHS commemoration of 12 new inductees into the Tri M Society, the Riverside High School Music Honor Society.",
        },
        {
            original:
                "https://lh4.googleusercontent.com/lKcotPH4ZawhGtFHJuFSZ1prk4K3oArlDGT0_k2SksiFv7ZWEQTu08ggeiqI1u6YwXtB1HuH87iZCsx3BosDOc5pafzUY0Pip1VTxVYkcZbGSGbd23whhzjQAxBacYhA59M9Di_S",
            description:
                "May 25, 2018 - Initiating the start of the 2018 NHS Color Run, runners dash from the start line hoping to gain a lead in the race for charity. To date, Riverside High School has operated three successful Color Run campaigns, raising thousands of dollars for various charities.",
        },
        {
            original:
                "https://lh4.googleusercontent.com/XmiBH7wf5Tfo3RE4VIzEJRxjetNL0RtQE63KFw58flZNcaBdKOFu0PmdOHU-ON5x_pvuOKwOy1SsNlCo8y66Bu_xQoyn4-Q3EwYLl4j9r96DxIUZQPsrBt3QU2hPjoYjDZvXs6N8",
            description:
                "February 22, 2018 - NHS rallied for appreciation of Riverside High School Bus drivers through making posters and cards to show their appreciation and support for the people who get us to and from school safely every day.",
        },
        {
            original:
                "https://lh6.googleusercontent.com/GxRyJ8nc-MerzKUeJc1cv0_t_-JHKMiPJQa9qKUJgmBrGOc0HaeMMiVviCJ9-PlwFta-yoUqU3ldM3MtIQRGLSSY0DbJBIHIMcfgvDEgyHSIWHsqH9QDXmu9VzgA8GFkj35bO16Y",
            description:
                "November 3, 2018 - NHS commemoration of new inductees into the Art Honor Society. New inductees displayed excellence of character as well as significant achievement in their art classes at Riverside High School.",
        },
        {
            original:
                "https://lh5.googleusercontent.com/De6mLKzG49FO5yOMCmVjzKQT9MVMXvID0rof2QFCOMqRS6xf4E7rpc9m-dlIhakKFpujUx7ZkOPADkCGyYV1pG86_tE5VljVZRBXXqO_MaXrKIj9ngXQRnCf4zY5BrAhcx-BJ19W",
            description:
                "November 9, 2018 - NHS commemorated the induction of 164 new members into the National Honor Society of 2018. Each applicant demonstrated their commitment and their outstanding charater in the community.",
        },
        {
            original:
                "https://lh6.googleusercontent.com/Ktpcw4-RlODA-9YWrW__7epmxu1HE0W4S0g-F24422pXpU_zR16GIJOqDV06Bo5G5S7W2ht3Kec-mGOcddet0H-XxGL_SL3WCzNo-Q1GfZ6QCMPYVAx_nMK3-OpoeRGmyBarfJ6r",
            description:
                "December 16, 2019 - The Annual Holiday Party Group Service Project is dedicated to giving gifts to families in need. In 2019, NHS completed its 3rd successful Holiday Party, helping over 50 families in the Loudoun community.",
        },
        {
            original:
                "https://lh3.googleusercontent.com/rnGKk7ce7O6WmaWzonR401oHNQhPrTXSmtMJhh8HcUuz0MMUMgcUDmVwR7fXJ33qBGuTV5dy1T8NxOxvODThYauVUeIZpOTbE-SwAylRCex2ybjJrjfqCQs9m-OzZAbHnqPdcxEE",
            description:
                "December 16, 2019 - Santa handing out gifts to kids at the Holiday Party Group Service Project",
        },
        {
            original:
                "https://lh4.googleusercontent.com/d_GGbUJRxCh0ZmUCTobhbHUkPSF7P1WqJye1xbscj6JT6Rb0VDC3sYcGPper-W3K2w6twQZapqVo_Iekopr4Bd0EksmmyN9VhiQbjg9vwFcwQ8_8fTr0irU5YTvz5tWy2kiAW9Xz",
            description:
                "October 13, 2018 - Racing towards the finish, front runners charge towards the finish line to complete the race against cancer. With over 100 registrants, the Riverside Run for the Cure campaign was a huge success.",
        },
        {
            original:
                "https://lh5.googleusercontent.com/W4DVr_Ou5PQH7an1kX2UiS0vJIPMtjxzZHRMQTp4T9sZkr5eIPKdDtX1bI8qajYfbBzntfyHmvo3biE8ttLF7rDsNbkazO4i5yjmLXqzx6zNfU8UtvrGBeK9yBF6-VUHKcrCNx1C",
            description:
                "October 13, 2018 - Run for the Cure runners celebrated the successful completion of their united race against cancer.",
        },
    ];

    useEffect(() => {
        function checkPos() {
            let el1 = 200;
            let el2 = 200;
            let el3 = 200;
            let el4 = 200;
            try {
                el1 = document
                    .querySelector("#about-column-1")
                    .getBoundingClientRect().top;
                el2 = document
                    .querySelector("#about-column-2")
                    .getBoundingClientRect().top;
                el3 = document
                    .querySelector("#about-column-3")
                    .getBoundingClientRect().top;
                el4 = document
                    .querySelector("#about-column-4")
                    .getBoundingClientRect().top;
            } catch (error) {
                console.log(error);
                setHidden(4);
            }
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
            <HeadTag />
            <Navbar />
            <HeroSection />
            <div className="page-wrapper" id="index">
                <div className="columns columns-wrapper is-multiline">
                    <div
                        className="column about-section is-full is-bg-light"
                        id="about-column-1">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered is-multiline"
                            }>
                            <div className="column about-section-text is-full">
                                <div className="about-section-header">
                                    Volunteer. Lead. Serve.
                                </div>
                                <div className="about-section-body">
                                    National Honor Society is dedicated to
                                    empowering communities through meaningful
                                    service. With Group Service Projects,
                                    Individual Volunteering, and the most
                                    successful tutoring program in Loudoun
                                    County, the Riverside Chapter is making a
                                    difference. Think you've got what it takes?
                                </div>
                            </div>
                            <div className="column about-section-gallery is-8 is-offset-2">
                                <br></br>
                                <ImageGallery
                                    items={images}
                                    showBullets={true}
                                    showThumbnails={false}
                                    autoPlay={true}
                                    slideDuration={1000}
                                    slideInterval={7000}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column about-divider is-bg-shade">
                        <div className="custom-shape-divider-top-1629403421">
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
                    </div>
                    <div
                        className="column about-section is-full is-bg-shade"
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
                    <div className="column about-divider is-bg-shade">
                        <div className="custom-shape-divider-bottom-1629403947">
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
                    </div>
                    <div
                        className="column about-section is-full is-bg-light"
                        id="about-column-2">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered" +
                                (hidden >= 2 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text align-right is-half">
                                <div className="about-section-header">
                                    Service
                                </div>
                                <div className="about-section-body">
                                    Members have an enthusiastic and encouraging
                                    attitude while dedicating time and effort to
                                    making a positive difference. Service is
                                    about giving back to the community through
                                    meaningful ways with the intent of
                                    improvement.
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
                    <div className="column about-divider is-bg-shade">
                        <div className="custom-shape-divider-top-1629404117">
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
                    </div>
                    <div
                        className="column about-section is-full is-bg-shade"
                        id="about-column-3">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered" +
                                (hidden >= 3 ? "" : " is-scroll-hidden")
                            }>
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
                    <div className="column about-divider is-bg-shade">
                        <div className="custom-shape-divider-bottom-1629404241">
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
                    </div>
                    <div
                        className="column about-section is-full is-bg-light"
                        id="about-column-4">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered" +
                                (hidden >= 4 ? "" : " is-scroll-hidden")
                            }>
                            <div className="column about-section-text align-right is-half">
                                <div className="about-section-header">
                                    Character
                                </div>
                                <div className="about-section-body">
                                    Character is the combination of being
                                    courteous, respectful of others, and
                                    possessing high principles of ethics. Every
                                    member of NHS demonstrates courtesy,
                                    respectfulness, honesty, and reliability.
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
                    <div className="column about-divider is-bg-blue">
                        <div className="custom-shape-divider-top-1629404316">
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
                    </div>
                    <div
                        className="column about-section is-full is-bg-blue"
                        id="about-column-4">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered"
                            }>
                            <div className="column about-section-text is-full">
                                <div className="about-section-header is-white">
                                    Want an NHS website at your school?
                                </div>
                                <div className="about-section-body is-white">
                                    We're on a mission to revolutionize
                                    operations of National Honor Society
                                    chapters through a dynamic website portal.
                                    To learn more, please contact us.
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

export default Index;
