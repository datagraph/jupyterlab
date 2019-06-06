// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import 'es6-promise/auto'; // polyfill Promise on IE
import '@jupyterlab/application/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';
import '../index.css';

import { CommandRegistry } from '@phosphor/commands';

import {
  Menu,
  MenuBar,
  CommandPalette,
  SplitPanel,
  Widget
} from '@phosphor/widgets';

import { ServiceManager } from '@jupyterlab/services';
import { MathJaxTypesetter } from '@jupyterlab/mathjax2';

import {
  CompleterModel,
  Completer,
  CompletionHandler,
  KernelConnector
} from '@jupyterlab/completer';

import { editorServices } from '@jupyterlab/codemirror';

import { DocumentManager } from '@jupyterlab/docmanager';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import {
  RenderMimeRegistry,
  standardRendererFactories as initialFactories
} from '@jupyterlab/rendermime';
import { PageConfig } from '@jupyterlab/coreutils';
import { SetupCommands } from './commands';

import { Canvas } from './canvas';
import { Comment } from './comment';

// Let's enjoy reverse engineering phosphor js people's code
function createCanvasMenu(): MenuBar {
  let addMenu = new Menu({ commands: new CommandRegistry() });
  addMenu.title.label = 'Add';

  let menubar = new MenuBar();
  menubar.addMenu(addMenu);
  return menubar;
}

function main(): void {
  let manager = new ServiceManager();
  manager.ready.then(() => {
    createApp(manager);
  });
}

function createApp(manager: ServiceManager.IManager): void {
  // Initialize the command registry with the bindings.

  let c = new Canvas();
  c.createInstance();
  let cmt = new Comment('test');
  cmt.createInstance();

  let cmt2 = new Comment('test1');

  cmt2.createInstance();

  let commands = new CommandRegistry();
  let useCapture = true;

  // Setup the keydown listener for the document.
  document.addEventListener(
    'keydown',
    event => {
      commands.processKeydownEvent(event);
    },
    useCapture
  );

  let rendermime = new RenderMimeRegistry({
    initialFactories: initialFactories,
    latexTypesetter: new MathJaxTypesetter({
      url: PageConfig.getOption('mathjaxUrl'),
      config: PageConfig.getOption('mathjaxConfig')
    })
  });

  let opener = {
    open: (widget: Widget) => {
      // Do nothing for sibling widgets for now.
    }
  };
}

window.addEventListener('load', main);
