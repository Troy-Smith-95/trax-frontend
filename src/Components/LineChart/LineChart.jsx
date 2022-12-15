import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({trends}) {
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
              ticks: { color: 'white', beginAtZero: true }
            },
            x: {
              ticks: { color: 'white', beginAtZero: true }
            }
          },
        plugins: {
            
            legend: {
                labels: {
                    color: 'white',
                },
                position: 'bottom',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    const labels = trends.labels;
    
    // const labels = ['Oct 20', 'Oct 27', 'Nov 4', 'Nov 11', 'Nov 18', 'Nov 25', 'Dec 1'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Acousticness',
                data: trends.acousticness,
                borderColor: 'blue',
                backgroundColor: 'blue',
            },
            {
                label: 'Danceability',
                data: trends.danceability,
                borderColor: 'green',
                backgroundColor: 'green',
            },
            {
                label: 'Valence',
                data: trends.valence,
                borderColor: 'lightsalmon',
                backgroundColor: 'lightsalmon',
            },
            {
                label: 'Energy',
                data: trends.energy,
                borderColor: 'purple',
                backgroundColor: 'purple',
            },
            {
                label: 'Instrumentalness',
                data: trends.instrumentalness,
                borderColor: 'darkorange',
                backgroundColor: 'darkorange',
            },
            {
                label: 'Liveness',
                data: trends.liveness,
                borderColor: 'aqua',
                backgroundColor: 'aqua',
            },
            {
                label: 'Speechiness',
                data: trends.speechiness,
                borderColor: 'firebrick',
                backgroundColor: 'firebrick',
            },
            {
                label: 'Duration',
                data: trends.duration,
                borderColor: 'darkcyan',
                backgroundColor: 'darkcyan',
            },
            {
                label: 'Tempo',
                data: trends.tempo,
                borderColor: 'mediumslateblue',
                backgroundColor: 'mediumslateblue',
            },
            {
                label: 'Loudness',
                data: trends.loudness,
                borderColor: 'lavender',
                backgroundColor: 'lavender',
            },
        ],
    };
    
    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Acousticness',
    //             data: [0.245, 0.4564, 0.2453, 0.43635, 0.2134, 0.32, 0.642],
    //             borderColor: 'blue',
    //             backgroundColor: 'blue',
    //         },
    //         {
    //             label: 'Danceability',
    //             data: [0.345, 0.45664, 0.153, 0.7635, 0.7134, 0.32, 0.942],
    //             borderColor: 'green',
    //             backgroundColor: 'green',
    //         },
    //         {
    //             label: 'Valence',
    //             data: [0.75, 0.364, 0.73, 0.235, 0.4534, 0.82, 0.42],
    //             borderColor: 'lightsalmon',
    //             backgroundColor: 'lightsalmon',
    //         },
    //         {
    //             label: 'Energy',
    //             data: [0.8, 0.78, 0.267, 0.74, 0.62, 0.57, 0.52],
    //             borderColor: 'purple',
    //             backgroundColor: 'purple',
    //         },
    //         {
    //             label: 'Instrumentalness',
    //             data: [0.75, 0.2464, 0.273, 0.2455, 0.7654, 0.564, 0.9862],
    //             borderColor: 'darkorange',
    //             backgroundColor: 'darkorange',
    //         },
    //         {
    //             label: 'Liveness',
    //             data: [0.2355, 0.094, 0.123, 0.23435, 0.344, 0.32, 0.43465],
    //             borderColor: 'aqua',
    //             backgroundColor: 'aqua',
    //         },
    //         {
    //             label: 'Speechiness',
    //             data: [0.99, 0.9676, 0.9234, 0.8769, 0.8234, 0.79547, 0.7345],
    //             borderColor: 'firebrick',
    //             backgroundColor: 'firebrick',
    //         },
    //     ],
    // };

    return (
        <Line options={options} data={data} />
    );
}

export default LineChart;