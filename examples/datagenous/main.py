"""

run ``python main.py``.

"""
import os
from jinja2 import FileSystemLoader
from notebook.base.handlers import IPythonHandler, FileFindHandler
from notebook.notebookapp import NotebookApp
from notebook.utils import url_path_join as ujoin
from traitlets import Unicode

HERE = os.path.dirname(__file__)

class CanvasHandler(IPythonHandler):
    """
    Modified module from Notebook to handle canvas
    """

    def get(self, notebook_path):
        """Get the main page for the application's interface."""
        # Options set here can be read with PageConfig.getOption
        config_data = {
            # Use camelCase here, since that's what the lab components expect
            'baseUrl': self.base_url,
            'token': self.settings['token'],
            'notebookPath': notebook_path,
            'bundleUrl': ujoin(self.base_url, 'build/'),
            # FIXME: We perhaps may use it still 
            'mathjaxUrl': "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js",
            'mathjaxConfig': "TeX-AMS_CHTML-full,Safe"
        }
        return self.write(
            self.render_template(
                'index.html',
                static=self.static_url,
                base_url=self.base_url,
                config_data=config_data
            )
        )

    def get_template(self, name):
        loader = FileSystemLoader(HERE)
        return loader.load(self.settings['jinja2_env'], name)


class ExampleApp(NotebookApp):
     
    default_url = Unicode('/dydracanvas/test-canvas')

    def init_webapp(self):
        """initialize tornado webapp and httpserver.
        """
        super(ExampleApp, self).init_webapp()
        default_handlers = [
            (ujoin(self.base_url, r'dydracanvas/(.*)?'), CanvasHandler),
            (ujoin(self.base_url, r"build/(.*)"), FileFindHandler,
                {'path': os.path.join(HERE, 'build')})
        ]
        self.web_app.add_handlers('.*$', default_handlers)


if __name__ == '__main__':
    ExampleApp.launch_instance()
