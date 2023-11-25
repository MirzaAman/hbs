import React, { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../components/firebase/config'
import { ToastContainer, toast } from 'react-toastify'

import rzr from '../assets/img/rzp.png'
import upi from '../assets/img/upi.webp'
import { useNavigate } from 'react-router-dom';

const FooterPage = (props) => {

    const { card1, card2, card3, card4, scrollUpClass, scrollUpId } = props;

    const [email,setEmail] = useState('');

    const navigate = useNavigate();

    const productsChannelRef = collection(db, "emails")

    const subscribe = async () => {
        if(email.length>0){
            try {
                await addDoc(productsChannelRef, {
                    mail: email
                  }).then((e)=>{
                    setEmail('');
                    toast.success('Your email has been  added to our subscription list',{
                        position: "top-left",
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    })
                  })
            } catch (error) {
                toast.error('Something went wrong!',{
                    position: "top-left",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                })
            }
        }else{
            toast.error('Please enter your email',{
                position: "top-left",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            })
        }
    }

    return (
        <>
        <ToastContainer/>
            <footer className="footer section">
                <div className="footer__container container grid">
                    <div className="footer__content">
                        <a href="#" className="footer__logo">
                            <i className="ri-leaf-line footer__logo-icon"></i> Paintings
                        </a>

                        <h3 className="footer__title">
                            Subscribe to our newsletter <br /> to stay update
                        </h3>

                        <div className="footer__subscribe">
                            <input type="email" placeholder="Enter your email" className="footer__input" value={email} onChange={(e)=>setEmail(e.target.value)} />

                            <button className="button button--flex footer__button" onClick={subscribe} >
                                Subscribe
                                <i className="ri-arrow-right-up-line button__icon"></i>
                            </button>
                        </div>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer__title">Our Address</h3>

                        <ul className="footer__data">
                            <li className="footer__information">Chekumarakkar agham</li>
                            <li className="footer__information">valachukettiyi parambe</li>
                            <li className="footer__information">calicut, 673571</li>
                            <li className="footer__information">+91 98470 21166</li>
                        </ul>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer__title">Contact Us</h3>

                        <ul className="footer__data">
                            <li className="footer__information">+91 98470 21166</li>

                            <div className="footer__social">
                                <a href="https://www.facebook.com/" className="footer__social-link">
                                    <i className="ri-facebook-fill"></i>
                                </a>
                                <a href="https://www.instagram.com/" className="footer__social-link">
                                    <i className="ri-instagram-line"></i>
                                </a>
                                <a href="https://twitter.com/" className="footer__social-link">
                                <i className="fa-brands fa-x-twitter"></i>
                                </a>
                            </div>
                        </ul>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer__title">
                            We accept payment methods
                            {/* We accept Payment using Razorpay */}
                        </h3>

                        <div className="footer__cards">
                            <img src={card1} alt="" className="footer__card" />
                            <img src={card2} alt="" className="footer__card" />
                            {/* <img src={rzr} alt="" className="footer__card" /> */}
                            <img src={upi} alt="" className="footer__card" />
                        </div>
                    </div>
                </div>

                <div className="rz">
                    <p className="footer__copy2"> <a id='prc' onClick={()=>{navigate('/contact')}}> Contact us </a></p>
                    <p className="footer__copy2"> <a id='prc' onClick={()=>{navigate('/privacy-and-policy')}}> Privacy & Policy </a></p>
                    <p className="footer__copy2"> <a id='prc' onClick={()=>{navigate('/terms-and-condtions')}}> Terms & Conditions </a></p>
                    <p className="footer__copy2"> <a id='prc' onClick={()=>{navigate('/cancel-and-return')}}> Cancellation & Refund Policy </a></p>
                </div>
                <p className="footer__copy">&#169; HBS Paintings. All rigths reserved</p>
                <p className="footer__copy1">Designed and Developed by Mirza aman</p>
            </footer>
            <a href="#" className={scrollUpClass} id={scrollUpId}>
                <i className="ri-arrow-up-fill scrollup__icon"></i>
            </a>
        </>

    )
}
export default FooterPage
