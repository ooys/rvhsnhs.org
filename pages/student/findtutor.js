import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import withAuth from "/components/auth/withAuth.js";
import { useRouter } from "next/router";

function TuteeApply() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="tutee-apply"></div>
            <Footer />
        </>
    );
}

export default withAuth(TuteeApply, "student");
