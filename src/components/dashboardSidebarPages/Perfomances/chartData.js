export const chartData = {
    labels: ['John Doe', 'Jane Smith', 'Alex Brown', 'Sarah Lee', 'Mike Chen', 'Emily Davis', 'Liam Wilson'],
    datasets: [
        {
            label: 'Math',
            data: [81.5, 92, 70, 95, 0, 88, 0],
            backgroundColor: '#4a90e2',
        },
        {
            label: 'Science',
            data: [80, 78.5, 60, 88, 78, 0, 82],
            backgroundColor: '#ff6b6b',
        },
        {
            label: 'English',
            data: [88, 0, 75, 90, 68, 0, 0],
            backgroundColor: '#feca57',
        },
        {
            label: 'History',
            data: [82, 90, 82, 0, 85, 0, 0],
            backgroundColor: '#1dd1a1',
        },
        {
            label: 'Geography',
            data: [0, 87, 0, 0, 0, 80, 0],
            backgroundColor: '#54a0ff',
        },
        {
            label: 'Computer Science',
            data: [0, 0, 0, 93, 0, 85, 90],
            backgroundColor: '#ff9f43',
        },
    ],
};

export const chartOptions = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            title: { display: true, text: 'Average Score (%)', color: '#e2e8f0' },
            ticks: { color: '#e2e8f0' },
            grid: { color: '#4a5568' },
        },
        x: {
            title: { display: true, text: 'Learner', color: '#e2e8f0' },
            ticks: { color: '#e2e8f0' },
        },
    },
    plugins: {
        legend: { display: true, position: 'top', labels: { color: '#e2e8f0' } },
        title: { display: true, text: 'Average Scores by Learner and Subject', color: '#e2e8f0' },
    },
    backgroundColor: '#2d3748',
};