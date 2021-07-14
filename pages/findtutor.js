import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";

function FindTutor() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="findtutor">
                <div className="columns">
                    <div className="column is-full is-bg-light">
                        <div className="column tutor-intro-header">
                            Need a tutor?
                        </div>
                        <div className="column tutor-intro-body is-half">
                            Riverside High School runs the most successful
                            tutoring program in Loudoun County. We make sure
                            that every student that needs a tutor, gets one.
                        </div>
                        <a
                            className="column tutor-button"
                            onClick={() => {
                                //router.push("/apply");
                            }}>
                            Sign up
                        </a>
                        <img
                            src="images/books.png"
                            className="books-image"></img>
                    </div>
                </div>
                <div className="columns is-full is-bg-shade">
                    <div className="column">
                        <div className="benefit">600+</div>
                        <div className="column benefit-text">
                            students tutored in over
                        </div>
                        <div className="benefit">30</div>
                        <div className="column benefit-text">
                            different subjects
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
                    <div className="column">
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
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FindTutor;
