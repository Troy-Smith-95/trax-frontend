import './Features.scss';
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import playlistsGraphic from '../../assets/images/playlists_graphic.svg';
import acousticness from '../../assets/images/acousticness.svg';
import danceability from '../../assets/images/danceability.svg';
import instrumentalness from '../../assets/images/instrumentalness.svg';
import playlist1Icon from '../../assets/images/playlist1_icon.png';
import playlist2Icon from '../../assets/images/playlist2_icon.png';
import playlist3Icon from '../../assets/images/playlist3_icon.png';
import playlist4Icon from '../../assets/images/playlist4_icon.png';
import music from '../../assets/lotties/lf30_editor_kdlinqr7.json';
import graph from '../../assets/lotties/lf30_editor_tpwusmvv.json';
import lightbulb from '../../assets/lotties/lf30_editor_phoyp9bp.json';


function Features() {
    const style = {
        height: 100,
    };

    const Variant = {
        visible: {
            opacity: 1, scale: 1,
            transition: {
                staggerChildren: 0.5
            }
        },
        hidden: { opacity: 0, scale: 0 },
    }
    const item = {
        hidden: { opacity: 0, x:-100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1} }
    }
    const itemTwo = {
        hidden: { opacity: 0, x:100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1} }
    }

    return (
        <section className='features'>
            <div className='features__feature'>
                <motion.img  whileHover={{ scale: [null, 1.3, 1.2] }} transition={{ duration: 0.3 }} className='features__graphic' src={playlistsGraphic} alt="" />
                <div className='features__container'>
                    <Lottie style={style} animationData={music} />
                    <h2 className='features__title'>See how taste makers evolve</h2>
                    <p className='features__text'>We generate our insights through tracking Spotify’s premier editorial playlists so you can stay on top of the sounds that catch their ear.</p>
                </div>
            </div>
            <div className='features__feature'>
                <div className='features__container'>
                    <Lottie style={style} animationData={graph} />
                    <h2 className='features__title'>Visualize and compare data</h2>
                    <p className='features__text'>Our dashboard makes it easy to see the changes in the sounds of genres and make comparisons to other genres, artists, songs or playlists.</p>
                </div>
                <div className='features__graphic features__graphic--flexStart'>
                    <motion.img variants={item} initial='hidden' whileInView='visible' className='features__dataGraphic features__dataGraphic--one' src={acousticness} alt="acousticness" />
                    <motion.img variants={itemTwo} initial='hidden' whileInView='visible'  className='features__dataGraphic features__dataGraphic--two' src={danceability} alt="danceability" />
                    <motion.img variants={item} initial='hidden' whileInView='visible'  className='features__dataGraphic features__dataGraphic--three' src={instrumentalness} alt="instrumentalness" />
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
                    <Lottie style={style} animationData={lightbulb} />
                    <h2 className='features__title'>Get inspiration for the music you want to make</h2>
                    <p className='features__text'>Trax can generate playlists and save them right to your Spotify based on a specific sound profile to help give you some inspiration for your next track.</p>
                </div>
            </div>
        </section>
    );
}

export default Features;