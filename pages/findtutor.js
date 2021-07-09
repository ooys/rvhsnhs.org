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
                                router.push("/apply");
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
                        <div className="column benefit-1">Benefit 1</div>
                        <div className="column benefit-2">Benefit 2</div>
                        <div className="column benefit-3">Benefit 3</div>
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
            </div>
            <Footer />
        </>
    );
}

export default FindTutor;
