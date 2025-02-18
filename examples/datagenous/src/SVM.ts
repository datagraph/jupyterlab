import { Widget } from '@phosphor/widgets';
import { Message, IMessageHandler, MessageLoop } from '@phosphor/messaging';
import { v4 as uuid } from 'uuid';
import { CustomMessage } from './CustomMessage';

export class SVM extends Widget {
  id: string;
  // Classification, Regression
  type: string;
  // what parameters should be passed for Hyperparameter space
  parameter_json: string;

  constructor(widget_id: string) {
    if (widget_id) {
      super({ node: SVM.createNode(widget_id) });
    } else {
      super({ node: SVM.createNode(uuid()) });
    }
  }

  static createNode(widget_id: string): HTMLElement {
    let node = document.createElement('div');
    node.id = widget_id;
    let svm_type = 'Regressor';
    node.innerHTML =
      '<div class="head">' +
      '<div class="left">Model/SVM/' +
      svm_type +
      '</div>' +
      '<div class="right">' +
      '<a role="button" id="play-button" onclick="execute_widget(\'' +
      widget_id +
      '\',\'model/regression/svr\')"><i class="icon-play"></i></a>' +
      '<a href="#" class="close"><i class="icon-exit"></i></a>' +
      '</div>' +
      '</div>' +
      '<div class="body">' +
      '<textarea id="svm_options" rows=8 placeholder= "Your parameters here.."> </textarea>' +
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
    window.console.log('Creating SVM widget');
    // Get canvas
    let canvas = document.getElementById('graphContainer');
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
