var xValues = ['wrong', 'correct'];
var yValues = [33, 67];
var barColors = [
    "#c2128d",
    "#00ffff",    
];

new Chart("myChart", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues,
            borderColor: "transparent",
        }]
    },
});

console.dir(myChart)

