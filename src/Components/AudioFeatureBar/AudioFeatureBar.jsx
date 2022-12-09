import './AudioFeatureBar.scss';
import ProgressBar from "@ramonak/react-progress-bar";
import infoIcon from '../../assets/icons/info_icon.svg';

function AudioFeatureBar({ feature, value}) {
    return (
        <div className='audioFeatureBar'>
            <div className='audioFeatureBar__feature'>
                <h3 className='audioFeatureBar__name'>{feature}</h3>
                <img className='audioFeatureBar__info' src={infoIcon} alt="Info Icon" />
            </div>
            <ProgressBar completed={value * 100} isLabelVisible={false} baseBgColor={'#1db95466'} bgColor={'#1DB954'}/>
            <div className='audioFeatureBar__range'>
                <p className='audioFeatureBar__value'>0</p>
                <p className='audioFeatureBar__value'>1</p>
            </div>
        </div>
    );
}

export default AudioFeatureBar;