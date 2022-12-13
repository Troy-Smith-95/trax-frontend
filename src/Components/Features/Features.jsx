import './Features.scss';
import playlistsGraphic from '../../assets/images/playlists_graphic.svg';
import soundIcon from '../../assets/icons/sound_icon.svg';
import chartIcon from '../../assets/icons/chart_icon.svg';
import acousticness from '../../assets/images/acousticness.svg';
import danceability from '../../assets/images/danceability.svg';
import instrumentalness from '../../assets/images/instrumentalness.svg';
import inspirationIcon from '../../assets/icons/inspiration_icon.svg';
import playlist1Icon from '../../assets/images/playlist1_icon.png';
import playlist2Icon from '../../assets/images/playlist2_icon.png';
import playlist3Icon from '../../assets/images/playlist3_icon.png';
import playlist4Icon from '../../assets/images/playlist4_icon.png';

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
            <div className='features__feature'>
                <div className='features__container'>
                    <img className='features__icon' src={chartIcon} alt="" />
                    <h2 className='features__title'>Visualize and compare data</h2>
                    <p className='features__text'>Our dashboard makes it easy to see the changes in the sounds of genres and make comparisons to other genres, artists, songs or playlists.</p>
                </div>
                <div className='features__graphic features__graphic--flexStart'>
                    <img className='features__dataGraphic features__dataGraphic--one' src={acousticness} alt="acousticness" />
                    <img className='features__dataGraphic features__dataGraphic--two' src={danceability} alt="danceability" />
                    <img className='features__dataGraphic features__dataGraphic--three' src={instrumentalness} alt="instrumentalness" />
                </div>
            </div>
            <div className='features__feature'>
                <div className='features__graphic--flexCenter'>
                    <img className='features__playlistGraphic' src={playlist1Icon} alt="acousticness" />
                    <img className='features__playlistGraphic' src={playlist2Icon} alt="danceability" />
                    <img className='features__playlistGraphic' src={playlist3Icon} alt="instrumentalness" />
                    <img className='features__playlistGraphic' src={playlist4Icon} alt="instrumentalness" />
                </div>
                <div className='features__container'>
                    <img className='features__icon' src={inspirationIcon} alt="" />
                    <h2 className='features__title'>Get inspiration for the music you want to make</h2>
                    <p className='features__text'>Trax can generate playlists and save them right to your Spotify based on a specific sound profile to help give you some inspiration for your next track.</p>
                </div>
            </div>
        </section>
    );
}

export default Features;