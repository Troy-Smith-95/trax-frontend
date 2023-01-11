import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './Components/Header/Header';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import FAQPage from './pages/FAQPage/FAQPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

function App() {
  //State to determine which page is currently active
  const [location, setLocation] = useState();
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(true);

  const authToken = sessionStorage.getItem('authToken');

  // if there is no auth token in session storage auth is failed
  useEffect(() => {
    if (!authToken) {
      setAuth(false);
      axios.get(URL + '/auth/profile', { withCredentials: true })
      .then((res) => {
        setAuth(true);
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        // If we are getting back 401 (Unauthorized) back from the server, means we need to log in
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
          setAuth(false);
        } else {
          console.log('Error authenticating', err);
        }
      });
    } else {
      axios
      .get( URL + '/users/profile', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setAuth(true);
        setUser(res.data);
      })
      .catch(() => {
        setAuth(false);
      })
    }
  }, [authToken]);
  
  
  return (
    <BrowserRouter>
    <div className='app'>
    {/* Conditionally render the header depending on where the location is (header isn't rendered on dashboard)  */}
    {location === '/signup' || location === '/login' || location === '/dashboard' || location === '/inspiration' || location === '/saved-music' || location === '/settings'? '': <Header auth={auth} setAuth={setAuth} />}
      <Routes>
          <Route path='/' element={<LandingPage setLocation={setLocation} auth={auth} />} />
          <Route path='/about' element={<AboutPage setLocation={setLocation}/>} />
          <Route path='/contact' element={<ContactPage setLocation={setLocation}/>} />
          <Route path='/faq' element={<FAQPage setLocation={setLocation}/>} />
          <Route path='/signup' element={<Signup setLocation={setLocation}/>} />
          <Route path='/login' element={<Login setLocation={setLocation}/>} />
          <Route path='/dashboard' element={<Dashboard setLocation={setLocation} user={user} setAuth={setAuth}/>}/>
          <Route path='/inspiration' element={<Dashboard setLocation={setLocation} user={user} setAuth={setAuth}/>}/>
          <Route path='/saved-music' element={<Dashboard setLocation={setLocation} user={user} setAuth={setAuth}/>}/>
          <Route path='/settings' element={<Dashboard setLocation={setLocation} user={user} setAuth={setAuth}/>}/>
          <Route path='/*' element={<LandingPage setLocation={setLocation}/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
