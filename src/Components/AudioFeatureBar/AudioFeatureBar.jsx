import './AudioFeatureBar.scss';
import ProgressBar from "@ramonak/react-progress-bar";
import infoIcon from '../../assets/icons/info_icon.svg';
import exitIcon from '../../assets/icons/exit.svg';
import { useState } from 'react';

function AudioFeatureBar({ feature, value, info }) {
    const [moreInfo, setMoreInfo] = useState(false);

    return (
        <div className='audioFeatureBar'>
            <div className='audioFeatureBar__feature'>
                <h3 className='audioFeatureBar__name'>{feature}</h3>
                <img onClick={() => {setMoreInfo(true)}} className='audioFeatureBar__info' src={infoIcon} alt="Info Icon" />
            </div>
            <ProgressBar completed={value * 100} isLabelVisible={false} baseBgColor={'#1db95466'} bgColor={'#1DB954'}/>
            <div className='audioFeatureBar__range'>
                <p className='audioFeatureBar__value'>0</p>
                <p className='audioFeatureBar__value'>1</p>
            </div>
            {moreInfo ? <div className='audioFeatureBar__infoOverlay'>
                <img onClick={() => {setMoreInfo(false)}} className='audioFeatureBar__exit' src={exitIcon} alt="Exit Icon" />
                <p className='audioFeatureBar__infoText'>{info.info}</p>
                <p className='audioFeatureBar__infoText audioFeatureBar__infoText--bold'>{`Current Value: ${value}`}</p>
            </div>: ''}
        </div>
    );
}

export default AudioFeatureBar;