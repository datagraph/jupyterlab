import { Widget } from '@phosphor/widgets';
import { Message, IMessageHandler, MessageLoop } from '@phosphor/messaging';
import { v4 as uuid } from 'uuid';
import { CustomMessage } from './CustomMessage';

export class LinearRegression extends Widget {
  // Each widget has a unique id - uuid4
  id: string;
  // Widget type
  type: string;
  // what parameters should be passed for Hyperparameter space
  parameter_json: string;

  constructor(widget_id?: string) {
    /* Constructor takes an optional id for reconstruction
    of an existing canvas, otherwise a new id is assigned*/
    if (widget_id) {
      super({ node: LinearRegression.createNode(widget_id) });
    } else {
      super({ node: LinearRegression.createNode(uuid()) });
    }
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">Model/LinearRegression/' +
      '</div>' +
      '<div class="right">' +
      '<a role="button" id="play-button" onclick="execute_widget(\'' +
      widget_id +
      '\',\'model/regression/linear\')"  ><i class="icon-play"></i></a>' +
      '<a href="#" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<textarea rows=8 placeholder= "Your parameters here.."> </textarea>' +
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
    window.console.log('Creating Linear Regression widget');
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
