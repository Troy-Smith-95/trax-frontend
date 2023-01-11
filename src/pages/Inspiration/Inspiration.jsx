import './Inspiration.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL;

function Inspiration({ explained, setExplained, setExplainedStep1 }) {
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [acousticness, setAcousticness] = useState(0);
    const [danceability, setDanceability] = useState(0);
    const [valence, setValence] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [instrumentalness, setInstrumentalness] = useState(0);
    const [liveness, setLiveness] = useState(0);
    const [speechiness, setSpeechiness] = useState(0);
    const [duration_m, setDuration_m] = useState(0);
    const [duration_s, setDuration_s] = useState(0);
    const [tempo, setTempo] = useState(0);
    const [popularity, setPopularity] = useState(50);
    const [tracks, setTracks] = useState(20);

    //Calls to retrieve data to populate dashboard
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
            axios.get(`${URL}/genres/${genre[0].id}/audio-features`).then((response) => {
                setAudioFeatures(response.data);
                setAcousticness(response.data[0].acousticness.toPrecision(3));
                setDanceability(response.data[0].danceability.toPrecision(3));
                setValence(response.data[0].valence.toPrecision(3));
                setEnergy(response.data[0].energy.toPrecision(3));
                setInstrumentalness(response.data[0].instrumentalness.toPrecision(3));
                setLiveness(response.data[0].liveness.toPrecision(3));
                setSpeechiness(response.data[0].speechiness.toPrecision(3));
                setDuration_m(Math.floor(response.data[0].duration_ms / 1000 / 60));
                setDuration_s(Math.floor((response.data[0].duration_ms / 1000) % 60));
                setTempo(response.data[0].tempo.toPrecision(3));

            })
        }
        // eslint-disable-next-line
    }, [selectedGenre]);

    if (!genres) {
        return (
            <></>
        );
    }

    return (
        <section className='inspiration'>
            <div className='inspiration__header'>
                <select className='inspiration__selector' onChange={(e) => { setSelectedGenre(e.target.value); setExplainedStep1(true) }} name="genre" id="genre">
                    {!audioFeatures ? <option value="">Select Genre</option> : ''}
                    {genres.map((genre) => {
                        return <option key={genre.id} value={genre.genre_name}>{genre.genre_name}</option>
                    })}
                </select>
                <p className='inspiration__explained' onClick={() => { setExplained(!explained); setExplainedStep1(false) }}>{!explained ? "How to Use" : "Go Back"}</p>
            </div>
            <div className='inspiration__insights'>
                <div className='inspiration__container'>
                    <form className='inspiration__queries'>
                        <div className='inspiration__sliders'>
                            <div className='inspiration__query'>
                                <h3 className='inspiration__parameter'>Acousticness</h3>
                                <input className='inspiration__number' type="number" name='acousticness' readOnly={false} min={0} max={1} step={0.001} value={acousticness} onChange={(e) => { setAcousticness(e.target.value) }} />
                                <input className='inspiration__range' type="range" min={0} max={1} step={0.001} value={acousticness} onChange={(e) => { setAcousticness(e.target.value) }} />
                                <p className='inspiration__value'>0</p>
                                <p className='inspiration__value'>1</p>
                            </div>
                            <div className='inspiration__query'>
                                <h3 className='inspiration__parameter'>Danceability</h3>
                                <input className='inspiration__number' type="number" name='danceability' readOnly={false} min={0} max={1} step={0.001} value={danceability} onChange={(e) => { setDanceability(e.target.value) }} />
                                <input className='inspiration__range' type="range" min={0} max={1} step={0.001} value={danceability} onChange={(e) => { setDanceability(e.target.value) }} />
                                <p className='inspiration__value'>0</p>
                                <p className='inspiration__value'>1</p>
                            </div>
                            <div className='inspiration__query'>
                                <h3 className='inspiration__parameter'>Valence</h3>
                                <input className='inspiration__number' type="number" name='valence' readOnly={false} min={0} max={1} step={0.001} value={valence} onChange={(e) => { setValence(e.target.value) }} />
                                <input className='inspiration__range' type="range" min={0} max={1} step={0.001} value={valence} onChange={(e) => { setValence(e.target.value) }} />
                                <p className='inspiration__value'>0</p>
                                <p className='inspiration__value'>1</p>
                            </div>
                            <div className='inspiration__query'>
                                <h3 className='inspiration__parameter'>Energy</h3>
                                <input className='inspiration__number' type="number" name='energy' readOnly={false} min={0} max={1} step={0.001} value={energy} onChange={(e) => { setEnergy(e.target.value) }} />
                                <input className='inspiration__range' type="range" min={0} max={1} step={0.001} value={energy} onChange={(e) => { setEnergy(e.target.value) }} />
                                <p className='inspiration__value'>0</p>
                                <p className='inspiration__value'>1</p>
                            </div>
                            <div className='inspiration__query'>
                                <h3 className='inspiration__parameter'>Instrumentalness</h3>
                                <input className='inspiration__number' type="number" name='instrumentalness' readOnly={false} min={0} max={1} step={0.001} value={instrumentalness} onChange={(e) => { setInstrumentalness(e.target.value) }} />
                                <input className='inspiration__range' type="range" min={0} max={1} step={0.001} value={instrumentalness} onChange={(e) => { setInstrumentalness(e.target.value) }} />
                                <p className='inspiration__value'>0</p>
                                <p className='inspiration__value'>1</p>
                            </div>
                            <div className='inspiration__query'>
                                <h3 className='inspiration__parameter'>Liveness</h3>
                                <input className='inspiration__number' type="number" name='liveness' readOnly={false} min={0} max={1} step={0.001} value={liveness} onChange={(e) => { setLiveness(e.target.value) }} />
                                <input className='inspiration__range' type="range" min={0} max={1} step={0.001} value={liveness} onChange={(e) => { setLiveness(e.target.value) }} />
                                <p className='inspiration__value'>0</p>
                                <p className='inspiration__value'>1</p>
                            </div>
                            <div className='inspiration__query'>
                                <h3 className='inspiration__parameter'>Speechiness</h3>
                                <input className='inspiration__number' type="number" name='speechiness' readOnly={false} min={0} max={1} step={0.001} value={speechiness} onChange={(e) => { setSpeechiness(e.target.value) }} />
                                <input className='inspiration__range' type="range" min={0} max={1} step={0.001} value={speechiness} onChange={(e) => { setSpeechiness(e.target.value) }} />
                                <p className='inspiration__value'>0</p>
                                <p className='inspiration__value'>1</p>
                            </div>
                        </div>
                        <div className='inspiration__otherQueries'>
                            <div className='inspiration__otherQuery'>
                                <h3 className='inspiration__parameter'>Duration</h3>
                                <div>
                                    <input className='inspiration__number' type="number" name='duration_m' readOnly={false} min={0} max={15} step={1} value={duration_m} onChange={(e) => { setDuration_m(e.target.value) }} />
                                    <label className='inspiration__label' htmlFor="duration_m">m</label>
                                    <input className='inspiration__number' type="number" name='duration_s' readOnly={false} min={0} max={59} step={1} value={duration_s} onChange={(e) => { setDuration_s(e.target.value) }} />
                                    <label className='inspiration__label' htmlFor="duration_s">s</label>
                                </div>
                            </div>
                            <div className='inspiration__otherQuery'>
                                <h3 className='inspiration__parameter'>Tempo</h3>
                                <div>
                                    <input className='inspiration__number' type="number" name='tempo' readOnly={false} min={0} max={200} step={1} value={tempo} onChange={(e) => { setTempo(e.target.value) }} />
                                </div>
                            </div>
                            <div className='inspiration__otherQuery'>
                                <h3 className='inspiration__parameter'>Popularity</h3>
                                <div>
                                    <input className='inspiration__number' type="number" name='popularity' readOnly={false} min={0} max={100} step={1} value={popularity} onChange={(e) => { setPopularity(e.target.value) }} />
                                </div>
                            </div>
                            <div className='inspiration__otherQuery'>
                                <h3 className='inspiration__parameter'># of Tracks</h3>
                                <div>
                                    <input className='inspiration__number' type="number" name='tracks' readOnly={false} min={1} max={100} step={1} value={tracks} onChange={(e) => { setTracks(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <button className='inspiration__button'>Generate Playlist</button>
                    </form>
                    <div className='analysis__trends'>
                        <h2 className='analysis__title'>Trends</h2>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Inspiration;