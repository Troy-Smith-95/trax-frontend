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
    } else {
      setAuth(true);
    }
  }, [authToken]);
  
  
  return (
    <BrowserRouter>
    <div className='app'>
    {/* Conditionally render the header depending on where the location is (header isn't rendered on dashboard)  */}
    {location === '/signup' || location === '/login' || location === '/dashboard' || location === '/inspiration' || location === '/saved-music' || location === '/settings'? '': <Header auth={auth} setAuth={setAuth} />}
      <Routes>
          <Route path='/' element={<LandingPage setLocation={setLocation}/>} />
          <Route path='/about' element={<AboutPage setLocation={setLocation}/>} />
          <Route path='/contact' element={<ContactPage setLocation={setLocation}/>} />
          <Route path='/faq' element={<FAQPage setLocation={setLocation}/>} />
          <Route path='/signup' element={<Signup setLocation={setLocation}/>} />
          <Route path='/login' element={<Login setLocation={setLocation}/>} />
          <Route path='/dashboard' element={<Dashboard setLocation={setLocation}/>}/>
          <Route path='/inspiration' element={<Dashboard setLocation={setLocation}/>}/>
          <Route path='/saved-music' element={<Dashboard setLocation={setLocation}/>}/>
          <Route path='/settings' element={<Dashboard setLocation={setLocation}/>}/>
          <Route path='/*' element={<LandingPage setLocation={setLocation}/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
