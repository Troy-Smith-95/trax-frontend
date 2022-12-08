import './Header.scss';
import mobileNavIcon from '../../assets/icons/mobile_nav_icon.svg';
import genreIcon from '../../assets/icons/genre_icon.svg';
import exitIcon from '../../assets/icons/exit.svg';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <header className='header'>
                <div className='header__container'>
                    <img onClick={() => { setModalOpen(true) }} className={`header__navIcon ${modalOpen ? "header__navIcon--none" : ""}`} src={mobileNavIcon} alt="Nav Icon" />
                    <div onClick={() => { navigate('/')}} className='header__logo'>
                        <img className='header__logoIcon' src={genreIcon} alt="Vinyl Record Icon" />
                        <h1 className='header__name'>Trax</h1>
                    </div>
                    <nav className='header__nav--tablet'>
                        <div className='header__navOptions'>
                            <NavLink to='/dashboard' className='header__dashboardLink'>Dashboard</NavLink>
                            <NavLink to='/about' className='header__link'>About</NavLink>
                            <NavLink to='/contact' className='header__link'>Contact Us</NavLink>
                            <NavLink to='/faq' className='header__link header__link--last'>FAQ</NavLink>
                        </div>
                    </nav>
                </div>
            </header>
            {modalOpen ? <div className="header__modal">
                <div className='header__closeAlignment'>
                    <img onClick={() => { setModalOpen(false) }} className='header__closeModal' src={exitIcon} alt="Exit" />
                </div>
                <nav className='header__nav'>
                    <div className='header__navOptions'>
                        <NavLink to='/dashboard' onClick={() => { setModalOpen(false) }} className='header__dashboardLink'>Dashboard</NavLink>
                        <NavLink to='/about' onClick={() => { setModalOpen(false) }} className='header__link header__link--top'>About</NavLink>
                        <NavLink to='/contact' onClick={() => { setModalOpen(false) }} className='header__link'>Contact Us</NavLink>
                        <NavLink to='/faq' onClick={() => { setModalOpen(false) }} className='header__link'>FAQ</NavLink>
                    </div>
                </nav>

            </div> : ""}
        </>
    );
}

export default Header;