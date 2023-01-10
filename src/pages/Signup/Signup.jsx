import './Signup.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isEmail, isEmpty, isStrongPassword } from "validator";
import genreIcon from '../../assets/icons/genre_icon.svg';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

function Signup({ setLocation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isUniqueUser, setIsUniqueUser] = useState(true);
    const [isUniqueUsername, setIsUniqueUsername] = useState(true);
    const [success, setSuccess] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    //check is username is unique as the user types
    useEffect(() => {
        if (username.length !== 0) {
            setTimeout(() => {
                axios.post(URL + "/users/username", { username })
                    .then((response) => {
                        if (response.status === 200) {
                            setIsUniqueUsername(true);
                        }
                    })
                    .catch((error) => {
                        console.log("error username");
                        if (error.response.data.message === "Username already exists") {
                            setIsUniqueUsername(false);
                        }
                    });
            }, 500)
        }

    }, [username]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsUniqueUser(true);
        setSuccess(true);

        if (
            isEmpty(username) ||
            isEmpty(email) ||
            isEmpty(password) ||
            isEmpty(confirmPassword) ||
            !isEmail(email) ||
            !isStrongPassword(password) ||
            !isUniqueUsername ||
            password !== confirmPassword
        ) {
            setIsValid(false);

            return;
        } else {
            const newUser = {};
            newUser.username = username;
            newUser.email = email;
            newUser.password = password;
            setIsValid(true);

            axios.post(URL + "/users/register", newUser)
                .then((res) => {
                    e.target.reset();
                    sessionStorage.setItem("authToken", res.data.token);
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.message === "User already exists") {
                        setIsUniqueUser(false);
                    }
                    if (error.response.data.message === "Username already exists") {
                        setIsUniqueUsername(false);
                    }
                    if (error.response.status === 500) {
                        setSuccess(false);
                    }
                });
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
                    {!isUniqueUsername ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__error'>Username already exists!</p>
                        </>
                        : ""}
                    {isUniqueUsername && !isEmpty(username) ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__good'>Valid username!</p>
                        </>
                        : ""}
                </div>
                <div className='signup__input'>
                    <label className='signup__label' htmlFor="email">Email:</label>
                    <input className='signup__field' type="text" name='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    {!isValid && !isEmail(email) ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__error'>A valid email is required!</p>
                        </>
                        : ""}
                    {!isUniqueUser ?
                        <>
                            <div className='signup__offset'></div>
                            <p className='signup__error'>User already exists!</p>
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
                {!success ?
                        <>
                            <p className='signup__error--center'>Unable to create new user!</p>
                        </>
                        : ""}
                <p className='signup__text'>
                    Have an account? <Link className='signup__login' to="/login">Log in</Link>
                </p>
            </form>
        </main>
    );
}

export default Signup;