import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './Components/Header/Header';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import FAQPage from './pages/FAQPage/FAQPage';

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
    <Header/>
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/faq' element={<FAQPage/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
