import './Hero.scss';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero_image.png';

function Hero() {
    return (
        <section className='hero'>
            <div className='hero__container'>
                <h2 className='hero__tagline'>Powerful insights for music makers</h2>
                <p className='hero__text'>See how the sound of your genre is changing, leverage insights to make music that grows your audience, find new music influences</p>
                <p className='hero__cta'>Trax is FREE. Get started now!</p>
                <Link to='/dashboard' className='hero__link'>Go to Dashboard</Link>
            </div>
            <img className='hero__img' src={heroImage} alt="Trax Dashboard" />
        </section>
    );
}

export default Hero;