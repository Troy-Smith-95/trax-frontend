import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Features from '../../Components/Features/Features';
import Hero from '../../Components/Hero/Hero';
import StartNow from '../../Components/StartNow/StartNow';
import WeeklyStats from '../../Components/WeeklyStats/WeeklyStats';
import './LandingPage.scss';

function LandingPage({setLocation, auth}) {
    const location = useLocation();

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);
    
    return (
        <>
        <div className='landingPage'>
            <Hero auth={auth}/>
            <WeeklyStats/>
            <Features/>
            <StartNow auth={auth}/>
        </div>
        </>
    );
}

export default LandingPage;