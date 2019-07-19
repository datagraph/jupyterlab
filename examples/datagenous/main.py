"""

run ``python main.py``.

"""
"""
 Will be object oriented in the future
"""
import requests
import os
import logging
import simplejson as sjson
import json
import uuid
from functools import wraps
from flask import Flask, request, jsonify, abort,send_from_directory,render_template
from os.path import join



# Set logger
logging.basicConfig(level=logging.INFO)
LOGGER = logging.getLogger(__name__)
HDLR = logging.FileHandler('DatagenousRouter.log')
FORMATTER = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
HDLR.setFormatter(FORMATTER)
LOGGER.addHandler(HDLR)

# Set ml server path
ML_SERVER_PATH="http://localhost:5000"


# DELETE ME!!, one user, one demo case XY - selection
xy_selection = ""

app = Flask(__name__, static_url_path='/static')
app.config['DEBUG'] = True


@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


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
    """ Demo canvas  """
    LOGGER.info("Starting test canvas - IP:" +  get_request_ip())
    return app.send_static_file('index.html')


@app.route('/canvas/<string:canvas_id>', methods=['GET'])
def canvas(canvas_id):
    """ Canvases that persist and follow permissions  """
    LOGGER.info("Starting canvas  "+ canvas_id + " - IP:"  +  get_request_ip())
    return app.send_static_file('index.html')


@app.route('/menu/create_canvas')
def new_canvas():
    """ Creates a new canvas for user """
    pass

@app.route('/canvas/api/xy_selection/<string:selection>', methods = ['GET'] )
def set_xy(selection):
    xy_selection = selection
    return selection


# Analytics API callers over HTTP
@app.route('/canvas/api/read_csv/<string:filename>', methods=["GET"])
def get_csv(filename):
    url = ML_SERVER_PATH + "/demo/api/v1.0/previewfile/"+ filename + "/csv"
    headers = {
        'Accept': "*/*",
        'Cache-Control': "no-cache",
        'Host': ML_SERVER_PATH,
        'accept-encoding': "gzip, deflate",
        'Connection': "keep-alive",
        'cache-control': "no-cache"
    }

    response = requests.request("GET", url, headers=headers)
    return json.dumps(response.text)


@app.route('/canvas/api/train_svm', methods=["GET"])
def train_svm():
   options = request.get_json()
   return options



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002)
