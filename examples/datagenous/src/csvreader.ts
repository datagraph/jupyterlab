/*
Comment widget easiest one , test the Canvas
*/
import { Widget } from '@phosphor/widgets';
import { v4 as uuid } from 'uuid';

export class CSVReader extends Widget {
  id: string;
  constructor(widget_id: string) {
    super({ node: CSVReader.createNode(widget_id) });
    //this.id = uuid();
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">Data Source/CSV</div>' +
      '<div class="right">' +
      '<a role="button" onclick="file_read_request(\'' +
      widget_id +
      '\',\'csv\')"><i class="icon-play"></i></a>' +
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

    window.console.log(' Creating a comment');
    // Get canvas
    let canvas = document.getElementById('graphContainer');

    // First Menu
    Widget.attach(this, canvas);

    (window as any).eval('visualize()');
  }
}
