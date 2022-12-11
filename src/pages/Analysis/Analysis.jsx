import './Analysis.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AudioFeatureBar from '../../Components/AudioFeatureBar/AudioFeatureBar';
import infoIcon from '../../assets/icons/info_icon.svg';
import LineChart from '../../Components/LineChart/LineChart';
const URL = 'http://localhost:8080';

function Analysis({explained, setExplained, explainedStep1, setExplainedStep1}) {
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [key, setKey] = useState(null);
    const [trends, setTrends] = useState(null);

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
                createTrends(response.data);
                determineKey(response.data[0].key);
                setAudioFeatures(response.data);
            })
        }

    }, [selectedGenre]);

    //Create the data sets to be passed to the line chart
    async function createTrends(weeks) {
        const labels = [];
        const acousticness = [];
        const danceability = [];
        const valence = [];
        const energy = [];
        const instrumentalness = [];
        const liveness = [];
        const speechiness = [];
        const duration = [];
        const tempo = [];
        const loudness = [];
        const time_signature = [];
        const modality = [];
        const key = [];
        const trendsObj = {};
        weeks.forEach((week) => {
            const date = new Date(week.created_at).toString().split(' ');
            const label = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`;
            labels.unshift(label);
            acousticness.unshift(week.acousticness);
            danceability.unshift(week.danceability);
            valence.unshift(week.valence);
            energy.unshift(week.energy);
            instrumentalness.unshift(week.instrumentalness);
            liveness.unshift(week.liveness);
            speechiness.unshift(week.speechiness);
            duration.unshift(week.duration_ms / 1000);
            tempo.unshift(week.tempo);
            loudness.unshift(week.loudness);
            time_signature.unshift(week.time_signature);
            modality.unshift(week.mode);
            key.unshift(week.key);
        });
        trendsObj.labels = labels;
        trendsObj.acousticness = acousticness;
        trendsObj.danceability = danceability;
        trendsObj.valence = valence;
        trendsObj.energy = energy;
        trendsObj.instrumentalness = instrumentalness;
        trendsObj.liveness = liveness;
        trendsObj.speechiness = speechiness;
        trendsObj.duration = duration;
        trendsObj.tempo = tempo;
        trendsObj.loudness = loudness;
        trendsObj.time_signature = await findMode(time_signature);
        trendsObj.modality = await findMode(modality);
        trendsObj.key = await findMode(key);
        trendsObj.key = await determineKey(trendsObj.key);
        setTrends(trendsObj);
    }

    //Function to find the value that occurs the most in an array
    async function findMode(array) {
        const object = {};
        //Loop through array
        for (let i = 0; i < array.length; i++) {
            //If a key equal to that value exists increment its count
            if (object[array[i]]) {
                object[array[i]] += 1;
                //If a key equal to that value doesn't exist create it and set its count to one
            } else {
                object[array[i]] = 1;
            }
        }

        let mostOccurance = object[array[0]];
        let mostOccuranceKey = array[0];

        //Loop through the keys to see which one has most occurances 
        Object.keys(object).forEach(key => {
            if (object[key] > mostOccurance) {
                mostOccurance = object[key];
                mostOccuranceKey = key;
            }
        });

        return mostOccuranceKey;
    }

    async function determineKey(keyValue) {
        if (keyValue === 0) {
            setKey('C');
            return 'C';
        } else if (keyValue === 1) {
            setKey('C♯/D♭');
            return 'C♯/D♭';
        } else if (keyValue === 2) {
            setKey('D');
            return 'D';
        } else if (keyValue === 3) {
            setKey('D♯/E♭');
            return 'D♯/E♭';
        } else if (keyValue === 4) {
            setKey('E');
            return 'E';
        } else if (keyValue === 5) {
            setKey('F/E♯');
            return 'F/E♯';
        } else if (keyValue === 6) {
            setKey('F♯/G♭');
            return 'F♯/G♭';
        } else if (keyValue === 7) {
            setKey('G');
            return 'G';
        } else if (keyValue === 8) {
            setKey('G♯/A♭');
            return 'G♯/A♭';
        } else if (keyValue === 9) {
            setKey('A');
            return 'A';
        } else if (keyValue === 10) {
            setKey('A♯/B♭');
            return 'A♯/B♭';
        } else if (keyValue === 11) {
            setKey('B');
            return 'B';
        } else {
            setKey('-');
            return '-';
        }
    }

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
                <p className='analysis__explained' onClick={() => {setExplained(!explained); setExplainedStep1(false)}}>{!explained ? "How to Use":"Go Back"}</p>
            </div>
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