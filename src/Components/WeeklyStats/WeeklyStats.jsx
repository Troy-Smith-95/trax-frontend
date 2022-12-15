import './WeeklyStats.scss';
import { motion } from "framer-motion";
import playlistIcon from '../../assets/icons/playlist_icon.svg';
import songIcon from '../../assets/icons/song_icon.svg';
import dataIcon from '../../assets/icons/data_icon.svg';
import genreIcon from '../../assets/icons/genre_icon.svg';

function WeeklyStats() {

    //For animations using framer library
    const statsVariant = {
        visible: {
            opacity: 1, scale: 1,
            transition: {
                staggerChildren: 0.5
            }
        },
        hidden: { opacity: 0, scale: 0 },
    }
    const item = {
        hidden: { opacity: 0 },
        visible: { opacity: 1,
            scale: [1, 1.5, 1],
        }
    }
    return (
        <section className='weeklyStats'>
            <h3 className='weeklyStats__title'>What we look at every week</h3>
            <div className='weeklyStats__box'>
                <motion.div variants={statsVariant} initial='hidden' whileInView='visible' className='weeklyStats__container'>
                    <motion.div variants={item} className='weeklyStats__statContainer'>
                        <img className='weeklyStats__icon' src={playlistIcon} alt="Playlist Icon" />
                        <p className='weeklyStats__stat'>100+</p>
                        <p className='weeklyStats__label'>Playlists</p>
                    </motion.div>
                    <motion.div variants={item} className='weeklyStats__statContainer'>
                        <img className='weeklyStats__icon' src={songIcon} alt="Playlist Icon" />
                        <p className='weeklyStats__stat'>5000+</p>
                        <p className='weeklyStats__label'>Songs</p>
                    </motion.div>
                    <motion.div variants={item} className='weeklyStats__statContainer'>
                        <img className='weeklyStats__icon' src={dataIcon} alt="Playlist Icon" />
                        <p className='weeklyStats__stat'>25K+</p>
                        <p className='weeklyStats__label'>Data Points</p>
                    </motion.div>
                    <motion.div variants={item} className='weeklyStats__statContainer'>
                        <img className='weeklyStats__icon' src={genreIcon} alt="Playlist Icon" />
                        <p className='weeklyStats__stat'>15</p>
                        <p className='weeklyStats__label'>Genres</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default WeeklyStats;