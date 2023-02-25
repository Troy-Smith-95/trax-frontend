import './Analysis.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AudioFeatureBar from '../../Components/AudioFeatureBar/AudioFeatureBar';
import infoIcon from '../../assets/icons/info_icon.svg';
import LineChart from '../../Components/LineChart/LineChart';
import exitIcon from '../../assets/icons/exit.svg';
import { createTrends, determineKey } from '../../utils/utils';

const URL = process.env.REACT_APP_URL;

function Analysis({ explained, setExplained, setExplainedStep1 }) {
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [key, setKey] = useState(null);
    const [trends, setTrends] = useState(null);
    const [moreInfo, setMoreInfo] = useState(false);

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
                createTrends(response.data, setTrends, setKey);
                determineKey(response.data[0].key, setKey);
                setAudioFeatures(response.data);
            })
        }
        // eslint-disable-next-line
    }, [selectedGenre]);

    //Descriptions for the various audio features
    const info = [
        {
            feature: 'Acousticness',
            info: 'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.',
        },
        {
            feature: 'Danceability',
            info: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.',
        },
        {
            feature: 'Valence',
            info: 'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
        },
        {
            feature: 'Energy',
            info: 'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.',
        },
        {
            feature: 'Instrumentalness',
            info: 'Predicts whether a track contains no vocals. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.',
        },
        {
            feature: 'Liveness',
            info: 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.',
        },
        {
            feature: 'Speechiness',
            info: 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.',
        },
        {
            feature: 'Duration',
            info: 'The duration of a track',
        },
        {
            feature: 'Time Signature',
            info: 'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).',
        },
        {
            feature: 'Modality',
            info: 'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived.',
        },
        {
            feature: 'Tempo',
            info: 'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
        },
        {
            feature: 'Loudness',
            info: 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Values typically range between -60 and 0 db.',
        },
        {
            feature: 'Key',
            info: 'The key the track is in.',
        },
    ];

    if (!genres) {
        return (
            <></>
        );
    }

    return (
        <section className='analysis'>
            <div className='analysis__header'>
                <select className='analysis__selector' onChange={(e) => { setSelectedGenre(e.target.value); setExplainedStep1(true) }} name="genre" id="genre">
                    {!audioFeatures ? <option value="">Select Genre</option> : ''}
                    {genres.map((genre) => {
                        return <option key={genre.id} value={genre.genre_name}>{genre.genre_name}</option>
                    })}
                </select>
                <p className='analysis__explained' onClick={() => { setExplained(!explained); setExplainedStep1(false) }}>{!explained ? "How to Use" : "Go Back"}</p>
            </div>
            <div className='analysis__insights'>
                <div className='analysis__progressBars'>
                    <AudioFeatureBar feature={info[0].feature} value={audioFeatures ? audioFeatures[0].acousticness : 0} info={info[0]} />
                    <AudioFeatureBar feature={info[1].feature} value={audioFeatures ? audioFeatures[0].danceability : 0} info={info[1]} />
                    <AudioFeatureBar feature={info[2].feature} value={audioFeatures ? audioFeatures[0].valence : 0} info={info[2]} />
                    <AudioFeatureBar feature={info[3].feature} value={audioFeatures ? audioFeatures[0].energy : 0} info={info[3]} />
                    <AudioFeatureBar feature={info[4].feature} value={audioFeatures ? audioFeatures[0].instrumentalness : 0} info={info[4]} />
                    <AudioFeatureBar feature={info[5].feature} value={audioFeatures ? audioFeatures[0].liveness : 0} info={info[5]} />
                    <AudioFeatureBar feature={info[6].feature} value={audioFeatures ? audioFeatures[0].speechiness : 0} info={info[6]} />
                </div>
                <div className='analysis__container'>
                    <div className='analysis__otherFeatures'>
                        <img onClick={() => { setMoreInfo(true) }} className='analysis__infoIcon' src={infoIcon} alt="Info Icon" />
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
                        {moreInfo ? <div className='analysis__infoOverlay'>
                            <img onClick={() => { setMoreInfo(false) }} className='analysis__exit' src={exitIcon} alt="Exit Icon" />
                            <p className='analysis__infoText'>{`${info[7].feature}: ${info[7].info}`}</p>
                            <p className='analysis__infoText'>{`${info[8].feature}: ${info[8].info}`}</p>
                            <p className='analysis__infoText'>{`${info[9].feature}: ${info[9].info}`}</p>
                            <p className='analysis__infoText'>{`${info[10].feature}: ${info[10].info}`}</p>
                            <p className='analysis__infoText'>{`${info[11].feature}: ${info[11].info}`}</p>
                            <p className='analysis__infoText'>{`${info[12].feature}: ${info[12].info}`}</p>
                        </div> : ''}
                    </div>
                    <div className='analysis__trends'>
                        <h2 className='analysis__title'>Trends</h2>
                        <div className='analysis__chart'>
                            {audioFeatures ? <LineChart trends={trends} /> : ''}
                        </div>
                        <div className='analysis__otherTrends'>
                            <div className='analysis__data'>
                                <h3 className='analysis__feature'>Time Signature</h3>
                                <p className='analysis__value'>{audioFeatures ? `${trends.time_signature}/4` : '-'}</p>
                            </div>
                            <div className='analysis__data'>
                                <h3 className='analysis__feature'>Modality</h3>
                                <p className='analysis__value'>{audioFeatures ? `${trends.modality === 0 ? 'Minor' : 'Major'}` : '-'}</p>
                            </div>
                            <div className='analysis__data'>
                                <h3 className='analysis__feature'>Key</h3>
                                <p className='analysis__value'>{audioFeatures ? trends.key : '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Analysis;