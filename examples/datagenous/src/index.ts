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
import { CSVReader } from './CSVReader';
import { LineChart } from './LineChart';
import { HTTPEndpoint } from './HTTPEndpoint';
import { LinearRegression } from './LinearRegression';
import { Dataset } from './Dataset';
import { KerasLayer } from './KerasLayer';
import { KerasActivation } from './KerasActivation';
import { KerasModel } from './KerasModel';
import { KerasOptimizer } from './KerasOptimizer';
import { SPARQL } from './SPARQL';
import { PredicateFilter } from './PredicateFilter';

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
  /* This function is attached to window object such that
   * it can be called by client code
   */

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
  } else if (widget_type == 'input/dataset') {
    let dataset = new Dataset(id);
    dataset.createInstance();
  } else if (widget_type == 'Tensorflow/Keras/Layer') {
    let keraslayer = new KerasLayer(id);
    keraslayer.createInstance();
  } else if (widget_type == 'Tensorflow/Keras/Activation') {
    let kerasactivation = new KerasActivation(id);
    kerasactivation.createInstance();
  } else if (widget_type == 'Tensorflow/Keras/Optimizer') {
    let kerasoptimizer = new KerasOptimizer(id);
    kerasoptimizer.createInstance();
  } else if (widget_type == 'Tensorflow/Keras/Model') {
    let kerasmodel = new KerasModel(id);
    kerasmodel.createInstance();
  } else if (widget_type == 'input/RDF/SPARQL') {
    let sparql = new SPARQL(id);
    sparql.createInstance();
  } else if (widget_type == 'Filter/PredicateFilter') {
    let predicatefilter = new PredicateFilter(id);
    predicatefilter.createInstance();
  }
}
//(window as any).create_widget = create_widget;
window.addEventListener('load', main);
