/*******************************************
 * Class for sending custom messages between
 * Phosphor widgets
 * *****************************************/

import { Message, ConflatableMessage } from '@phosphor/messaging';

export class CustomMessage extends ConflatableMessage {
  public content: string;
  public child_id: string;
  public child_type: string;
  constructor(child_id: string, msg: string, widget_type: string) {
    super(msg);
    this.content = msg;
    this.child_id = child_id;
    this.child_type = widget_type;
  }
  public get_message() {
    return this.content;
  }
}
