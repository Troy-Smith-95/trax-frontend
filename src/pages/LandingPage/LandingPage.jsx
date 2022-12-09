import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../Components/Hero/Hero';
import './LandingPage.scss';

function LandingPage({setLocation}) {
    const location = useLocation();

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);
    
    return (
        <>
        <div className='landingPage'>
            <Hero/>

        </div>
        </>
    );
}

export default LandingPage;