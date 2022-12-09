import './Analysis.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AudioFeatureBar from '../../Components/AudioFeatureBar/AudioFeatureBar';
const URL = 'http://localhost:8080';

function Analysis() {
    const [genres, setGenres] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);

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
                setAudioFeatures(response.data);
            })
        }

    }, [selectedGenre]);

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
                <>
                    <AudioFeatureBar feature={'Acousticness'} value={audioFeatures ? audioFeatures[0].acousticness: 0}/>
                    <AudioFeatureBar feature={'Danceability'} value={audioFeatures ? audioFeatures[0].danceability: 0}/>
                    <AudioFeatureBar feature={'Valence'} value={audioFeatures ? audioFeatures[0].valence: 0}/>
                    <AudioFeatureBar feature={'Energy'} value={audioFeatures ? audioFeatures[0].energy: 0}/>
                    <AudioFeatureBar feature={'Instrumentalness'} value={audioFeatures ? audioFeatures[0].instrumentalness: 0}/>
                    <AudioFeatureBar feature={'Liveness'} value={audioFeatures ? audioFeatures[0].liveness: 0}/>
                    <AudioFeatureBar feature={'Speechiness'} value={audioFeatures ? audioFeatures[0].speechiness: 0}/>
                </>
        </section>
    );

}

export default Analysis;