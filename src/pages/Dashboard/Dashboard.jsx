import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNav from '../../Components/DashboardNav/DashboardNav';
import Analysis from '../Analysis/Analysis';
import Inspiration from '../Inspiration/Inspiration';
import leftArrow from '../../assets/icons/left_arrow.svg';
import upArrow from '../../assets/icons/up_arrow.svg';
import infoIcon from '../../assets/icons/info_icon.svg';
import './Dashboard.scss';

function Dashboard({ setLocation, user, setAuth }) {
    const location = useLocation();
    //States to control the how to us tutorial
    const [explained, setExplained] = useState(false);
    const [explainedStep1, setExplainedStep1] = useState(false);
    const [explainedIns, setExplainedIns] = useState(false);
    const [explainedStep1Ins, setExplainedStep1Ins] = useState(false);

    useEffect(() => {
        setLocation(location.pathname);
        // eslint-disable-next-line
    }, []);

    console.log(explainedIns);
    console.log(explainedStep1Ins);

    return (
        <>
            <div className='dashboard'>
                <DashboardNav user={user} setAuth={setAuth} />
                <div className='dashboard__page'>
                    <div className='dashboard__content'>
                        {/* Navigation within the dashboard */}
                        {location.pathname === '/dashboard' ? <Analysis explained={explained} setExplained={setExplained} explainedStep1={explainedStep1} setExplainedStep1={setExplainedStep1} /> : ''}
                        {location.pathname === '/inspiration' ? <Inspiration explainedIns={explainedIns} setExplainedIns={setExplainedIns} explainedStep1Ins={explainedStep1Ins} setExplainedStep1Ins={setExplainedStep1Ins} user={user} /> : ''}
                        {/* Overlay to explain how to use dashboard */}
                        {explained ? <div className='dashboard__explained' onClick={() => { setExplained(false) }}>
                            {!explainedStep1 ?
                                <>
                                    <img className='dashboard__leftArrow' src={leftArrow} alt="Left Arrow" />
                                    <img className='dashboard__upArrow' src={upArrow} alt="Left Arrow" />
                                    <p className='dashboard__selectGenre'>{"Select a Genre to Analyze"}</p>
                                </>
                                : ""}
                            {explainedStep1 ? <div className='dashboard__explainFeatures'>
                                <p className='dashboard__text'>View average audio features of the current week for a given genre</p>
                                <p className='dashboard__text'>Click on the <img className='dashboard__infoIcon' src={infoIcon} alt='info' /> icon to learn more about a specific audio feature</p>
                                <p className='dashboard__text'>See how the audio features change from week to week in the trends section</p>
                                <p className='dashboard__text'>Click audio features at the bottom of the trends chart to remove them</p>
                                <p className='dashboard__text'>Learn more about Spotify Audio Features <a className='dashboard__link' target='_blank' rel="noreferrer" href='https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features'>HERE</a></p>
                            </div> : ''}
                        </div> : ''}
                        {explainedIns ? <div className='dashboard__explained' onClick={() => { setExplainedIns(false) }}>
                            {!explainedStep1Ins ?
                                <>
                                    <img className='dashboard__leftArrow' src={leftArrow} alt="Left Arrow" />
                                    <img className='dashboard__upArrow' src={upArrow} alt="Left Arrow" />
                                    <p className='dashboard__selectGenre'>{"Select a Genre to Analyze"}</p>
                                </>
                                : ""}
                            {explainedStep1Ins ? <div className='dashboard__explainFeatures'>
                                <p className='dashboard__text'>Change or keep the audio feature values for the genre</p>
                                <p className='dashboard__text'>Popularity refers to the popularity of the tracks determined by Spotify (0 to 100)</p>
                                <p className='dashboard__text'># of tracks refers to how many tracks will be on the playlist</p>
                                <p className='dashboard__text'>Generate a playlist that resembles the audio profile</p>
                                <p className='dashboard__text'>View the playlist and save it your Spotify account!</p>
                            </div> : ''}
                        </div> : ''}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Dashboard;