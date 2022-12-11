import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNav from '../../Components/DashboardNav/DashboardNav';
import Analysis from '../Analysis/Analysis';
import Inspiration from '../Inspiration/Inspiration';
import leftArrow from '../../assets/icons/left_arrow.svg';
import upArrow from '../../assets/icons/up_arrow.svg';
import infoIcon from '../../assets/icons/info_icon.svg';
import './Dashboard.scss';

function Dashboard({ setLocation }) {
    const location = useLocation();
    const [explained, setExplained] = useState(false);
    const [explainedStep1, setExplainedStep1] = useState(false);

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='dashboard'>
                <DashboardNav/>
                <div className='dashboard__page'>
                    <div className='dashboard__content'>
                        {location.pathname === '/dashboard' ? <Analysis explained={explained} setExplained={setExplained} explainedStep1={explainedStep1} setExplainedStep1={setExplainedStep1} /> : ''}
                        {location.pathname === '/inspiration' ? <Inspiration /> : ''}
                        {explained ? <div className='dashboard__explained'>
                            {!explainedStep1 ?
                                <>
                                    <img className='dashboard__leftArrow' src={leftArrow} alt="Left Arrow" />
                                    <img className='dashboard__upArrow' src={upArrow} alt="Left Arrow" />
                                    <p className='dashboard__selectGenre'>{"Select a Genre to Analyze"}</p>
                                </>
                                : ""}
                            {explainedStep1 ? <div className='dashboard__explainFeatures'>
                                <p className='dashboard__text'>View average audio feature of the current week</p>
                                <p className='dashboard__text'>Click on the <img className='dashboard__infoIcon' src={infoIcon} alt='info'/> icon to learn more about a specific audio feature</p>
                                <p className='dashboard__text'>See how the audio features change from week to week in the trends section</p>
                                <p className='dashboard__text'>Click audio features at bottom of trends chart to remove them</p>
                            </div> : ''}
                        </div> : ''}
                    </div>
                </div>
            </div>

        </>

    );

}

export default Dashboard;