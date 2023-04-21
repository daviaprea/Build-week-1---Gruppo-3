let xValues = ['wrong', 'correct'];
let yValues = [33, 67];
let barColors = [
    "#c2128d",
    "#00ffff",    
];

new Chart("myChart", {
    type: "doughnut",
    data: {
        datasets: [{
            backgroundColor: barColors,
            data: yValues,
            borderColor: "transparent",
        }]
    },
    options: {
        cutoutPercentage: 70
    }
});

