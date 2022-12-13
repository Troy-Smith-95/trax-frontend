import { Link } from 'react-router-dom';
import './StartNow.scss';
import genreIcon from '../../assets/icons/genre_icon.svg';

function StartNow() {
    return (
        <section className='startNow'>
            <div className='startNow__iconContainer'>
                    <img className='startNow__icon' src={genreIcon} alt="Genre Icon" />
            </div>
            <h2 className='startNow__text'>Take the next step with your music</h2>
            <h2 className='startNow__text'>Get started with Trax now!</h2>
            <div className='startNow__button'>
                <Link to='/dashboard' className='startNow__link'>Go to Dashboard</Link>
            </div>
        </section>
    );
}

export default StartNow;