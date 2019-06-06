/* Main JS file to communicate back and forth between canvas and
data/analytics services
*/
function file_read_request(filename, filetype) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open(
    'GET',
    'http://de8.dydra.com:5000/demo/api/v1.0/previewfile/' +
      filename +
      '/' +
      filetype
  );
  xhr.setRequestHeader('User-Agent', 'PostmanRuntime/7.13.0');
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Host', 'localhost:5000');
  xhr.setRequestHeader('accept-encoding', 'gzip, deflate');
  xhr.setRequestHeader('Connection', 'keep-alive');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
}
