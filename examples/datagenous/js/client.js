function file_read_request(widget_id, filetype) {
  console.log('Received file read request from widget:' + widget_id);
  var x = $('#' + widget_id);
  // CSV readers have input as first field, continiuning with assumptions
  var input_field = x.children(1).children(0);
  var settings = {
    async: true,
    crossDomain: true,
    url:
      'http://localhost:5000/demo/api/v1.0/previewfile/' +
      input_field +
      '/' +
      filetype,
    method: 'GET',
    headers: {
      'User-Agent': 'PostmanRuntime/7.13.0',
      Accept: '*/*',
      'Cache-Control': 'no-cache',
      'Postman-Token':
        'e44130ab-361e-4251-af3a-222542a3948a,4f3b00be-38c0-46e4-bbba-3f14e518f524',
      Host: 'localhost:5000',
      'accept-encoding': 'gzip, deflate',
      Connection: 'keep-alive',
      'cache-control': 'no-cache'
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var output_field = x.children(1).children(1);
    output_field.val(response);
  });
}
