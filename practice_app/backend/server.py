server_address = ('', 8000)
httpd = server_class(server_address, handler_class)
httpd.serve_forever()