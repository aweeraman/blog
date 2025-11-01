#!/usr/bin/env python3
"""
Simple HTTP server for serving a SPA (Single Page Application)
All routes return index.html to let React Router handle client-side routing
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='dist', **kwargs)

    def do_GET(self):
        # If the path doesn't exist and isn't an API call, serve index.html
        path = self.translate_path(self.path)

        if not os.path.exists(path) or os.path.isdir(path):
            # Check if it's a static asset
            if not any(self.path.startswith(prefix) for prefix in ['/images/', '/assets/']):
                self.path = '/index.html'

        return SimpleHTTPRequestHandler.do_GET(self)

if __name__ == '__main__':
    port = 8000
    server = HTTPServer(('localhost', port), SPAHandler)
    print(f'Server running at http://localhost:{port}/')
    print('Press Ctrl+C to stop')
    server.serve_forever()
