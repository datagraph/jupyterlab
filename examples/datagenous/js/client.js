/* This file is the main file that enable data transmission
between backend and frontend system.
Some methods such as http_request method are helpers
while others such file_read_request_preview are for widget
interaction */

function http_request(endpoint, data, method, output_field) {
  var HOST = 'http://de8.dydra.com:5002/';
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open(method, HOST + endpoint);

  // Get listener ready
  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
      if (output_field) {
        output_field.val(JSON.parse(this.responseText));
      } else {
        console.log(this.responseText);
      }
    }
  });

  // For now always set headers this way
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Host', HOST);
  xhr.setRequestHeader('accept-encoding', 'gzip, deflate');
  xhr.setRequestHeader('Connection', 'keep-alive');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
}

function file_read_request(widget_id, widget_type) {
  /* As widget interaction method it needs to parse the
   * values from DOM of the widget UI and needs to know
   * where to output response
   */

  console.log('Received file read request from widget:' + widget_id);
  // Get the widget
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#filename')
    .val();
  // Backend is expected a set of variables from frontend according each
  // widget type, that is where we are filling it in
  var data = JSON.stringify({
    filename: input_field,
    widget_id: widget_id,
    widget_type: widget_type
  });
  // Where do we want to print output of this interaction
  var output_field = x.children('.body').children('textarea');
  http_request('/api/v1.0/widget/', data, 'POST', output_field);
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
  var output_field = x.children('.body').children('textarea');
  http_request('canvas/api/read_csv/' + input_field, data, 'GET', output_field);
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

  http_request('/api/v1.0/widget/', data, 'POST', null);
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
  http_request('/api/v1.0/widget/', data, 'POST', null);
}
function train_nn(widget_id, widget_type, execution_interpretation) {
  console.log('Train nn request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x
    .children('.body')
    .children('#mdl_model_info')
    .val();

  var data = JSON.stringify({
    options: input_field,
    widget_id: widget_id,
    widget_type: widget_type,
    execution_interpretation: execution_interpretation
  });
  http_request('/demo/api/v1.0/train_nn', data, 'POST', null);
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
  http_request('/api/v1.0/widget/', data, 'POST', null);
}
