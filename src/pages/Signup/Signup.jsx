import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Signup.scss';
import genreIcon from '../../assets/icons/genre_icon.svg';


function Signup({ setLocation }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    return (
        <main className='signup'>
            <form className='signup__form'>
                <div onClick={() => { navigate('/') }} className='signup__logo'>
                    <img className='signup__logoIcon' src={genreIcon} alt="Vinyl Record Icon" />
                    <h1>Trax</h1>
                </div>
                <h2 className='signup__prompt'>Welcome to Trax! Let's get started.</h2>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="username">Username:</label>
                    <input className='signup__field' type="text" name='username' placeholder='Username' />
                </div>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="email">Email:</label>
                    <input className='signup__field' type="email" name='email' placeholder='Email' />
                </div>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="password">Password:</label>
                    <input className='signup__field' type="password" name='password' placeholder='Password' />
                </div>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="confirmPassword">Confirm Password:</label>
                    <input className='signup__field' type="password" name='confirmPassword' placeholder='Confirm Password' />
                </div>
                <button className='signup__button'>Sign Up</button>

                <p className='signup__text'>
                    Have an account? <Link className='signup__login' to="/login">Log in</Link>
                </p>

            </form>
        </main>
    );
}

export default Signup;