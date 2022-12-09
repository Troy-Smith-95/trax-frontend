import './Analysis.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AudioFeatureBar from '../../Components/AudioFeatureBar/AudioFeatureBar';
const URL = 'http://localhost:8080';

function Analysis() {
    const [genres, setGenres] = useState(null);

    useEffect(() => {
        axios.get(URL + '/genres').then((response) => {
            setGenres(response.data);
        }).catch((error) => {
            console.log(`Error retrieving genres: ${error}`);
        })

    }, []);

    if (!genres) {
        return (
            <></>
        );
    }

    return (
        <section className='analysis'>
            <select className='analysis__selector' name="genre" id="genre">
                <option value="">Select Genre</option>
                {genres.map((genre) => {
                    return <option value={genre.genre_name}>{genre.genre_name}</option>
                })}
            </select>
            <AudioFeatureBar/>
            <AudioFeatureBar/>
            <AudioFeatureBar/>
            <AudioFeatureBar/>
            <AudioFeatureBar/>
            <AudioFeatureBar/>
            <AudioFeatureBar/>
        </section>
    );

}

export default Analysis;