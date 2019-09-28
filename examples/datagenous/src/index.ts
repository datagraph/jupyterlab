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
import { Comment } from './Comment';
import { SVM } from './SVM';
import { XYSelector } from './XYSelector';
import { CSVReader } from './CSVReadereader';
import { LineChart } from './LineChart';
import { HTTPEndpoint } from './HTTPEndpoint';
import { LinearRegression } from './LinearRegression';

// Let's enjoy reverse engineering phosphor js people's code
function createCanvasMenu(): MenuBar {
  let addMenu = new Menu({ commands: new CommandRegistry() });
  addMenu.title.label = 'Add';

  let menubar = new MenuBar();
  menubar.addMenu(addMenu);
  return menubar;
}

function main(): void {
  (window as any).create_widget = create_widget;

  /*let manager = new ServiceManager();
  manager.ready.then(() => {
    createApp(manager);
  });*/
}

function createApp(manager: ServiceManager.IManager): void {
  // Initialize the command registry with the bindings.

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

export function create_widget(id: string, widget_type: string) {
  if (widget_type == 'input/csv') {
    let csv = new CSVReader(id);
    csv.createInstance();
  } else if (widget_type == 'linechart') {
    let linechart = new LineChart(id);
    linechart.createInstance();
  } else if (widget_type == 'filter/xy') {
    let xyselector = new XYSelector(id);
    xyselector.createInstance();
  } else if (widget_type == 'model/regression/linear') {
    let linearregresion = new LinearRegression(id);
    linearregresion.createInstance();
  } else if (widget_type == 'model/regression/svr') {
    let svm = new SVM(id);
    svm.createInstance();
  } else if (widget_type == 'comment') {
    let comment = new Comment(id);
    comment.createInstance();
  } else if (widget_type == 'input/HTTPEndpoint') {
    let http = new HTTPEndpoint(id);
    http.createInstance();
  }
}
//(window as any).create_widget = create_widget;
window.addEventListener('load', main);
