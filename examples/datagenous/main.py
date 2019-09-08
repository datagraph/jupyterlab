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
model_svm_set = False
model_lr_set = False
model_svm_chart = None
model_lr_chart = None
data_1_svm_connected = False
data_2_svm_connected = False
data_1_lr_connected = False
data_2_lr_connected = False


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

@app.route('/canvas/demo/csv', methods=['GET'])
def canvas_demo():
    """ Demo canvas  CSV widget only"""
    LOGGER.info("Starting test canvas - IP:" +  get_request_ip())
    return app.send_static_file('demo-csv.html')

@app.route('/canvas/demo/csv-linear', methods=['GET'])
def canvas_demo_2():
    """ Demo canvas a linear regression from CSV file  """
    LOGGER.info("Starting test canvas - IP:" +  get_request_ip())
    return app.send_static_file('demo-csv-regression.html')

@app.route('/canvas/demo/csv-svm', methods=['GET'])
def canvas_demo_3():
    """ Demo canvas a linear regression from CSV file  """
    LOGGER.info("Starting test canvas - IP:" +  get_request_ip())
    return app.send_static_file('demo-csv-svm.html')




@app.route('/canvas/<string:canvas_id>', methods=['GET'])
def canvas_id(canvas_id):
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


@app.route('/proxy/add/api/<string:widget_id>')
def add_proxy_http_api(widget_id):
    pass

@app.route('/proxy/hit/api/')
def hit_proxy_http_api():
    url = "http://de8.dydra.com:5003/api/demo/zinc"

    headers = {
    'User-Agent': "PostmanRuntime/7.15.2",
    'Accept': "*/*",
    'Cache-Control': "no-cache",
    'Postman-Token': "3724cdc8-321a-47b1-ba9c-699869b60ce7,40b0d01e-394b-40f2-bb37-ad94a444c5cf",
    'Host': "de8.dydra.com:5003",
    'Accept-Encoding': "gzip, deflate",
    'Connection': "keep-alive",
    'cache-control': "no-cache"
    }

    response = requests.request("GET", url, headers=headers)

    return json.dumps(response.text)


@app.route('/set/svm', methods=["GET", "POST"])
def set_svm():
    model_svm_set = True

@app.route('/set/lr', methods=["GET", "POST"])
def set_lr():
    model_lr_set = True




if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002)
