var windows = Array();

// Mxgraph main variables
var graph;
var parent;
var edge_id = 100;

function prepare_mxgraph() {
  var container = document.getElementById('graphContainer');

  // Disables the built-in context menu
  mxEvent.disableContextMenu(container);

  // Creates the graph inside the given container
  graph = new mxGraph(container);
  //graph.setAllowDanglingEdges(false);

  // Enables rubberband selection
  //new mxRubberband(graph);

  // Gets the default parent for inserting new cells. This
  // is normally the first child of the root (ie. layer 0).
  parent = graph.getDefaultParent();

  // Adds cells to the model in a single step
  graph.getModel().beginUpdate();
  try {
    /*var v1 = graph.insertVertex(parent, null, '', 20, 20, 0, 0);
      var v2 = graph.insertVertex(parent, null, '', 200, 150, 0, 0);
      var e1 = graph.insertEdge(parent, edge_id, '', v1, v2);*/
  } finally {
    // Updates the display
    graph.getModel().endUpdate();
  }
  // Register for handling updates

  //graph.getModel().addListener(mxEvent.CHANGE, graphUpdateHandler(sender, evt));
}
function graphUpdateHandler() {
  var changes = evt.getProperty('edit').changes;
  var nodes = [];
  var codec = new mxCodec();

  for (var i = 0; i < changes.length; i++) {
    console.log(changes[i]);

    nodes.push(codec.encode(changes[i]));
  }
  // do something with the nodes
}

function get_window_position_state(window_id) {
  var window_left_pos = $('#' + window_id)[0].style.left;
  var window_top_pos = $('#' + window_id)[0].style.top;
  var window_height = $('#' + window_id)[0].style.height;
  var window_width = $('#' + window_id)[0].style.width;

  console.log(window_left_pos);
  drawline('test', 'test1');
}

function remove_px(position_value) {
  return parseFloat(position_value.substring(0, position_value.length - 2));
}
function drawline(window_1, window_2) {
  //var draw = SVG(document.getElementById('graphContainer'));

  var window_2_left_pos = $('#' + window_2)[0].style.left;
  window_2_left_pos = remove_px(window_2_left_pos);

  var window_2_top_pos = $('#' + window_2)[0].style.top;
  window_2_top_pos = remove_px(window_2_top_pos);

  var window_1_left_pos = $('#' + window_1)[0].style.left;
  window_1_left_pos = remove_px(window_1_left_pos);

  var window_1_top_pos = $('#' + window_1)[0].style.top;
  window_1_top_pos = remove_px(window_1_top_pos);

  var window_2_height = $('#' + window_2)[0].style.height;
  window_2_height = remove_px(window_2_height);

  var window_2_width = $('#' + window_2)[0].style.width;
  window_2_width = remove_px(window_2_width);

  var window_1_height = $('#' + window_1)[0].style.height;
  window_1_height = remove_px(window_1_height);

  var window_1_width = $('#' + window_1)[0].style.width;
  window_1_width = remove_px(window_1_width);

  // Get window 1's midpoint on right side

  var window_1_midpoint_x = window_1_left_pos + window_1_width + 1;
  var window_1_midpoint_y = window_1_top_pos + window_1_height / 2;

  // Get window 2's midpoint on left side

  var window_2_midpoint_x = window_2_left_pos - 1;
  var window_2_midpoint_y = window_2_top_pos + window_2_height / 2;

  graph.getModel().beginUpdate();
  try {
    graph.getModel().remove(graph.getModel().getCell(edge_id));
    var v1 = graph.insertVertex(
      parent,
      null,
      '',
      window_1_midpoint_x,
      window_1_midpoint_y,
      0,
      0
    );
    var v2 = graph.insertVertex(
      parent,
      null,
      '',
      window_2_midpoint_x,
      window_2_midpoint_y,
      0,
      0
    );
    var e1 = graph.insertEdge(parent, edge_id, '', v1, v2);
  } finally {
    // Updates the display
    graph.getModel().endUpdate();
  }
}
// Every relatable element will have its vertexes

function set_window_vertex() {
  try {
    var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
    var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
    var e1 = graph.insertEdge(parent, null, '', v1, v2);
  } finally {
    // Updates the display
    graph.getModel().endUpdate();
  }
}
