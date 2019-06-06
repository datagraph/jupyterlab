/*******************************************
 * Class for sending custom messages between
 * Phosphor widgets
 * *****************************************/

import { Message, ConflatableMessage } from '@phosphor/messaging';

export class CustomMessage extends ConflatableMessage {
  private content: string;
  private child_index: number;
  constructor(child_index: number, msg: string) {
    super(msg);
    this.content = msg;
    this.child_index = child_index;
  }
  public get_message() {
    return this.content;
  }
}
