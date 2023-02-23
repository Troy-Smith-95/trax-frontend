import './InspirationSlider.scss';

function InspirationSlider( { audioFeatureName, audioFeatureValue, audioFeatures, setAudioFeatures} ) {
    return (
        <div className='inspirationSlider__query'>
            <h3 className='inspirationSlider__parameter'>{audioFeatureName}</h3>
            <input className='inspirationSlider__number' type="number" name={audioFeatureName} readOnly={false} min={0} max={1} step={0.001} value={audioFeatureValue} onChange={(e) => { setAudioFeatures({ ...audioFeatures, [audioFeatureName]: e.target.value }) }} />
            <input className='inspirationSlider__range' type="range" min={0} max={1} step={0.001} value={audioFeatureValue} onChange={(e) => { setAudioFeatures({ ...audioFeatures, [audioFeatureName]: e.target.value }) }} />
            <p className='inspirationSlider__value'>0</p>
            <p className='inspirationSlider__value'>1</p>
        </div>
    );
}

export default InspirationSlider;