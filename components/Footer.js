import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

//<Button buttonStyle='btn--outline'>Subscribe</Button>

function Footer() {
    return (
        <div className="footer-container">
            {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the National Honor Society newsletter to receive updates for volunteering opportunities
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            
          </form>
        </div>
      </section> */}
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link href="/about">Our work</Link>
                        {/* <Link href="/">Apply</Link> */}
                        <Link href="/">Officers</Link>
                        <Link href="/">Sponsors</Link>
                        <Link href="/">Terms of Service</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Apply</h2>
                        <Link href="/">Trailer</Link>
                        <Link href="/">Requirements</Link>
                        <Link href="/">Application Portal</Link>
                        <Link href="/">Officer Positions</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Member</h2>
                        <Link href="/login/member">Login</Link>
                        <Link href="/member/opportunities">Volunteer</Link>
                        <Link href="/member/tutoring">Tutoring</Link>
                        <Link href="/profile">Profile</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Officer</h2>
                        <Link href="/login/officer">Portal</Link>
                    </div>
                    {/* <div className="footer-link-items">
                        <h2>Social Media</h2>
                        <Link href="/">Instagram</Link>
                        <Link href="/">Facebook</Link>
                        <Link href="/">Youtube</Link>
                        <Link href="/">Twitter</Link>
                    </div> */}
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link href="/" className="social-logo">
                            <img
                                className="footer-icon"
                                src="/images/newnhslogo.png"
                                alt="/images/img-1.jpg"
                            />
                        </Link>
                    </div>
                    <small className="website-rights">NHS © 2021</small>
                    <div className="social-icons">
                        <a
                            className="icon-anchor"
                            id="footer-button-email"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="mailto:michaelsong4399@gmail.com,1036566@lcps.org">
                            <span className="icon fa-2x">
                                <FontAwesomeIcon
                                    icon={faEnvelope}></FontAwesomeIcon>
                            </span>
                        </a>
                        <a
                            className="icon-anchor"
                            id="footer-button-github"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/rvhsnhs15/">
                            <span className="icon fa-2x">
                                <FontAwesomeIcon
                                    icon={fab.faInstagram}></FontAwesomeIcon>
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
