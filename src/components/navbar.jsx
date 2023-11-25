import { React, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../components/firebase/config';
import { getAuth } from 'firebase/auth'
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, getDocs } from "firebase/firestore";
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify'

function Navbar(props) {

    const rupees = '₹';

    const { headerClass, header, navMenu, homePic, aboutPic, themeButtonClass, themechange, toggleMenu, navToggle, navMenuClass, home, homelink, about, Aboutlink, product, Productlink, contact, Contactlink, toggleClose, navClose, product1, product2, product3, product4, product5, product6 } = props;

    const [Products, setProducts] = useState([])

    const navigate = useNavigate();

    const navLogin = () => {
        navigate('/accounts/login')
    }

    const [User, setUser] = useState(false)

    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {

        getAuth().onAuthStateChanged((user) => {
            if (user != null) {
                setUserEmail(user.email)
                setUser(true)
            } else {
                setUser(false)
            }
        })

        const productsChannelRef = collection(db, "products")

        const getProducts = async () => {
            const data = await getDocs(productsChannelRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getProducts();

    })

    const navProfile = () => {
        navigate('/accounts/myprofile')
    }

    const getProducts = async () => {
        const productsChannelRef = doc(collection(db, "carts"), getAuth().currentUser?.uid)
        const data = await getDocs(productsChannelRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const toggle = (e) => {
        getAuth().onAuthStateChanged((user) => {
            if (user != null) {
                navigate(`/product/${e.id}`)
            } else {
                navigate(`/accounts/login`)
            }
        })
    }

    const form = useRef();

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [nameS, setNameS] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_f8jk7n1', 'template_df0gknl', form.current, 'EmguC0ZpaB8hxm6p5')
            .then((result) => {
                setEmail('');
                setSubject('');
                setMessage('');
                setNameS('');
                toast.success('Message sent', {
                    position: "top-left",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                })
            }, (error) => {
                toast.error(`Some = ${error}`, {
                    position: "top-left",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                })
                console.log(error);
            });
    };

    return (

        <>
            <ToastContainer />
            <header className={headerClass} id={header}>
                <nav className="nav container">
                    <a className="nav__logo">
                        <i className="ri-leaf-line nav__logo-icon"  ></i>Paintings
                    </a>

                    <div className={navMenuClass} id={navMenu}>
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="#home" onClick={home} className={homelink} >Home</a>
                            </li>
                            <li className="nav__item">
                                <a href="#about" onClick={about} className={Aboutlink} >About</a>
                            </li>
                            <li className="nav__item">
                                <a href="#products" onClick={product} className={Productlink} >Products</a>
                            </li>
                            <li className="nav__item">
                                <a href="#contact" onClick={contact} className={Contactlink} >Contact Us</a>
                            </li>
                            {
                                User ?
                                    <li className="nav__item">
                                        <button className='signup-button' onClick={navProfile} style={{ fontSize: '12px' }}  > <i class="ri-user-fill"></i> {userEmail.slice(0, 3)} </button>
                                    </li>
                                    :
                                    <li className="nav__item">
                                        <button className='signup-button' onClick={navLogin} >Login</button>
                                    </li>
                            }
                        </ul>

                        <div className="nav__close" onClick={toggleClose} id={navClose}>
                            <i className="ri-close-line"></i>
                        </div>
                    </div>

                    {/* <div className="cart-icon">
                    <i class="ri-shopping-cart-line" style={{ fontSize: '20px' }} ></i>
                    <span className="item-count">{cartItemCount}</span>
                </div> */}

                    <div className="nav__btns">
                        {/* <i className={themeButtonClass} onClick={themechange} id="theme-button"></i> */}

                        <div className="nav__toggle" onClick={toggleMenu} id={navToggle}>
                            <i className="ri-menu-line"></i>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main */}
            <main className="main">
                <section className="home" id="home">
                    <div className="home__container container grid">
                        <img src={homePic} alt="" className="home__img" />

                        <div className="home__data">
                            <h1 className="home__title">
                                Paints will make <br /> your life better
                            </h1>
                            <p className="home__description">
                                Select incredible frame design for your paintings.
                                Add fresness to your new wall.
                            </p>
                            <a href="#about" className="button button--flex">
                                Explore <i className="ri-arrow-right-down-line button__icon"></i>
                            </a>
                        </div>

                        <div className="home__social">
                            <span className="home__social-follow">Follow Us</span>

                            <div className="home__social-links">
                                <a href="https://www.facebook.com/" target="_blank" className="home__social-link">
                                    <i className="ri-facebook-fill"></i>
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" className="home__social-link">
                                    <i className="ri-instagram-line"></i>
                                </a>
                                <a href="https://twitter.com/" target="_blank" className="home__social-link">
                                    <i className="fa-brands fa-x-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about section container" id="about">
                    <div className="about__container grid">
                        <img src={aboutPic} alt="" className="about__img" />

                        <div className="about__data">
                            <h2 className="section__title about__title">
                                Who we really are & <br /> why choose us
                            </h2>

                            <p className="about__description">
                                Hello, I'm Beevi Fatima, the artist and soul behind hbspaintings. With a passion for art that has been my lifelong companion, I decided to embark on a creative journey to share my world of colors and emotions with art enthusiasts like you. Each stroke of my brush is a heartfelt expression, and every canvas I create is a window into my imagination. From vibrant abstracts to serene landscapes, my paintings reflect the beauty and wonder I find in the world around me. I invite you to explore my gallery, where you'll discover a unique collection of artworks that aim to inspire, evoke emotions, and add a touch of artistic elegance to your space. Thank you for joining me on this artistic voyage, and I look forward to sharing my passion for painting with you.
                            </p>

                            {/* <div className="about__details">
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    We always deliver on time.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    We give you guides to protect and care for your products.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    100% money back guaranteed.
                                </p>
                            </div> */}

                            <a href="#products" className="button--link button--flex">
                                Shop Now <i className="ri-arrow-right-down-line button__icon"></i>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="steps section container">
                    <div className="steps__bg">
                        <h2 className="section__title-center steps__title">
                            Steps to start your <br /> products off right
                        </h2>

                        <div className="steps__container grid">
                            <div className="steps__card">
                                <div className="steps__card-number">01</div>
                                <h3 className="steps__card-title">Choose Product</h3>
                                <p className="steps__card-description">
                                    We have several varieties paintings you can choose from.
                                </p>
                            </div>

                            <div className="steps__card">
                                <div className="steps__card-number">02</div>
                                <h3 className="steps__card-title">Place an order</h3>
                                <p className="steps__card-description">
                                    Once your order is set, we move to the next step which is the shipping.
                                </p>
                            </div>

                            <div className="steps__card">
                                <div className="steps__card-number">03</div>
                                <h3 className="steps__card-title">Get products delivered</h3>
                                <p className="steps__card-description">
                                    Our delivery process is easy, you receive the product direct to your door.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="product section container" id="products">
                    <h2 className="section__title-center">
                        Check out our <br /> products
                    </h2>

                    <p className="product__description">
                        Here are some selected products from our showroom, all are in excellent
                        art and has a long life span. Buy and enjoy best quality.
                    </p>

                    <div className="product__container grid">

                        {
                            Products.map((item, index) => {
                                // setImmg(item.image)
                                return (
                                    <>

                                        <article className="product__card" key={index}>
                                            <div className="product__circle"></div>



                                            <LazyLoad>
                                                <Link to={`/product/${item.id}`} >  <img src={item.image} alt="" className="product__img" onClick={() => toggle(item)} /></Link>
                                            </LazyLoad>

                                            <h3 className="product__title" >{item.title}</h3>
                                            <p className='mes' >{item.mes}</p>
                                            <span className="product__price">₹{item.amount}</span>

                                            <button className="button--flex product__button" >
                                                <i className="ri-shopping-cart-fill" ></i>
                                            </button>

                                        </article>

                                    </>
                                );
                            })
                        }
                    </div>
                </section>

                <section className="contact section container" id="contact">
                    <div className="contact__container grid">
                        <div className="contact__box">
                            <h2 className="section__title">
                                Reach out to us today <br /> via any of the given <br /> information
                            </h2>

                            <div className="contact__data">
                                <div className="contact__information">
                                    <h3 className="contact__subtitle">Call us for instant support</h3>
                                    <span className="contact__description">
                                        <i className="ri-phone-line contact__icon"></i>
                                        +91 98470 21166
                                    </span>
                                </div>

                                <div className="contact__information">
                                    <h3 className="contact__subtitle">Write us by mail</h3>
                                    <span className="contact__description">
                                        <i className="ri-mail-line contact__icon"></i>
                                        paintingshbs@gmail.com
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <form className="contact__form" ref={form} onSubmit={sendEmail} >
                            <div className="contact__inputs">
                                <div className="contact__content">
                                    <input type="email" className="contact__input" name='user_email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label className="contact__label">Email</label>
                                </div>

                                <div className="contact__content">
                                    <input type="text" className="contact__input" name='user_name' value={nameS} onChange={(e) => setNameS(e.target.value)} required />
                                    <label className="contact__label">Name</label>
                                </div>

                                <div className="contact__content">
                                    <input type="text" className="contact__input" name='subject' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                                    <label className="contact__label">Subject</label>
                                </div>

                                <div className="contact__content contact__area">
                                    <textarea className="contact__input" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required ></textarea>
                                    <label className="contact__label">Message</label>
                                </div>
                            </div>

                            <button className="button button--flex" type='submit' >
                                Send Message
                                <i className="ri-arrow-right-up-line button__icon"></i>
                            </button>
                        </form>
                        {/*  */}
                    </div>
                </section>
            </main>

        </>

    )

}

export default Navbar
