import './Analysis.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AudioFeatureBar from '../../Components/AudioFeatureBar/AudioFeatureBar';
import infoIcon from '../../assets/icons/info_icon.svg';
const URL = 'http://localhost:8080';

function Analysis() {
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [key, setKey] = useState(null);

    useEffect(() => {
        axios.get(URL + '/genres').then((response) => {
            setGenres(response.data);
        }).catch((error) => {
            console.log(`Error retrieving genres: ${error}`);
        });

        if (selectedGenre) {
            const genre = genres.filter((genre) => {
                return genre.genre_name === selectedGenre;
            })
            console.log(genre);
            axios.get(`${URL}/genres/${genre[0].id}/audio-features`).then((response) => {
                console.log(response);
                determineKey(response.data[0].key);
                setAudioFeatures(response.data);
            })
        }

    }, [selectedGenre]);

    function determineKey(keyValue) {
        if (keyValue === 0) {
            setKey('C');
        } else if (keyValue === 1) {
            setKey('C♯/D♭');
        } else if (keyValue === 2) {
            setKey('D');
        } else if (keyValue === 3) {
            setKey('D♯/E♭');
        } else if (keyValue === 4) {
            setKey('E');
        } else if (keyValue === 5) {
            setKey('F/E♯');
        } else if (keyValue === 6) {
            setKey('F♯/G♭');
        } else if (keyValue === 7) {
            setKey('G');
        } else if (keyValue === 8) {
            setKey('G♯/A♭');
        } else if (keyValue === 9) {
            setKey('A');
        } else if (keyValue === 10) {
            setKey('A♯/B♭');
        } else if (keyValue === 11) {
            setKey('B');
        } else {
            setKey('-');
        }
    }

    if (!genres) {
        return (
            <></>
        );
    }

    return (
        <section className='analysis'>
            <select className='analysis__selector' onChange={(e) => { setSelectedGenre(e.target.value) }} name="genre" id="genre">
                {!audioFeatures ? <option value="">Select Genre</option> : ''}
                {genres.map((genre) => {
                    return <option key={genre.id} value={genre.genre_name}>{genre.genre_name}</option>
                })}
            </select>
            <div className='analysis__insights'>
                <div className='analysis__progressBars'>
                    <AudioFeatureBar feature={'Acousticness'} value={audioFeatures ? audioFeatures[0].acousticness : 0} />
                    <AudioFeatureBar feature={'Danceability'} value={audioFeatures ? audioFeatures[0].danceability : 0} />
                    <AudioFeatureBar feature={'Valence'} value={audioFeatures ? audioFeatures[0].valence : 0} />
                    <AudioFeatureBar feature={'Energy'} value={audioFeatures ? audioFeatures[0].energy : 0} />
                    <AudioFeatureBar feature={'Instrumentalness'} value={audioFeatures ? audioFeatures[0].instrumentalness : 0} />
                    <AudioFeatureBar feature={'Liveness'} value={audioFeatures ? audioFeatures[0].liveness : 0} />
                    <AudioFeatureBar feature={'Speechiness'} value={audioFeatures ? audioFeatures[0].speechiness : 0} />
                </div>
                <div className='analysis__container'>
                    <div className='analysis__otherFeatures'>
                        <img className='analysis__infoIcon' src={infoIcon} alt="Info Icon" />
                        <div className='analysis__data'>
                            <h3 className='analysis__feature'>Duration</h3>
                            <p className='analysis__value'>{audioFeatures ? `${Math.floor(audioFeatures[0].duration_ms / 1000 / 60)}m ${Math.floor((audioFeatures[0].duration_ms / 1000) % 60)}s` : '-'}</p>
                        </div>
                        <div className='analysis__data'>
                            <h3 className='analysis__feature'>Time Signature</h3>
                            <p className='analysis__value'>{audioFeatures ? `${audioFeatures[0].time_signature}/4` : '-'}</p>
                        </div>
                        <div className='analysis__data'>
                            <h3 className='analysis__feature'>Modality</h3>
                            <p className='analysis__value'>{audioFeatures ? `${audioFeatures[0].mode === 0 ? 'Minor' : 'Major'}` : '-'}</p>
                        </div>
                        <div className='analysis__data'>
                            <h3 className='analysis__feature'>Tempo</h3>
                            <p className='analysis__value'>{audioFeatures ? audioFeatures[0].tempo.toFixed(2) : '-'}</p>
                        </div>
                        <div className='analysis__data'>
                            <h3 className='analysis__feature'>Loudness</h3>
                            <p className='analysis__value'>{audioFeatures ? audioFeatures[0].loudness.toFixed(2) : '-'}</p>
                        </div>
                        <div className='analysis__data'>
                            <h3 className='analysis__feature'>Key</h3>
                            <p className='analysis__value'>{audioFeatures ? key : '-'}</p>
                        </div>
                    </div>
                    <div className='analysis__trends'>
                        <h2 className='analysis__title'>Trends</h2>

                    </div>
                </div>
            </div>
        </section>
    );

}

export default Analysis;