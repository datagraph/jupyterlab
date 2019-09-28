import { Widget } from '@phosphor/widgets';
import { Message, IMessageHandler, MessageLoop } from '@phosphor/messaging';
import { v4 as uuid } from 'uuid';
import { CustomMessage } from './CustomMessage';

export class XYSelector extends Widget {
  id: string;
  type: string;
  // what parameters should be passed for widget execution
  parameter_json: string;

  constructor(widget_id: string) {
    if (widget_id) {
      super({ node: XYSelector.createNode(widget_id) });
    } else {
      super({ node: XYSelector.createNode(uuid()) });
    }
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">XY-Selector</div>' +
      '<div class="right">' +
      '<a role="button" onclick="execute_widget(\'' +
      widget_id +
      '\',\'filter/xy\')"><i class="icon-play"></i></a>' +
      '<a href="#" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<input id="xy_input" placeholder= "Enter indexes for X and Y" /> ' +
      '</div>';

    node.setAttribute('class', 'window');
    node.setAttribute(
      'onMouseUp',
      'get_window_position_state("' + widget_id + '")'
    );
    return node;
  }

  public bindToParent(parent_widget: Widget): void {
    this.parent = parent_widget;
  }

  public createInstance(): void {
    let body = document.body;
    window.console.log('Creating XY-filter widget');
    // Get canvas
    let canvas = document.getElementById('graphContainer');
    // First Menu
    Widget.attach(this, canvas);
    (window as any).eval('visualize()');
  }

  // Simply using this.node, this in here is not this class, fails in bundling
  send_message_custom(): any {
    let msg = new CustomMessage(
      this.id,
      (<HTMLTextAreaElement>this.node.children[0]).value,
      this.type
    );
    MessageLoop.sendMessage(this.parent, msg);
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
