import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNav from '../../Components/DashboardNav/DashboardNav';
import Analysis from '../Analysis/Analysis';
import Inspiration from '../Inspiration/Inspiration';
import './Dashboard.scss';

function Dashboard({ setLocation }) {
    const location = useLocation();

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='dashboard'>
                <DashboardNav />
                <div className='dashboard__page'>
                    <div className='dashboard__content'>
                        {location.pathname === '/dashboard' ? <Analysis /> : ''}
                        {location.pathname === '/inspiration' ? <Inspiration /> : ''}
                    </div>
                </div>


            </div>

        </>

    );

}

export default Dashboard;