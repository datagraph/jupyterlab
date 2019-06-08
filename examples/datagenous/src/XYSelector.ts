import { Widget } from '@phosphor/widgets';
import { Message, IMessageHandler, MessageLoop } from '@phosphor/messaging';
import { v4 as uuid } from 'uuid';
import { CustomMessage } from './CustomMessage';

export class XYSelector extends Widget {
  id: string;
  // Classification, Regression
  svm_type: string;
  // Data source ids
  children_ids: string[];
  // Accepted children types
  children_types: string[];
  // to store children messages.
  children_messages: string[];
  // TabularDataSource, Classifier-SVM
  widget_type: string;

  // what parameters should be passed for Hyperparameter space
  hyperparameter_json: string;

  constructor() {
    super({ node: XYSelector.createNode(uuid()) });
    //this.children_types[0] = "tabular-data-source";
    this.widget_type = 'tabular-data-source-xy';
  }

  static createNode(widget_id: string): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node = document.createElement('div');
    node.id = widget_id;

    node.innerHTML =
      '<div class="head">' +
      '<div class="left">XY-Selector</div>' +
      '<div class="right">' +
      '<a href="#" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<input  placeholder= "Enter indexes for X and Y" /> ' +
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
      this.widget_type
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
