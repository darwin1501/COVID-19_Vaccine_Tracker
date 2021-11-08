// const renderLineChart = ((vaccineCoverage)=>{

// let dates = [];
// let dailyVaccineCount = [];    

// for (const data of vaccineCoverage) {
//     dailyVaccineCount.push(data.daily);
//     dates.push(data.date);
// }


// })

const lineChart = document.getElementById('lineChart').getContext('2d');
var lineChartConfig = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Vaccine Dose Frequency',
            data: [],
            fill: false,
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
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

// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }

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