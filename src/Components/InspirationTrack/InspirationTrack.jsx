import './InspirationTrack.scss';

function InspirationTrack({ track }) {
    return (
        <div className='inspirationTrack'>
            <div className='inspirationTrack__imgContainer'>
                <img className='inspirationTrack__img' src={track.artwork} alt={track.name} />
            </div>
            <div  className='inspirationTrack__info'>
                <p className='inspirationTrack__name'>{track.name}</p>
                <p className='inspirationTrack__artist'>{track.artist}</p>
            </div>

        </div>
    );
}

export default InspirationTrack;