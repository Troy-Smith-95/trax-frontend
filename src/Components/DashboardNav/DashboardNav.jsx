import { NavLink, useNavigate } from 'react-router-dom';
import mobileNavIcon from '../../assets/icons/mobile_nav_icon.svg';
import genreIcon from '../../assets/icons/genre_icon.svg';
import cancelIcon from '../../assets/icons/exit.svg';
import dataIcon from '../../assets/icons/data_icon.svg';
import lightbulbIcon from '../../assets/icons/lightbulb_icon.svg';
import musicIcon from '../../assets/icons/music_icon.svg';
import settingsIcon from '../../assets/icons/settings_icon.svg';
import exitIcon from '../../assets/icons/exit_icon.svg';
import './DashboardNav.scss';
import { useEffect, useState } from 'react';

const URL = process.env.REACT_APP_URL;

function DashboardNav({ user, setAuth }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);

    const navigate = useNavigate();

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
        //navigate to home page
        navigate('/');
    }

    if (!user) {
        return
    }

    return (
        <>
            <header className='dashboardNav'>
                <div className='dashboardNav__container'>
                    <img onClick={() => { setModalOpen(true) }} className={`dashboardNav__navIcon ${modalOpen ? "dashboardNav__navIcon--none" : ""}`} src={mobileNavIcon} alt="Nav Icon" />
                    <div className='dashboardNav__wrapper'>
                        <div className='dashboardNav__bar'>
                            <div className="dashboardNav__logo">
                                <img className='dashboardNav__icon' src={genreIcon} alt="Genre Icon" />
                                <h1>Trax</h1>
                            </div>
                            <nav className='dashboardNav__nav'>
                                <div className="dashboardNav__navOptions">
                                    <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                                        <img className='dashboardNav__linkIcon' src={dataIcon} alt='Data Icon' />
                                        <p className='dashboardNav__linkText'>Dashboard</p>
                                    </NavLink>
                                    <NavLink to='/inspiration' className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                                        <img className='dashboardNav__linkIcon' src={lightbulbIcon} alt='Data Icon' />
                                        <p className='dashboardNav__linkText'>Inspiration</p>
                                    </NavLink>
                                    <NavLink to='/saved-music' className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                                        <img className='dashboardNav__linkIcon' src={musicIcon} alt='Data Icon' />
                                        <p className='dashboardNav__linkText'>Saved Music</p>
                                    </NavLink>
                                    <NavLink to='/settings' className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                                        <img className='dashboardNav__linkIcon' src={settingsIcon} alt='Data Icon' />
                                        <p className='dashboardNav__linkText'>Settings</p>
                                    </NavLink>
                                    <NavLink to='/' className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                                        <img className='dashboardNav__linkIcon' src={exitIcon} alt='Data Icon' />
                                        <p className='dashboardNav__linkText'>Exit</p>
                                    </NavLink>
                                </div>
                            </nav>
                            <div className='dashboardNav__status'>
                                <p className='dashboardNav__user'>{`Logged in as ${user.username ? user.username : user.display_name}`}</p>
                                {sessionStorage.getItem('authToken') ? <p className='dashboardNav__user--signout' onClick={handleLogout}>Sign out?</p> : <a className='dashboardNav__user--signoutLink' href={URL + '/auth/logout'}>Sign out?</a>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {modalOpen ? <div className={`${modalClosing ? "dashboardNav__modal dashboardNav__modal--closing" : "dashboardNav__modal"}`}>
                <div className='dashboardNav__closeAlignment'>
                    <img onClick={() => { setModalClosing(true) }} className={`${modalClosing ? "dashboardNav__closeModal dashboardNav__closeModal--closing" : "dashboardNav__closeModal"}`} src={cancelIcon} alt="Exit" />
                </div>
                <div className={`${modalClosing ? "dashboardNav__logo dashboardNav__logo--closing" : "dashboardNav__logo"}`}>
                    <img className='dashboardNav__icon' src={genreIcon} alt="Genre Icon" />
                    <h1>Trax</h1>
                </div>
                <nav className='dashboardNav__nav'>
                    <div className={`${modalClosing ? "dashboardNav__navOptions dashboardNav__navOptions--closing" : "dashboardNav__navOptions"}`}>
                        <NavLink to='/dashboard' onClick={() => { setModalOpen(false) }} className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                            <img className='dashboardNav__linkIcon' src={dataIcon} alt='Data Icon' />
                            <p className='dashboardNav__linkText'>Dashboard</p>
                        </NavLink>
                        <NavLink to='/dashboard/inspiration' onClick={() => { setModalOpen(false) }} className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                            <img className='dashboardNav__linkIcon' src={lightbulbIcon} alt='Data Icon' />
                            <p className='dashboardNav__linkText'>Inspiration</p>
                        </NavLink>
                        <NavLink to='/dashboard/saved-music' onClick={() => { setModalOpen(false) }} className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                            <img className='dashboardNav__linkIcon' src={musicIcon} alt='Data Icon' />
                            <p className='dashboardNav__linkText'>Saved Music</p>
                        </NavLink>
                        <NavLink to='/dashboard/settings' onClick={() => { setModalOpen(false) }} className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                            <img className='dashboardNav__linkIcon' src={settingsIcon} alt='Data Icon' />
                            <p className='dashboardNav__linkText'>Settings</p>
                        </NavLink>
                        <NavLink to='/' onClick={() => { setModalOpen(false) }} className={({ isActive }) => isActive ? 'dashboardNav__link dashboardNav__link--active' : 'dashboardNav__link'}>
                            <img className='dashboardNav__linkIcon' src={exitIcon} alt='Data Icon' />
                            <p className='dashboardNav__linkText'>Exit</p>
                        </NavLink>
                    </div>
                </nav>
                <div className={`${modalClosing ? "dashboardNav__status dashboardNav__status--closing" : "dashboardNav__status"}`}>
                    <p className='dashboardNav__user'>{`Logged in as ${user.username ? user.username : user.display_name}`}</p>
                    {sessionStorage.getItem('authToken') ? <p className='dashboardNav__user--signout' onClick={handleLogout}>Sign out?</p> : <a className='dashboardNav__user--signoutLink' href={URL + '/auth/logout'}>Sign out?</a>}
                </div>
            </div> : ""}
        </>
    );
}

export default DashboardNav;