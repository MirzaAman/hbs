// from React 
import { useState, useEffect } from 'react';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Razorpay from "razorpay";
// css
import './assets/css/styles.css'
// Images
import homePic from './assets/img/home.png'
import aboutPic from './assets/img/about.png'
// Product Images
import product1 from './assets/img/product1.png'
import product2 from './assets/img/product2.png'
import product3 from './assets/img/product3.png'
import product4 from './assets/img/product4.png'
import product5 from './assets/img/product5.png'
import product6 from './assets/img/product6.png'
// footer images
import card1 from './assets/img/card1.png'
import card2 from './assets/img/card2.png'
import card3 from './assets/img/card3.png'
import card4 from './assets/img/card4.png'
// components
import Navbar from './components/navbar';
import HomePage from './components/HomePage';
import FooterPage from './components/FooterPage';

function App() {

    const [navMenu, setNavMenu] = useState('nav-menu');
    const [navMenuClass, setnavMenuClass] = useState('nav__menu');
    const [navToggle, setnavToggle] = useState('nav-toggle');
    const [navClose, setnavClose] = useState('nav-close');
    const [header, setheader] = useState('header');
    const [headerClass, setheaderClass] = useState('header');

    const [homelink, setHomelink] = useState('nav__link active-link');
    const [Aboutlink, setAboutlink] = useState('nav__link');
    const [Productlink, setProductlink] = useState('nav__link');
    const [Contactlink, setContactlink] = useState('nav__link');

    const [scrollUpId, setScrollUpId] = useState('scroll-up')
    const [scrollUpClass, setScrollUpClass] = useState('scrollup');

    const [themeButtonClass, setThemeButtonClass] = useState('ri-moon-line change-theme');

    const toggleMenu = () => {
        if (navToggle == 'nav-toggle') {
            setnavMenuClass('nav__menu show-menu');
        }
    }

    const toggleClose = () => {
        if (navClose == 'nav-close') {
            setnavMenuClass('nav__menu');
        }
    }

    const navLink = document.querySelectorAll('.nav__link');
    const linkAction = () => {
        setnavMenuClass('nav__menu');
    }
    navLink.forEach(n => n.addEventListener('click', linkAction))

    const scrollHeader = () => {
        if (window.scrollY >= 80) {
            setheaderClass('header scroll-header');
        } else {
            setheaderClass('header')
        }
    }
    window.addEventListener('scroll', scrollHeader)

    const home = () => {
        setHomelink('nav__link active-link');
        setAboutlink('nav__link');
        setProductlink('nav__link');
        setContactlink('nav__link');
    }

    const about = () => {
        setHomelink('nav__link');
        setAboutlink('nav__link active-link');
        setProductlink('nav__link');
        setContactlink('nav__link');
    }

    const product = () => {
        setHomelink('nav__link');
        setAboutlink('nav__link');
        setProductlink('nav__link active-link');
        setContactlink('nav__link');
    }

    const contact = () => {
        setHomelink('nav__link');
        setAboutlink('nav__link');
        setProductlink('nav__link ');
        setContactlink('nav__link active-link');
    }

    const scrollUp = () => {
        if (window.scrollY >= 400) setScrollUpClass('scrollup show-scroll'); else setScrollUpClass('scrollup')
    }
    window.addEventListener('scroll', scrollUp)

    useEffect(() => {

        const theme = localStorage.getItem('themeData')
        document.body.classList.add(theme)
        const icon = localStorage.getItem('themeIcon')
        setThemeButtonClass(`${icon} change-theme`)
    })

    const themechange = () => {
        if (themeButtonClass == 'ri-moon-line change-theme') {
            document.body.classList.add('dark-theme')
            setThemeButtonClass('ri-sun-line change-theme')
            localStorage.setItem('themeData', 'dark-theme')
            localStorage.setItem('themeIcon', 'ri-sun-line')
        } else {
            document.body.classList.remove('dark-theme')
            setThemeButtonClass('ri-moon-line change-theme')
            localStorage.setItem('themeData', 'light-theme');
            localStorage.setItem('themeIcon', 'ri-moon-line')
        }
    }

    // const razorpay = new Razorpay({
    //     key_id: "YOUR_KEY_ID",
    //     key_secret: "YOUR_KEY_SECRET",
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (amm === '') {
    //         alert('Please enter the amount')
    //     } else {
    //         var options = {
    //             key: "rzp_test_HBLUGDMBUap2sf",
    //             key_secret: "NZgDBte6a9k8ikY9JRmgVQIl",
    //             amount: amm,
    //             currency: "INR",
    //             name: "STARTUP_PROJECTS",
    //             description: "for testing purpose",
    //             handler: function (response) {
    //                 alert(response.razorpay_payment_id);
    //                 const address = options.notes.address;
    //                 console.log("Address:", address);
    //             },
    //             prefill: {
    //                 name: "Mirza aman",
    //                 email: "mzawyd@gmail.com",
    //                 contact: "8129004343"
    //             },
    //             notes: {
    //                 address: "something adress here",
    //             },
    //             theme: {
    //                 color: "#3399cc",
    //             }
    //         };
    //         var pay = new window.Razorpay(options);
    //         pay.open();
    //     }
    // }

    const [amm, setAmm] = useState('');

    return (
        <>
            <Navbar
                product1={product1} product2={product2} product3={product3} product4={product4} product5={product5} product6={product6}
                homePic={homePic} aboutPic={aboutPic}
                headerClass={headerClass} header={header} navMenu={navMenu}
                themeButtonClass={themeButtonClass} themechange={themechange}
                toggleMenu={toggleMenu} navToggle={navToggle} navMenuClass={navMenuClass}
                home={home} homelink={homelink} about={about} Aboutlink={Aboutlink} product={product}
                Productlink={Productlink} contact={contact} Contactlink={Contactlink} toggleClose={toggleClose}
                navClose={navClose}
            />

            <FooterPage
                card1={card1} card2={card2} card3={card3} card4={card4} scrollUpClass={scrollUpClass} scrollUpId={scrollUpId}
            />

        </>
    );
}

export default App;
