import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function FindTutor() {
    const router = useRouter();
    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="findtutor">
                <div className="columns">
                    <div className="column about-section is-full is-bg-light">
                        <div
                            className={
                                "columns about-section-wrapper is-vcentered is-multiline"
                            }>
                            <div className="column about-section-text is-full">
                                <div className="about-section-header">
                                    Need a tutor?
                                </div>
                                <div className="about-section-body">
                                    Riverside High School runs the most
                                    successful tutoring program in Loudoun
                                    County. We make sure that every student that
                                    needs a tutor, gets one.
                                </div>
                            </div>
                            <div className="column about-section-text is-full">
                                <div className="columns about-section-split">
                                    <div className="column tutor-button-wrapper is-half">
                                        <a
                                            className="tutor-button"
                                            onClick={() => {
                                                router.push(
                                                    "/student/findtutor"
                                                );
                                            }}>
                                            Sign up
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column about-section is-full is-bg-shade">
                    <div className="columns tutor-stats-wrapper">
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">600+</div>
                            <div className="tutor-stats-text">
                                students tutored in over
                            </div>
                        </div>
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">30</div>
                            <div className="tutor-stats-text">
                                different subjects
                            </div>
                        </div>
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">600+</div>
                            <div className="tutor-stats-text">
                                students tutored in over
                            </div>
                        </div>
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">30</div>
                            <div className="tutor-stats-text">
                                different subjects
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
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
                    {/* <div className="column benefit-1 is-half is-offset-one-quarter">
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
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FindTutor;
