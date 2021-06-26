import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";

function About() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="about">
                <div className="big-about-us">
                    <p> About Us </p>
                </div>
                <div className="about-us-body-text">
                    <p>
                        The Riverside High School chapter of the National Honor
                        Society was established in 2015 and is committed to
                        serving the community while upholding the values of
                        scholarship, service, leadership and character. These
                        four pillars have been upheld in the organization since
                        its inception in 1921. All students in NHS are expected
                        to attend monthly meetings as scheduled at the start of
                        the year, maintain their standards of selection, and to
                        complete a specific quantity of quality service hours as
                        determined by the organization’s leadership with support
                        by the Faculty Council and school principal. NHS
                        meetings are only subject to change in emergencies or by
                        administrative approval. Officers are obligated to meet
                        prior to the full NHS meeting as required by the NHS
                        adviser. Any NHS student who misses three meetings
                        throughout the course of the school year or who fails to
                        complete the required service hours by the assigned due
                        dates at the end of the first and/or second semesters
                        may be dismissed from the organization by the Faculty
                        Council.
                    </p>
                </div>
                <div className="officers-big-text">
                    <p> Officers </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
