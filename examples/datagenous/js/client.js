function file_read_request(widget_id, widget_type) {
  console.log('Received file read request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#filename')
    .val();

  var data = JSON.stringify({
    filename: input_field,
    widget_id: widget_id,
    widget_type: widget_type
  });
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
      var output_field = x.children('.body').children('textarea');
      //output_field.val(JSON.parse(this.responseText));
    }
  });

  xhr.open('POST', 'http://de8.dydra.com:5002/api/v1.0/widget/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('User-Agent', 'PostmanRuntime/7.13.0');
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader(
    'Postman-Token',
    'e44130ab-361e-4251-af3a-222542a3948a,fc1ae3ce-99de-46cc-aef5-26900045bd98'
  );
  xhr.setRequestHeader('Host', 'localhost:5002');
  xhr.setRequestHeader('accept-encoding', 'gzip, deflate');
  xhr.setRequestHeader('Connection', 'keep-alive');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
}
function file_read_request_preview(widget_id, filetype) {
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

function setXY(widget_id, widget_type) {
  console.log('Received XYset request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#xy_input')
    .val();

  var data = JSON.stringify({
    filter: input_field,
    widget_id: widget_id,
    widget_type: widget_type
  });
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', 'http://de8.dydra.com:5002/api/v1.0/widget/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('User-Agent', 'PostmanRuntime/7.15.2');
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader(
    'Postman-Token',
    'edd60906-7bf1-496c-9831-f9e08508600b,c5a98ca1-ae9f-47ff-a257-8515d75491ba'
  );
  xhr.setRequestHeader('Host', 'de8.dydra.com:5002');
  xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate');
  xhr.setRequestHeader('Connection', 'keep-alive');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
}

function train_svm(widget_id, widget_type) {
  console.log('Train svm request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#svm_options')
    .val();

  var data = JSON.stringify({
    options: input_field,
    widget_id: widget_id,
    widget_type: widget_type
  });
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', 'http://de8.dydra.com:5002/api/v1.0/widget/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('User-Agent', 'PostmanRuntime/7.15.2');
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader(
    'Postman-Token',
    'edd60906-7bf1-496c-9831-f9e08508600b,c5a98ca1-ae9f-47ff-a257-8515d75491ba'
  );
  xhr.setRequestHeader('Host', 'de8.dydra.com:5002');
  xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate');
  xhr.setRequestHeader('Connection', 'keep-alive');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
}

function http_input(widget_id, widget_type) {
  console.log('Add HTTP request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#httpendpoint1input')
    .val();

  var interval_field = x
    .children('.body')
    .children('#httpendpoint1interval')
    .val();

  var data = JSON.stringify({
    http_endpoint: input_field,
    interval: interval_field,
    widget_id: widget_id,
    widget_type: widget_type
  });
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open('POST', 'http://de8.dydra.com:5002/api/v1.0/widget/');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('User-Agent', 'PostmanRuntime/7.15.2');
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader(
    'Postman-Token',
    'edd60906-7bf1-496c-9831-f9e08508600b,c5a98ca1-ae9f-47ff-a257-8515d75491ba'
  );
  xhr.setRequestHeader('Host', 'de8.dydra.com:5002');
  xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate');
  xhr.setRequestHeader('Connection', 'keep-alive');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
}

function run_widget_csv(widget_id, command) {
  console.log('Run request from: ' + widget_id);
  console.log('Command: ' + command);
  file_read_request(widget_id);
}
