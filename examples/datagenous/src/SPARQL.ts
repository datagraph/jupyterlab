import { Widget } from '@phosphor/widgets';
import { Message, IMessageHandler, MessageLoop } from '@phosphor/messaging';
import { v4 as uuid } from 'uuid';
import { CustomMessage } from './CustomMessage';

/* Demo dataset widget for different types of sklearn dataset */

export class SPARQL extends Widget {
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
      super({ node: SPARQL.createNode(widget_id) });
    } else {
      super({ node: SPARQL.createNode(uuid()) });
    }
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">Input/RDF/SPARQL' +
      '</div>' +
      '<div class="right">' +
      '<a id="play-button" role="button" onclick="execute_widget(\'' +
      widget_id +
      "','input/RDF/SPARQL');\"  >" +
      '<i class="icon-play"></i></a>' +
      '<a href="#" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<input id ="' +
      widget_id +
      '_SPARQL_query" type="text" name="' +
      widget_id +
      '_SPARQL_query" placeholder="SPARQL Select query">' +
      '</div>';

    node.setAttribute('class', 'window');
    node.setAttribute(
      'onMouseUp',
      'get_window_position_state("' + widget_id + '")'
    );
    return node;
  }
  public createInstance(): void {
    let body = document.body;
    window.console.log('Creating Dataset');
    // Get canvas
    let canvas = document.getElementById('graphContainer');
    Widget.attach(this, canvas);
    (window as any).eval('visualize()');
  }
}
