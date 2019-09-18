import { Widget } from '@phosphor/widgets';
import { Message, IMessageHandler, MessageLoop } from '@phosphor/messaging';
import { v4 as uuid } from 'uuid';
import { CustomMessage } from './CustomMessage';

export class HTTPEndpoint extends Widget {
  id: string;
  // Data source ids
  children_ids: string[];
  // Accepted children types
  children_types: string[];
  //
  children_messages: string[];
  //
  widget_type: string;

  constructor(widget_id: string) {
    if (widget_id) {
      super({ node: HTTPEndpoint.createNode(widget_id) });
    } else {
      super({ node: LinearRegression.createNode(uuid()) });
    }
    //super({ node: LinearRegression.createNode(uuid()) });
    //this.children_types[0] = "tabular-data-source-xy";
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">Input/HTTP/' +
      '</div>' +
      '<div class="right">' +
      '<a id="play-button" role="button" onclick="execute_widget(\'' +
      widget_id +
      "','input/HTTPEndpoint');\"  >" +
      '<i class="icon-play"></i></a>' +
      '<a href="#" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<input id = "httpendpoint1input" type="text" name="httpendpoint" placeholder="HTTP API endpoint">' +
      '<br/>' +
      '<br/>' +
      '<input id = "httpendpoint1interval" type="text" name="httpendpointinterval" placeholder="Interval in seconds">' +
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
    window.console.log('Creating HTTP endpoint widget');
    // Get canvas
    let canvas = document.getElementById('graphContainer');
    // First Menu
    Widget.attach(this, canvas);
    (window as any).eval('visualize()');
  }

  // bind message system
  messageHook(handler: IMessageHandler, msg: Message): boolean {
    if (handler === this) {
      this.processMessage(msg);
    }
    return true;
  }

  processMessage(msg: Message): void {
    window.console.log(msg);
    if (msg instanceof CustomMessage) {
      let parameter = (<CustomMessage>msg).content;
      let sending_child = (<CustomMessage>msg).child_id;
      let sending_child_type = (<CustomMessage>msg).child_type;
    }
  }
}
