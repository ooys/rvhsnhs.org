import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Steps, { Step } from "rc-steps";
import swal from "sweetalert";

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
                                "columns about-section-wrapper is-vcentered is-multiline is-6"
                            }>
                            <div className="column findtutor-about-section-text is-half">
                                <div className="about-section-header">
                                    Need a tutor?
                                </div>
                                <div className="about-section-body">
                                    Riverside High School National Honor Society
                                    runs one of the the most successful tutoring
                                    programs in Loudoun County. You are only 4
                                    steps away from pairing with an experienced
                                    high school tutor.
                                </div>
                                <br></br>
                                <a
                                    className="tutor-button"
                                    onClick={() => {
                                        swal(
                                            "LCPS Google Account Needed!",
                                            "Riverside NHS Tutoring is only available for students currently enrolled in LCPS. Please login to our portal with the tutee's LCPS Google Account to access the registration site.",
                                            "warning"
                                        ).then(() => {
                                            router.push("/student/findtutor");
                                        });
                                    }}>
                                    Apply here
                                    <span className="hero-button-icon">
                                        <FontAwesomeIcon
                                            icon={
                                                faArrowRight
                                            }></FontAwesomeIcon>
                                    </span>
                                </a>
                            </div>
                            <div className="column findtutor-steps is-half">
                                <Steps direction="vertical" status="wait">
                                    <Step
                                        title="Tutee Registration"
                                        description="Fill in a quick form to let us know your preferences. Don't worry, your information is secure within Riverside NHS."
                                    />
                                    <Step
                                        title="Tutor Matching"
                                        description="This step is all on us! We will pair you up with one of our Riverside NHS tutors."
                                    />
                                    <Step
                                        title="Scheduling Sessions"
                                        description="You work with your tutor to select a suitable meeting time."
                                    />
                                    <Step
                                        title="Tutoring Begins"
                                        description="Meet your tutor virtually or in a Riverside classroom. Top-notch tutoring experience starts here."
                                    />
                                </Steps>
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
                <div className="column about-section is-full is-bg-shade">
                    <div className="columns tutor-stats-wrapper is-multiline">
                        <div className="column is-full tutor-stats-header">
                            In SY 2020-2021, we had...
                        </div>
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">658</div>
                            <div className="tutor-stats-text">
                                Tutoring Pairs
                            </div>
                        </div>
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">2013</div>
                            <div className="tutor-stats-text">
                                Tutoring Sessions
                            </div>
                        </div>
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">1500+</div>
                            <div className="tutor-stats-text">
                                Tutoring Hours
                            </div>
                        </div>
                        <div className="column is-quarter tutor-stats-section">
                            <div className="tutor-stats-title">30+</div>
                            <div className="tutor-stats-text">
                                Subjects Tutored
                            </div>
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

export default FindTutor;
