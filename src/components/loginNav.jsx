import React from 'react'
import { useNavigate } from 'react-router-dom';


function LoginNav(props) {
    const { headerClass, header, navMenu, themeButtonClass, themechange, toggleMenu, navToggle, navMenuClass, home, homelink, about, Aboutlink, product, Productlink, contact, Contactlink, toggleClose, navClose, } = props;

    const navigate = useNavigate();

    const homeNav = () => {
        navigate('/')
    }

    return (
        <header className={headerClass} id={header}>
            <nav className="nav container">
                <a href="#" className="nav__logo">
                    <i className="ri-leaf-line nav__logo-icon"></i> Paintings
                </a>

                <div className={navMenuClass} id={navMenu}>
                    <ul className="nav__list">
                        <li className="nav__item">
                            <button id='goHomeBtn' onClick={homeNav} >
                            <i className="ri-arrow-left-line"></i>
                            <a href="#home" className='nav__link'>      Go back</a>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default LoginNav
