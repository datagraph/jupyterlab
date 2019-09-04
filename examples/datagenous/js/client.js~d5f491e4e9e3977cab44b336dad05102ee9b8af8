function file_read_request(widget_id, filetype) {
  console.log('Received file read request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#filename')
    .val();

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
      var output_field = x.children('.body').children('textarea');
      output_field.val(JSON.parse(this.responseText));
    }
  });

  xhr.open(
    'GET',
    'http://de8.dydra.com:5002/canvas/api/read_csv/' + input_field
  );
  xhr.setRequestHeader('User-Agent', 'PostmanRuntime/7.13.0');
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader(
    'Postman-Token',
    'e44130ab-361e-4251-af3a-222542a3948a,fc1ae3ce-99de-46cc-aef5-26900045bd98'
  );
  xhr.setRequestHeader('Host', 'localhost:5000');
  xhr.setRequestHeader('accept-encoding', 'gzip, deflate');
  xhr.setRequestHeader('Connection', 'keep-alive');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
}

function setXY(widget_id) {
  console.log('Received XYset request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#filename')
    .val();
}

function run_widget_csv(widget_id, command) {
  console.log('Run request from: ' + widget_id);
  console.log('Command: ' + command);
  file_read_request(widget_id);
}
