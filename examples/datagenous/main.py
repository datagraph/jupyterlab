"""

run ``python main.py``.

"""
"""
 Will be object oriented in the future
"""
import logging
import simplejson as json
from functools import wraps
from flask import Flask, request, jsonify, abort,send_from_directory,render_template
from os.path import join
import os



# Set logger
logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)
HDLR = logging.FileHandler('DatagenousRouter.log')
FORMATTER = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
HDLR.setFormatter(FORMATTER)
LOGGER.addHandler(HDLR)

app = Flask(__name__, static_url_path='/static')
app.config['DEBUG'] = True


def get_request_ip():
    """ Required when dealing with NGINX servers, as environment
        variable can be different for HTTP_X_FORWARDED_FOR behind
        reverse proxy
    """
    if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        return request.environ['REMOTE_ADDR']
    else:
        return request.environ['HTTP_X_FORWARDED_FOR']


@app.route('/canvas/heartbeat', methods=['GET', 'POST'])
def heart_beat():
    """ Returns if server is alive  """
    LOGGER.info("Received heartbeat check from " +  get_request_ip())
    return "Canvas server is alive"

# Should now support both js and build static files
@app.route('/canvas/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


# Should now support both js and build static files
@app.route('/static/@phosphor/<path:path>')
def send_phosphor(path):
    return send_from_directory('static/@phosphor', path)
    
@app.route('/canvas/build/<path:path>/')
def send_build(path):
    return send_from_directory('build', path)

@app.route('/canvas/build/<path:mainpath>/<path:subpath>/')
def send_build_modules(mainpath, subpath):
    return send_from_directory('build', mainpath + "/" + subpath)

@app.route('/canvas/', methods=['GET'])
def canvas():
    """ Returns if server is alive  """
    LOGGER.info("Received heartbeat check from " +  get_request_ip())
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
