import './Features.scss';
import playlistsGraphic from '../../assets/images/playlists_graphic.svg';
import soundIcon from '../../assets/icons/sound_icon.svg';

function Features() {
    return (
        <section className='features'>
            <div className='features__feature'>
                <img className='features__graphic' src={playlistsGraphic} alt="" />
                <div className='features__container'>
                    <img className='features__icon' src={soundIcon} alt="" />
                    <h2 className='features__title'>See how taste makers evolve</h2>
                    <p className='features__text'>We generate our insights through tracking Spotify’s premier editorial playlists so you can stay on top of the sounds that catch their ear.</p>
                </div>

            </div>

        </section>
    );
}

export default Features;