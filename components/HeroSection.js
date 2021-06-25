import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function HeroSection() {
    const router = useRouter();
    return (
        <div className="hero-container">
            <video src="video-1.mp4" autoPlay loop muted />
            <span className="hero-title">National Honor Society</span>
            <span className="hero-subtitle">Riverside High School Chapter</span>
            <a
                className="hero-button"
                onClick={() => {
                    router.push("/apply");
                }}>
                Join Now
                <span className="hero-button-icon">
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </span>
            </a>
            <img
                className="hero-logo"
                src="/images/newnhslogo.png"
                alt="Riverside NHS"></img>
        </div>
    );
}

export default HeroSection;
