function create_line_chart(canvas_id) {
  // For demo stick to same config
  gradientChartOptionsConfigurationWithTooltipBlue = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: '#fefefe',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest'
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent'
          },
          ticks: {
            suggestedMin: -30.0,
            suggestedMax: 30.0,
            padding: 20,
            fontColor: '#2380f7'
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: 'transparent'
          },
          ticks: {
            padding: 20,
            fontColor: '#2380f7'
          }
        }
      ]
    }
  };
  var chart_labels = ['t-5', 't-4', 't-3', 't-2', 't-1', 't'];
  var chart_data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  var ctx = document.getElementById(canvas_id).getContext('2d');

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.1)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0.0)'); //blue colors
  var config = {
    type: 'line',
    data: {
      labels: chart_labels,
      datasets: [
        {
          label: 'Prediction Success',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#1d8cf8',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#1d8cf8',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#1d8cf8',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: chart_data
        }
      ]
    },
    options: gradientChartOptionsConfigurationWithTooltipBlueSaving
  };
}
