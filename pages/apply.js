import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";

function Apply() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="apply">
                <div className="big-eligibililty">
                    <p> Eligibility </p>
                </div>
                <p>
                    <div className="eligibility-list">
                        National Honor Society is open to juniors and seniors
                        only. Possible candidates will be first notified in the
                        Fall. A student who meets the following requirements
                        will be considered.
                        <br /> <br />
                        <li>
                            Must have been in attendance for at least the
                            equivalent of one full semester at Riverside.
                        </li>
                        <li>A member of the junior or senior class</li>
                        <li>
                            Met the minimum scholarship requirement of a 3.50
                            cumulative GPA.
                        </li>{" "}
                        <br />
                        All academically eligible students are then given the
                        opportunity to complete an application by a specific
                        date. As a minimum, each candidate must have the
                        following.
                        <li>
                            Demonstrate full participation in at least two
                            school activities
                        </li>
                        <li>Have verifiable community and school service</li>
                        <li>
                            Practice leadership through either elective office,
                            positions of responsibility, or documented
                            opportunities
                        </li>
                        <li>Exemplify the highest standard of character.</li>
                        <br />
                        Membership in NHS is an honor, not a right, and is based
                        upon outstanding achievement in each of the four areas
                        mentioned. A Faculty Council consisting of faculty
                        members selected by the principal has the duty of
                        determining which academically-eligible students have
                        met not only the minimum criteria, but have gone on to
                        establish themselves as truly outstanding young people
                        as demonstrated in the information forms supplied at the
                        time of selection.
                    </div>
                </p>
                <a
                    className="apply-button"
                    onClick={() => {
                        router.push("/application");
                    }}>
                    Apply Here
                    <span className="apply-button-icon"></span>
                </a>
                <div className="apply-text">
                    Applications are not reviewed on a rolling basis.
                    Applications to the Naional Honor Society will be reviewed
                    during the next application period. Please ensure you fill
                    every part of the application as it can only be submitted
                    once.
                    <br />
                    <br /> Applications for Fall 2021-2022 are due September
                    30th <br /> Applications for Spring 2021-2022 are due
                    February 28th
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Apply;
