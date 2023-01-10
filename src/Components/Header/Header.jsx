import './Header.scss';
import mobileNavIcon from '../../assets/icons/mobile_nav_icon.svg';
import genreIcon from '../../assets/icons/genre_icon.svg';
import exitIcon from '../../assets/icons/exit.svg';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header({ auth, setAuth }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);
    const navigate = useNavigate();
    
    //Delays the closing of the modal menu on mobile so the animation can play out
    useEffect(() => {
        setTimeout(() => {
            setModalOpen(false);
            setModalClosing(false);
        }, 400)
    }, [modalClosing]);

    const handleLogout = () => {
        setAuth(false);
    
        // remove token from session storage
        sessionStorage.removeItem('authToken');
      }
    

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
                            { auth ? <NavLink to='/dashboard' className='header__dashboardLink'>Dashboard</NavLink> : <NavLink to='/signup' className='header__dashboardLink'>Sign up</NavLink> }
                            <NavLink to='/about' className='header__link'>About</NavLink>
                            <NavLink to='/contact' className='header__link'>Contact Us</NavLink>
                            <NavLink to='/faq' className='header__link header__link--last'>FAQ</NavLink>
                            { auth ? <p className='header__link header__link--signout' onClick={handleLogout}>Sign out</p> : <NavLink to='/login' className='header__link header__link--login'>Login</NavLink>}
                        </div>
                    </nav>
                </div>
            </header>
            {/* Modal for navigation in mobile  */}
            {modalOpen ? <div className={`${modalClosing ? "header__modal header__modal--closing" : "header__modal"}`}>
                <div className='header__closeAlignment'>
                    <img onClick={() => { setModalClosing(true) }} className={`${modalClosing ? "header__closeModal header__closeModal--closing" : "header__closeModal"}`} src={exitIcon} alt="Exit" />
                </div>
                <nav className='header__nav'>
                    <div className={`${modalClosing ? "header__navOptions header__navOptions--closing" : "header__navOptions"}`}>
                        { auth ? <NavLink to='/dashboard' onClick={() => { setModalOpen(false) }} className='header__dashboardLink'>Dashboard</NavLink> : <NavLink to='/signup' onClick={() => { setModalOpen(false) }} className='header__dashboardLink'>Sign Up</NavLink>}
                        <NavLink to='/about' onClick={() => { setModalOpen(false) }} className='header__link header__link--top'>About</NavLink>
                        <NavLink to='/contact' onClick={() => { setModalOpen(false) }} className='header__link'>Contact Us</NavLink>
                        <NavLink to='/faq' onClick={() => { setModalOpen(false) }} className='header__link'>FAQ</NavLink>
                        <NavLink to='/login' onClick={() => { setModalOpen(false) }} className='header__link'>Login</NavLink>
                    </div>
                </nav>
            </div> : ""}
        </>
    );
}

export default Header;