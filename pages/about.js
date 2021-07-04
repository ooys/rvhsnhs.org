import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";

function About() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="about"></div>
            <Footer />
        </>
    );
}

export default About;
