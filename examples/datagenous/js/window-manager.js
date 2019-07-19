// Testing purposes only
function get_window_position_state(window_id) {
  var window_left_pos = $('#' + window_id)[0].style.left;
  var window_top_pos = $('#' + window_id)[0].style.top;
  var window_height = $('#' + window_id)[0].style.height;
  var window_width = $('#' + window_id)[0].style.width;
  redraw_vertexes(window_id);
  console.log(window_left_pos);
  //drawline('test', 'test1');
}
