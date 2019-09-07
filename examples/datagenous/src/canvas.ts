/*********************************************
 * Atomic size text entry widget for query tab
 *********************************************/

import { Menu, MenuBar, Widget } from '@phosphor/widgets';
import { CommandRegistry } from '@phosphor/commands';
import { Message, MessageLoop } from '@phosphor/messaging';
import { CustomMessage } from './CustomMessage';
//import { Core, CoreServiceProvider } from "@osjs/client";
import { v4 as uuid } from 'uuid';
// Canvas object = Menubar + div + svg

export class Canvas extends Widget {
  // id: THIS IS A HACK. It is uuid that needs to be added after
  //  super call in constructor, as node creation is static
  id: string;
  child_id = 0;
  constructor() {
    super({ node: Canvas.createNode() });
    //this.id = uuid();
    //this.node.children[0].id = this.id;
    /*(<HTMLTextAreaElement>(
      this.node.children[0]
    )).onkeyup = this.send_message_custom.bind(this);*/
  }

  // Let's enjoy reverse engineering phosphor js people's code
  private createCanvasMenu(): MenuBar {
    let fileMenu = new Menu({ commands: new CommandRegistry() });
    fileMenu.title.label = 'File';

    let createMenu = new Menu({ commands: new CommandRegistry() });
    createMenu.title.label = 'Create';

    let addMenu = new Menu({ commands: new CommandRegistry() });
    addMenu.title.label = 'Add';

    let operateMenu = new Menu({ commands: new CommandRegistry() });
    operateMenu.title.label = 'Operate';

    let viewMenu = new Menu({ commands: new CommandRegistry() });
    viewMenu.title.label = 'View';

    let shareMenu = new Menu({ commands: new CommandRegistry() });
    shareMenu.title.label = 'Share';

    let menubar = new MenuBar();
    menubar.addMenu(fileMenu);
    menubar.addMenu(createMenu);
    menubar.addMenu(addMenu);
    menubar.addMenu(operateMenu);
    menubar.addMenu(viewMenu);
    menubar.addMenu(shareMenu);

    return menubar;
  }

  static createNode(): HTMLElement {
    // Create two widgets, delete me and make me dynamic later
    let node_canvas = document.createElement('div');
    node_canvas.id = 'graphContainer';
    node_canvas.setAttribute(
      'style',
      'position:relative;overflow:hidden;width:4000px;height:5000px;'
    );
    return node_canvas;
  }
  public createInstance(): void {
    let this_canvas = new Canvas();
    let body = document.body;
    let menubar = this_canvas.createCanvasMenu();
    window.console.log(' Creating a new canvas ');
    // First Menu
    Widget.attach(menubar, body);
    //Widget.attach(this_canvas, body);

    (window as any).eval('prepare_mxgraph();');
  }
}
