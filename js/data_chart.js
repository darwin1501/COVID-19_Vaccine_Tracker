const lineChart = document.getElementById('lineChart').getContext('2d');
var lineChartConfig = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Vaccine Dose',
            data: [],
            fill: false,
            borderColor: [
                'rgba(0, 230, 118, 1)'
            ],
            backgroundColor:[
                'rgba(0, 230, 118, 0.2)'
            ],
            pointBorderColor: 'rgba(0, 230, 118, 1)',
            fill: true,
            tension: 0,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const loadDataInChart = ((chart, vaccineCoverage)=>{

    // remove old data by clearing array
    chart.data.labels = [];
    chart.data.datasets[0].data = []

    for (const data of vaccineCoverage) {
        chart.data.labels.push(data.date)
        chart.data.datasets.forEach(dataset => {
            dataset.data.push(data.daily)
        });
    }
    chart.update();
})