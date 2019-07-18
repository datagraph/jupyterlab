var windows = Array();

// Mxgraph main variables
var graph;
var parent;
var edge_id = 100;

function getCells_ByType(graph, TypeCell) {
  var AllCells = graph.getChildCells(graph.getDefaultParent(), true, true);
  var result = $.grep(AllCells, function(s) {
    return s.getValue().localName == TypeCell;
  });
  if (result.length != 0) return result;
  else return null;
}

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
  graph.setConnectable(true);

  // delete key
  var keyHandler = new mxKeyHandler(graph);
  keyHandler.bindKey(46, function(evt) {
    if (graph.isEnabled()) {
      selected_cells = graph.getSelectionCells();
      // Only delete edges
      if (selected_cells.length == 1) {
        if (selected_cells[0].edge) {
          graph.removeCells();
        } else {
          console.error("Can't delete vertexes");
        }
      }
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, function(sender, evt) {
    console.log('Graph changed');
    var changes = evt.properties.changes;
    if (changes.length == 1) {
      console.log('Potentially a delete edge or add vertex change');
      if (changes[0].child.edge) {
        if (changes[0].constructor.name == 'mxGeometryChange') {
          console.log('Geometry change only');
        } else {
          console.log('Deleting an edge');
          child = changes[0].child;

          source_vertex = child.source.id;
          target_vertex = child.target.id;

          console.log('From :' + source_vertex);
          console.log('To :' + target_vertex);
        }
      }
    } else if (changes.length == 5) {
      console.log('Potentially a widget to widget connection');
      if (
        changes[1].constructor.name == 'mxTerminalChange' &&
        changes[2].constructor.name == 'mxTerminalChange'
      ) {
        if (
          changes[0].constructor.name == 'mxChildChange' &&
          changes[4].constructor.name == 'mxChildChange'
        ) {
          console.log('Two vertexes are connected via an edge');
          child = changes[0].child;

          source_vertex = child.source.id;
          target_vertex = child.target.id;

          console.log('From :' + source_vertex);
          console.log('To :' + target_vertex);
        }
      }
    }

    let connectors = getCells_ByType(graph, 'Connector');
    if (connectors != null && connectors.length > 0) {
      connectors.forEach(element => {
        var source = graph.getModel().getTerminal(element, true);
        var target = graph.getModel().getTerminal(element, false);
        setData(element, {
          FromActivityClientId: source.getId(),
          ToActivityClientId: target.getId()
        });
        console.log('Connected from ' + source + ' to target:' + target);
      });
    }
  });

  // Default style with elbow connector
  var style = graph.getStylesheet().getDefaultEdgeStyle();
  style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
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

// Testing purposes only
function get_window_position_state(window_id) {
  var window_left_pos = $('#' + window_id)[0].style.left;
  var window_top_pos = $('#' + window_id)[0].style.top;
  var window_height = $('#' + window_id)[0].style.height;
  var window_width = $('#' + window_id)[0].style.width;

  console.log(window_left_pos);
  //drawline('test', 'test1');
}

// Control if position is valid,
// returns boolean
function position_checker(position) {
  if (position == 'left') {
    return true;
  } else if (position == 'right') {
    return true;
  } else {
    console.error("Unsupported position, supported ones are ['left', 'right']");
  }
  return false;
}

function get_window_midpoint(window_id, position) {
  var position_control = position_checker(position);
  if (position_control) {
    var window_left_pos = $('#' + window_id)[0].style.left;
    window_left_pos = remove_px(window_left_pos);

    var window_top_pos = $('#' + window_id)[0].style.top;
    window_top_pos = remove_px(window_top_pos);

    var window_height = $('#' + window_id)[0].style.height;
    window_height = remove_px(window_height);

    var window_width = $('#' + window_id)[0].style.width;
    window_width = remove_px(window_width);

    if (position == 'left') {
      var window_midpoint_x = window_left_pos - 8;
      var window_midpoint_y = window_top_pos + window_height / 2;

      return [window_midpoint_x, window_midpoint_y];
    } else if (position == 'right') {
      var window_midpoint_x = window_left_pos + window_width + 1;
      var window_midpoint_y = window_top_pos + window_height / 2;

      return [window_midpoint_x, window_midpoint_y];
    }
  }
}

// Removes characters px from style string and convert value to float.
function remove_px(position_value) {
  // Check if % sign is present rather than px
  if (position_value[position_value.length - 1] == '%') {
    var percentage = position_value.substring(0, position_value.length - 1);
    var container_width = parseFloat($('#graphContainer').style.width);
    var px = (parseFloat(percentage) * container_width) / 100.0;
    return px;
  }
  return parseFloat(position_value.substring(0, position_value.length - 2));
}

function add_vertex(window_id, position) {
  var position_control = position_checker(position);
  if (position_control) {
    points_xy = get_window_midpoint(window_id, position);
    var v1 = graph.insertVertex(
      parent,
      window_id + '_' + position,
      '',
      points_xy[0],
      points_xy[1],
      8,
      8
    );
    v1.geometry.offset = new mxPoint(-5, -5);
    v1.geometry.relative = true;
  }
}

function update_vertex_position(window) {}

function remove_vertex(window, position) {}

function delete_edge() {}

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
