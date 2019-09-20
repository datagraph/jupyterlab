var chart1_set = false;
var chart2_set = false;
function create_line_chart(id, widget_type, interval, model_id) {
  interval = interval * 1000;
  http_endpoint = '/proxy/hit/api/' + model_id;
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
            suggestedMin: -1.0,
            suggestedMax: 1.0,
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

  var ctx = document.getElementById(id).getContext('2d');

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
    options: gradientChartOptionsConfigurationWithTooltipBlue
  };

  // Demo specific settings
  var widget_chart = new Chart(ctx, config);

  setInterval(function() {
    // Get data from localhost
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        var resp = JSON.parse(this.responseText);
        var x = JSON.parse(JSON.parse(x));
        widget_chart.data.datasets[0].data.shift();
        widget_chart.data.datasets[0].data.push(x.prediction);
        widget_chart.update();
      }
    });

    xhr.open('GET', http_endpoint);
    xhr.setRequestHeader('User-Agent', 'PostmanRuntime/7.13.0');
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader(
      'Postman-Token',
      'd4d78eb9-4bd1-4f9e-91a6-7994b7735a0b,f2743424-12b7-4a0a-a570-02c36fb08fe2'
    );
    xhr.setRequestHeader('Host', 'de8.dydra.com:5002');
    xhr.setRequestHeader('accept-encoding', 'gzip, deflate');
    xhr.setRequestHeader('Connection', 'keep-alive');
    xhr.setRequestHeader('cache-control', 'no-cache');

    xhr.send(data);
  }, interval);
}

function set_prediction_chart(id, widget_type, interval, model_id) {
  // Get endpoint and interval
  create_line_chart('canvas_' + id, widget_type, interval, model_id);
}
