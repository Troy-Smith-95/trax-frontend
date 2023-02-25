//Create the data sets to be passed to the line chart
export async function createTrends(weeks, setTrends, setKey) {
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
    trendsObj.key = await determineKey(trendsObj.key, setKey);
    console.log("Hello from Util");
    console.log(trendsObj);
    setTrends(trendsObj);
}

//Function to find the value that occurs the most in an array
export async function findMode(array) {
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

//Convert the musical key value from the backend into somehting useful for users on the front end
export async function determineKey(keyValue, setKey) {
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