"""
This class is built to perform HTTP API requests
on behalf of canvas clients,
only GET requests for demo purposes
"""

import requests

class Proxy:

    endpoints_dict = dict()
    def __init__(self):
        pass

    def add_endpoint(self, widget_id, endpoint, method="GET"):
        new_endpoints_dict = dict()
        new_endpoints_dict["endpoint"] = endpoint
        new_endpoints_dict["method"] = method
        endpoints_dict[widget_id]  = new_endpoints_dict

    def hit_endpoint(self, widget_id):
        #TO DO: Catch if exists
        widget_endpoint = self.endpoints_dict[window_id]
        if widget_endpoint["method"] == "GET":
            r = requests.get(widget_endpoint)

        result_dict = dict()
        result_dict["status_code"] = r.status_code
        
