import './WeeklyStats.scss';
import playlistIcon from '../../assets/icons/playlist_icon.svg';
import songIcon from '../../assets/icons/song_icon.svg';
import dataIcon from '../../assets/icons/data_icon.svg';
import genreIcon from '../../assets/icons/genre_icon.svg';

function WeeklyStats() {
    return (
        <section className='weeklyStats'>
            <h3 className='weeklyStats__title'>What we look at every week</h3>
            <div className='weeklyStats__container'>
                <div className='weeklyStats__statContainer'>
                    <img className='weeklyStats__icon' src={playlistIcon} alt="Playlist Icon" />
                    <p className='weeklyStats__stat'>100+</p>
                    <p className='weeklyStats__label'>Playlists</p>
                </div>
                <div className='weeklyStats__statContainer'>
                    <img className='weeklyStats__icon' src={songIcon} alt="Playlist Icon" />
                    <p className='weeklyStats__stat'>5000+</p>
                    <p className='weeklyStats__label'>Songs</p>
                </div>
                <div className='weeklyStats__statContainer'>
                    <img className='weeklyStats__icon' src={dataIcon} alt="Playlist Icon" />
                    <p className='weeklyStats__stat'>25K+</p>
                    <p className='weeklyStats__label'>Data Points</p>
                </div>
                <div className='weeklyStats__statContainer'>
                    <img className='weeklyStats__icon' src={genreIcon} alt="Playlist Icon" />
                    <p className='weeklyStats__stat'>15</p>
                    <p className='weeklyStats__label'>Genres</p>
                </div>
            </div>
        </section>
    );
}

export default WeeklyStats;