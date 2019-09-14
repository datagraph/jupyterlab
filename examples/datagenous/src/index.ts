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

import { SVM } from './SVM';
import { XYSelector } from './XYSelector';
import { CSVReader } from './csvreader';
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

  let manager = new ServiceManager();
  manager.ready.then(() => {
    createApp(manager);
  });
}
export function whatsYourName(name: string) {
  console.log(name);
}
function createApp(manager: ServiceManager.IManager): void {
  // Initialize the command registry with the bindings.

  //let c = new Canvas();
  //c.createInstance();
  /*
  let cmt = new Comment('test');
  cmt.createInstance();
  */
  /*let cmt2 = new Comment('test1');

  cmt2.createInstance();*/
  /*
  let svm = new SVM('Regression', 'SVR');
  svm.createInstance();

  let xy = new XYSelector();
  xy.createInstance();

  let csv = new CSVReader('stop');
  csv.createInstance();

  let http = new HTTPEndpoint();
  http.createInstance();

  let http2 = new HTTPEndpoint();
  http2.createInstance();
   */
  let commands = new CommandRegistry();
  let useCapture = true;
  /*
  let linechart = new LineChart('chart1');
  linechart.createInstance();

  let linechart2 = new LineChart('chart2');
  linechart2.createInstance();

  let linearregresion = new LinearRegression('lr');
  linearregresion.createInstance();
   */
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
