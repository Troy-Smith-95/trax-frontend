import './Inspiration.scss';
import { useEffect, useState } from 'react';
import { isEmpty } from "validator";
import Lottie from "lottie-react";
import musicDog from '../../assets/lotties/88994-music-time.json';
import axios from 'axios';
import InspirationTrack from '../../Components/InspirationTrack/InspirationTrack';
import InspirationSlider from '../../Components/InspirationSlider/InspirationSlider';

const URL = process.env.REACT_APP_URL;

function Inspiration({ explainedIns, setExplainedIns, setExplainedStep1Ins, user }) {
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState({
        acousticness: 0,
        danceability: 0,
        valence: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        speechiness: 0,
        duration_m: 0,
        duration_s: 0,
        tempo: 0
    });
    const [popularity, setPopularity] = useState(50);
    const [limit, setLimit] = useState(20);
    const [playlist, setPlaylist] = useState(null);
    const [playlistName, setPlaylistName] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [success, setSuccess] = useState(false);
    const [playlistGenerated, setPlaylistGenerated] = useState(false);

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
                setAudioFeatures({
                    acousticness: response.data[0].acousticness.toFixed(3),
                    danceability: response.data[0].danceability.toFixed(3),
                    valence: response.data[0].valence.toFixed(3),
                    energy: response.data[0].energy.toFixed(3),
                    instrumentalness: response.data[0].instrumentalness.toFixed(3),
                    liveness: response.data[0].liveness.toFixed(3),
                    speechiness: response.data[0].speechiness.toFixed(3),
                    duration_m: Math.floor(response.data[0].duration_ms / 1000 / 60),
                    duration_s: Math.floor((response.data[0].duration_ms / 1000) % 60),
                    tempo: response.data[0].tempo.toFixed(0)
                });
            })
        }
        // eslint-disable-next-line
    }, [selectedGenre]);

    //For lottie files
    const style = {
        height: 200,
    };

    function handleSubmit(e) {
        e.preventDefault();
        setSuccess(false);
        const params = {};
        params.target_acousticness = audioFeatures.acousticness;
        params.target_danceability = audioFeatures.danceability;
        params.target_duration_ms = (audioFeatures.duration_m * 60 * 1000) + (audioFeatures.duration_s * 1000);
        params.target_energy = audioFeatures.energy;
        params.target_instrumentalness = audioFeatures.instrumentalness;
        params.target_liveness = audioFeatures.liveness;
        params.target_popularity = audioFeatures.popularity;
        params.target_speechiness = audioFeatures.speechiness;
        params.target_tempo = audioFeatures.tempo;
        params.target_valence = audioFeatures.valence;
        params.limit = e.target.limit.value;
        params.seed_genres = selectedGenre.toLowerCase();
        params.spotify_id = user.spotify_id;

        axios.post(URL + '/inspiration/generate', { params })
            .then((res) => {
                setPlaylist(res.data);
                setPlaylistGenerated(true);
            }).catch((error) => {
                console.log(`Error in generating playlist: ${error}`);
            });
    }

    function handleSave(e) {
        e.preventDefault();
        const playlistURIs = playlist.map((track) => {
            return track.uri;
        })

        if (isEmpty(playlistName)) {
            setIsValid(false);
        } else {
            const params = {};
            params.spotify_id = user.spotify_id;
            params.uris = playlistURIs;
            params.name = e.target.playlist_name.value;

            axios.post(URL + '/inspiration/save', { params })
                .then((res) => {
                    setSuccess(true);
                }).catch((error) => {
                    console.log(`Error in saving playlist: ${error}`);
                });
        }
    }

    if (!genres) {
        return (
            <></>
        );
    }

    return (
        <section className='inspiration'>
            <div className='inspiration__header'>
                <select className='inspiration__selector' onChange={(e) => { setSelectedGenre(e.target.value); setExplainedStep1Ins(true) }} name="genre" id="genre">
                    {audioFeatures.tempo === 0 ? <option value="">Select Genre</option> : ''}
                    {genres.map((genre) => {
                        return <option key={genre.id} value={genre.genre_name}>{genre.genre_name}</option>
                    })}
                </select>
                <p className='inspiration__explained' onClick={() => { setExplainedIns(!explainedIns); setExplainedStep1Ins(false) }}>{!explainedIns ? "How to Use" : "Go Back"}</p>
            </div>
            <div className='inspiration__insights'>
                <div className='inspiration__container'>
                    <form className='inspiration__queries' onSubmit={handleSubmit}>
                        <div className='inspiration__sliders'>
                            <InspirationSlider audioFeatureName={"acousticness"} audioFeatureValue={audioFeatures.acousticness} audioFeatures={audioFeatures} setAudioFeatures={setAudioFeatures} />
                            <InspirationSlider audioFeatureName={"danceability"} audioFeatureValue={audioFeatures.danceability} audioFeatures={audioFeatures} setAudioFeatures={setAudioFeatures} />
                            <InspirationSlider audioFeatureName={"valence"} audioFeatureValue={audioFeatures.valence} audioFeatures={audioFeatures} setAudioFeatures={setAudioFeatures} />
                            <InspirationSlider audioFeatureName={"energy"} audioFeatureValue={audioFeatures.energy} audioFeatures={audioFeatures} setAudioFeatures={setAudioFeatures} />    
                            <InspirationSlider audioFeatureName={"instrumentalness"} audioFeatureValue={audioFeatures.instrumentalness} audioFeatures={audioFeatures} setAudioFeatures={setAudioFeatures} />
                            <InspirationSlider audioFeatureName={"liveness"} audioFeatureValue={audioFeatures.liveness} audioFeatures={audioFeatures} setAudioFeatures={setAudioFeatures} />
                            <InspirationSlider audioFeatureName={"speechiness"} audioFeatureValue={audioFeatures.speechiness} audioFeatures={audioFeatures} setAudioFeatures={setAudioFeatures} />
                        </div>
                        <div className='inspiration__otherQueries'>
                            <div className='inspiration__otherQuery'>
                                <h3 className='inspiration__parameter'>Duration</h3>
                                <div>
                                    <input className='inspiration__number' type="number" name='duration_m' readOnly={false} min={0} max={15} step={1} value={audioFeatures.duration_m} onChange={(e) => { setAudioFeatures({ ...audioFeatures, duration_m: e.target.value }) }} />
                                    <label className='inspiration__label' htmlFor="duration_m">m</label>
                                    <input className='inspiration__number' type="number" name='duration_s' readOnly={false} min={0} max={59} step={1} value={audioFeatures.duration_s} onChange={(e) => { setAudioFeatures({ ...audioFeatures, duration_s: e.target.value }) }} />
                                    <label className='inspiration__label' htmlFor="duration_s">s</label>
                                </div>
                            </div>
                            <div className='inspiration__otherQuery'>
                                <h3 className='inspiration__parameter'>Tempo</h3>
                                <div>
                                    <input className='inspiration__number' type="number" name='tempo' readOnly={false} min={0} max={200} step={1} value={audioFeatures.tempo} onChange={(e) => { setAudioFeatures({ ...audioFeatures, tempo: e.target.value }) }} />
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
                                    <input className='inspiration__number' type="number" name='limit' readOnly={false} min={1} max={100} step={1} value={limit} onChange={(e) => { setLimit(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <button className={selectedGenre === null ? 'inspiration__button--disabled' : 'inspiration__button'} disabled={selectedGenre === null ? true : false}>Generate Playlist</button>
                    </form>
                    <div className='inspiration__playlist'>
                        {!playlistGenerated ?
                            <>
                                <h2 className='inspiration__info'>Playlists Go Here</h2>
                                <Lottie style={style} animationData={musicDog} />
                            </> :
                            user.spotify_id ? <form className='inspiration__toSpotify' onSubmit={handleSave}>
                                <div>
                                    {user.spotify_id ? <input className='inspiration__playlistName' type="text" name='playlist_name' placeholder='Playlist Name' value={playlistName} onChange={(e) => { setPlaylistName(e.target.value) }} /> : ''}
                                    {!isValid && isEmpty(playlistName) ? <p className='inspiration__error'>Required to save to Spotify</p> : ""}
                                    {success ? <p className='inspiration__good'>Playlist saved to Spotify!</p> : ""}
                                </div>
                                <button className='inspiration__save'>Save to Spotify</button>
                            </form> :
                                // <a className='inspiration__save' href={`${URL}/auth/spotify`}>{user.spotify_id}</a>
                                ""
                        }
                        <div className='inspiration__tracks'>
                            {playlist === null ? "" :
                                playlist.map((track) => {
                                    return <InspirationTrack track={track} key={track.uri} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Inspiration;