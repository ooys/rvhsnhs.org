import React from "react";

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="video-1.mp4" autoPlay loop muted />
            <h1>VOLUNTEER WITH NHS</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                GET STARTED WATCH TRAILER <i className="far fa-play-circle" />
            </div>
        </div>
    );
}

export default HeroSection;
