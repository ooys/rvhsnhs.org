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
    const badgenames = ["officer", "beta_tester", "bug_hunter", "overachiever", "volunteer_of_the_month", "colorrun", "holidayparty", "bronze", "trophy"];

    function BadgeModal({ name, title, src, desc, color }) {
        if (active === name) {
            return (
                <>
                    <div className="column listed-badge is-one-third">
                        <a
                            className="column listed-badge-wrapper"
                            onClick={() => {
                                setActive(name);
                            }}>
                            <img className="badge-pic" src={src} alt={title}></img>
                        </a>
                        <div className="listed-badge-name">{title}</div>
                    </div>
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
                    <div className="column listed-badge is-one-third">
                        <a
                            className="column listed-badge-wrapper"
                            onClick={() => {
                                setActive(name);
                            }}>
                            <img className="badge-pic" src={src} alt={title}></img>
                        </a>
                        <div className="listed-badge-name">{title}</div>
                    </div>
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
                desc = "Selected as Volunteer of the Month by the NHS committee.";
                src = "/images/badges/medal.svg";
                break;
            case "colorrun":
                title = "Color Run GSP";
                desc = "Volunteered in the Color Run GSP.";
                src = "/images/badges/colorrun.svg";
                break;
            case "holidayparty":
                title = "Holiday Party GSP";
                desc = "Volunteered in the Holiday Party GSP";
                src = "/images/badges/holidayparty.svg";
                break;
            case "bronze":
                title = "Bronze Rank";
                desc = "Members in the novice tier are often newer members or those who have yet to engage in significant volunteer work. While it may not be the most visually appealing badge, it’s a starting point for our volunteering journey.";
                src = "/images/badges/rank3.svg";
                break;
            case "trophy":
                title = "Mystery";
                desc = "A badge past Master tier? Impossible. ";
                src = "/images/badges/crystaltrophy.svg";
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
                                        {badgenames.map((name) => {
                                            return <Badge name={name} />;
                                        })}
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

export default Badges;
