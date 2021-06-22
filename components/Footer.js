import React from 'react';
import Link from "next/link";

//<Button buttonStyle='btn--outline'>Subscribe</Button>

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
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
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link href='/sign-up'>How it works</Link>
            <Link href='/'>Website Tour</Link>
            <Link href='/'>Officers</Link>
            <Link href='/'>Sponsors</Link>
            <Link href='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link href='/'>Contact</Link>
            <Link href='/'>Support</Link>
            <Link href='/'>FAQ</Link>
            <Link href='/'> </Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Apply</h2>
            <Link href='/'>Requirements</Link>
            <Link href='/'>Submit Application</Link>
            <Link href='/'>Trailer</Link>
            <Link href='/'>Officer Positions</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link href='/'>Instagram</Link>
            <Link href='/'>Facebook</Link>
            <Link href='/'>Youtube</Link>
            <Link href='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link href='/' className='social-logo'>
              
              <img className='footer-icon' src="/images/newnhslogo.png" alt="/images/img-1.jpg" />
            </Link>
          </div>
          <small className='website-rights'>NHS © 2021</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              href='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              href='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              href='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              href='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              href='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;