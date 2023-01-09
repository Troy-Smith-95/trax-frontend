import './Login.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isEmail, isEmpty} from "validator";
import genreIcon from '../../assets/icons/genre_icon.svg';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

function Signup({ setLocation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [success, setSuccess] = useState(true);
    const [validCredentials, setValidCredentials] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setSuccess(true);
        setValidCredentials(true);

        if (
            isEmpty(email) ||
            isEmpty(password) ||
            !isEmail(email)
        ) {
            setIsValid(false);

            return;
        } else {
            setIsValid(true);

            axios.post(URL + "/users/login", {
                email: e.target.email.value,
                password: e.target.password.value
            })
                .then((res) => {
                    e.target.reset();
                    sessionStorage.setItem("authToken", res.data.token);
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401 || error.status === 400) {
                        setValidCredentials(false);
                    } else {
                        setSuccess(false);
                    }
                });
        }
    }

    return (
        <main className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <div onClick={() => { navigate('/') }} className='login__logo'>
                    <img className='login__logoIcon' src={genreIcon} alt="Vinyl Record Icon" />
                    <h1>Trax</h1>
                </div>
                <h2 className='login__prompt'>Log in to continue.</h2>
                <div className='login__input'>
                    <label className='login__label' htmlFor="email">Email:</label>
                    <input className='login__field' type="text" name='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    {!isValid && !isEmail(email) ?
                        <>
                            <div className='login__offset'></div>
                            <p className='login__error'>A valid email is required!</p>
                        </>
                        : ""}
                </div>
                <div className='login__input'>
                    <label className='login__label' htmlFor="password">Password:</label>
                    <input className='login__field' type="password" name='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {!isValid && isEmpty(password) ?
                        <>
                            <div className='login__offset'></div>
                            <p className='login__error'>This field is required!</p>
                        </>
                        : ""}
                </div>
                <button className='login__button'>Log in</button>
                {!validCredentials ?
                    <>
                        <p className='login__error--center'>Incorrect email and/or password</p>
                    </>
                    : ""}
                {!success ?
                    <>
                        <p className='login__error--center'>Unable to log in user</p>
                    </>
                    : ""}
                <p className='login__text'>
                    Don't have an account? <Link className='login__login' to="/signup">Sign up</Link>
                </p>
            </form>
        </main>
    );
}

export default Signup;