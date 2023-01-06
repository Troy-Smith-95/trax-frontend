import './Signup.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isEmail, isEmpty, isStrongPassword } from "validator";
import genreIcon from '../../assets/icons/genre_icon.svg';


function Signup({ setLocation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValid, setIsValid] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        if (
            isEmpty(username) ||
            isEmpty(email) ||
            isEmpty(password) ||
            isEmpty(confirmPassword) ||
            !isEmail(email) ||
            !isStrongPassword(password) ||
            password !== confirmPassword
        ) {
            setIsValid(false);

            return;
        }

    }

    return (
        <main className='signup'>
            <form className='signup__form' onSubmit={handleSubmit}>
                <div onClick={() => { navigate('/') }} className='signup__logo'>
                    <img className='signup__logoIcon' src={genreIcon} alt="Vinyl Record Icon" />
                    <h1>Trax</h1>
                </div>
                <h2 className='signup__prompt'>Welcome to Trax! Let's get started.</h2>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="username">Username:</label>
                    <input className='signup__field' type="text" name='username' placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    {!isValid && isEmpty(username) ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__error'>This field is required!</p>
                        </>
                        : ""}
                </div>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="email">Email:</label>
                    <input className='signup__field' type="email" name='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    {!isValid && !isEmail(email) ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__error'>A valid email is required!</p>
                        </>
                        : ""}
                </div>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="password">Password:</label>
                    <input className='signup__field' type="password" name='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {!isValid && !isStrongPassword(password) ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__error'>Strong password required. Must be min 8 characters and contain at least 1 uppercase letter, lowercase letter, number and symbol</p>
                        </>
                        : ""}
                </div>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="confirmPassword">Confirm Password:</label>
                    <input className='signup__field' type="password" name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    {!isValid && password !== confirmPassword ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__error'>Passwords do not match!</p>
                        </>
                        : ""}
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