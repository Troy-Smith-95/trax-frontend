import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './Components/Header/Header';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import FAQPage from './pages/FAQPage/FAQPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './pages/Signup/Signup';

function App() {
  //State to determine which page is currently active
  const [location, setLocation] = useState();
  
  return (
    <BrowserRouter>
    <div className='app'>
    {/* Conditionally render the header depending on where the location is (header isn't rendered on dashboard)  */}
    {location === '/signup' || location === '/dashboard' || location === '/inspiration' || location === '/saved-music' || location === '/settings'? '': <Header/>}
      <Routes>
          <Route path='/' element={<LandingPage setLocation={setLocation}/>} />
          <Route path='/about' element={<AboutPage setLocation={setLocation}/>} />
          <Route path='/contact' element={<ContactPage setLocation={setLocation}/>} />
          <Route path='/faq' element={<FAQPage setLocation={setLocation}/>} />
          <Route path='/signup' element={<Signup setLocation={setLocation}/>} />
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
