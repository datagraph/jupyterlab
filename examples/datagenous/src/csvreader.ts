/*
Comment widget easiest one , test the Canvas
*/
import { Widget } from '@phosphor/widgets';
import { v4 as uuid } from 'uuid';

export class CSVReader extends Widget {
  // Each widget has a unique id - uuid4
  id: string;
  // Widget type
  type: string;
  // what parameters should be passed for CSV selection
  parameter_json: string;

  constructor(widget_id?: string) {
    /* Constructor takes an optional id for reconstruction
      of an existing canvas, otherwise a new id is assigned*/
    if (widget_id) {
      super({ node: CSVReader.createNode(widget_id) });
    } else {
      super({ node: CSVReader.createNode(uuid()) });
    }
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">Data Source/CSV</div>' +
      '<div class="right">' +
      '<a role="button" onclick="execute_widget(\'' +
      widget_id +
      '\',\'input/csv\')"><i class="icon-play"></i></a>' +
      '<a href="" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<input id = "filename" type="text" name="fname" placeholder="Filename..">' +
      '<br/>' +
      '<br/>' +
      '<textarea rows=8 placeholder= "Readings.."> </textarea>' +
      '</div>';

    node.setAttribute('class', 'window');
    node.setAttribute(
      'onMouseUp',
      "get_window_position_state('" + widget_id + "')"
    );

    return node;
  }

  public createInstance(): void {
    let body = document.body;

    window.console.log(' Creating a CSV reader ');
    // Get canvas
    let canvas = document.getElementById('graphContainer');

    // First Menu
    Widget.attach(this, canvas);

    (window as any).eval('visualize()');
  }
}
