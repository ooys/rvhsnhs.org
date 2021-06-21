import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

function SignIn () {
    return (
        <>
            <Link to='/Member' className='nav-links'>
                <Button
                className='google-login'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                >
                Sign in with google
                </Button>
            </Link>
        </>
    );
}

export default SignIn;