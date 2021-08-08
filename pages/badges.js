import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import swal from "sweetalert";

function Badges() {
    const [active, setActive] = useState("");
    const router = useRouter();

    function BadgeModal({ name, title, src, desc, color }) {
        if (active === name) {
            return (
                <>
                    <a
                        className="column listed-badge-wrapper"
                        onClick={() => {
                            setActive(name);
                        }}>
                        <img className="badge-pic" src={src} alt={title}></img>
                    </a>
                    <div className="listed-badge-name">{title}</div>
                    <div className={"modal is-active"} id="badge-modal">
                        <div
                            className="modal-background"
                            onClick={() => {
                                setActive("");
                            }}></div>
                        <div className="modal-content" id="badge-modal-content">
                            <div className="columns is-mobile is-variable is-4 modal-wrapper">
                                <div className="column is-one-third modal-picture">
                                    <img
                                        className={"modal-badge " + color}
                                        src={src}
                                        alt={title}></img>
                                </div>
                                <div className="column is-two-thirds modal-text">
                                    <div className="modal-title">{title}</div>
                                    <hr></hr>
                                    <div className="modal-desc">{desc}</div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="modal-close is-large"
                            aria-label="close"
                            onClick={() => {
                                setActive("");
                            }}></button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <a
                        className="column listed-badge-wrapper"
                        onClick={() => {
                            setActive(name);
                        }}>
                        <img className="badge-pic" src={src} alt={title}></img>
                    </a>
                    <div className="listed-badge-name">{title}</div>
                </>
            );
        }
    }

    function Badge({ name }) {
        let src = "";
        let desc = "";
        let title = "";
        switch (name) {
            case "officer":
                title = "Officer";
                desc = "Is an National Honor Society Officer.";
                src = "/images/badges/officer.svg";
                break;
            case "beta_tester":
                title = "Beta Tester";
                desc =
                    "Helped test the National Honor Society Website in its beta stages.";
                src = "/images/badges/beta_tester.svg";
                break;
            case "bug_hunter":
                title = "Bug Hunter";
                desc = "Found and reported a significant bug.";
                src = "/images/badges/bug_hunter.svg";
                break;
            case "overachiever":
                title = "Overachiever";
                desc = "Logged in during a school break.";
                src = "/images/badges/overachiever.svg";
                break;
            case "volunteer_of_the_month":
                title = '"Volunteer of the Month" Award';
                desc =
                    "Selected as Volunteer of the Month by the NHS committee.";
                src = "/images/badges/medal.svg";
                break;
        }
        return (
            <BadgeModal
                name={name}
                title={title}
                src={src}
                desc={desc}
                color={""}
            />
        );
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="findtutor">
                <div className="columns">
                    <div className="column about-section is-full is-bg-light">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered is-multiline is-6"
                            }>
                            <div className="column is-full">
                                <div className="badges-section-header">
                                    Badges
                                </div>
                                <div className="badges-section-body">
                                    There are a ton of badges you can earn
                                    through your involvment in NHS. Click on a
                                    badge to learn more about it and how you can
                                    earn it.
                                </div>
                                <br></br>
                                <div className="columns badge-list is-multiline">
                                    <div className="column listed-badge is-one-third">
                                        <Badge name={"officer"} />
                                    </div>
                                    <div className="column listed-badge is-one-third">
                                        <Badge name={"beta_tester"} />
                                    </div>
                                    {/* <div className="column listed-badge is-one-third">
                                        <a
                                            className="column listed-badge-wrapper"
                                            onClick={() => {
                                                setActive("beta_tester");
                                            }}>
                                            <img
                                                className="badge-pic"
                                                src="/images/badges/beta_tester.svg"
                                                alt="Beta Tester"></img>
                                        </a>
                                        <div className="listed-badge-name">
                                            Beta Tester
                                        </div>
                                    </div>
                                    <div className="column listed-badge is-one-third">
                                        <a
                                            className="column listed-badge-wrapper"
                                            onClick={() => {
                                                setActive(title);
                                            }}>
                                            <img
                                                className="badge-pic"
                                                src="/images/badges/bug_hunter.svg"
                                                alt="Bug Hunter"></img>
                                        </a>
                                        <div className="listed-badge-name">
                                            Bug Hunter
                                        </div>
                                    </div>
                                    <div className="column listed-badge is-one-third is-offset-2">
                                        <a
                                            className="column listed-badge-wrapper"
                                            onClick={() => {
                                                setActive(title);
                                            }}>
                                            <img
                                                className="badge-pic"
                                                src="/images/badges/overachiever.svg"
                                                alt="Overachiever"></img>
                                        </a>
                                        <div className="listed-badge-name">
                                            Overachiever
                                        </div>
                                    </div>
                                    <div className="column listed-badge is-one-third">
                                        <a
                                            className="column listed-badge-wrapper"
                                            onClick={() => {
                                                setActive(title);
                                            }}>
                                            <img
                                                className="badge-pic"
                                                src="/images/badges/medal.svg"
                                                alt="Volunteer of the Month"></img>
                                        </a>
                                        <div className="listed-badge-name">
                                            Volunteer of the Month
                                        </div>
                                    </div>
                                    <div className="column listed-badge is-one-third"></div>
                                    <div className="column listed-badge is-one-third"></div>
                                    <div className="column listed-badge is-one-third"></div>
                                    <div className="column listed-badge is-one-third"></div> */}
                                </div>
                            </div>
                            {/* <div className="column about-section-text is-full">
                                <div className="columns about-section-split">
                                    <div className="column tutor-button-wrapper is-half">
                                        <a
                                            className="tutor-button"
                                            onClick={() => {
                                                router.push(
                                                    "/student/findtutor"
                                                );
                                            }}>
                                            Get started
                                            <span className="hero-button-icon">
                                                <FontAwesomeIcon
                                                    icon={
                                                        faArrowRight
                                                    }></FontAwesomeIcon>
                                            </span>
                                        </a>
                                    </div>
                                    <div className="column books-image-wrapper is-half">
                                        <img
                                            src="images/books.png"
                                            className=" books-image"></img>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* <div className="columns">
                    <div className="column">
                        <div className="column is-vcentered">
                            <div className="column tutoring-video-container is-half is-offset-one-quarter">
                                <div className="column black-bg"></div>
                            </div>
                            <div className="column tutoring-video-body is-offset-4">
                                Riverside Tutoring Promotional Video
                            </div>
                        </div>
                    </div>
                </div>
                WILL PROBABLY BE A TESTIMONIAL SECTION SOON
                <div className="columns is-full is-bg-shade">
                    <div className="column benefit-1 is-half is-offset-one-quarter">
                        <img
                            src="images\tutorimages\a-plus-best-test-result.png"
                            className="column benefit-image"></img>
                    </div>
                    <div className="column benefit-2 is-half is-offset-one-quarter">
                        <img
                            src="images\tutorimages\exchange.png"
                            className="column benefit-image"></img>
                    </div>
                    <div className="column benefit-3 is-half is-offset-one-quarter">
                        <img
                            src="images\tutorimages\tap.png"
                            className="column benefit-image"></img>
                    </div>
                </div> */}
            </div>
            <Footer />
        </>
    );
}

export default Badges;
