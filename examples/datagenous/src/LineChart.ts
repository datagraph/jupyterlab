import { Widget } from '@phosphor/widgets';
import { Message, IMessageHandler, MessageLoop } from '@phosphor/messaging';
import { v4 as uuid } from 'uuid';
import { CustomMessage } from './CustomMessage';

export class LineChart extends Widget {
  id: string;

  // Data source ids
  children_ids: string[];
  // Accepted children types
  children_types: string[];
  //
  children_messages: string[];
  //
  widget_type: string;

  // what parameters should be passed for Hyperparameter space
  hyperparameter_json: string;

  constructor(widget_id: string) {
    // For ivans demo

    //super({ node: LineChart.createNode(uuid()) });
    super({ node: LineChart.createNode(widget_id) });
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">Charts/LineChart/' +
      '</div>' +
      '<div class="right">' +
      '<a role="button" id="play-button" onclick="execute_widget(\'' +
      widget_id +
      "','model/regression/linear')\"  >" +
      '<i class="icon-play"></i></a>' +
      '<a href="#" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<canvas id=canvas_' +
      widget_id +
      '></canvas>' +
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
    window.console.log('Creating LineChart widget');
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
