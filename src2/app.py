from flask import Flask, render_template
from socketio import Server, WSGIApp
from namespaces import ChatNamespace
 
 
# Create Flask Application
app = Flask(__name__)
 
@app.route('/', methods=["GET", "POST"])
def index():
  return render_template("index.html")
 
# Create SocketIO Server
sio = Server(
  async_mode="threading",
  logger=app.logger,
  engineio_logger=app.logger
)
sio.register_namespace(ChatNamespace(sio, '/chat'))
 
# Set SocketIO WSGI Application
app.wsgi_app = WSGIApp(sio, app.wsgi_app)
 
if __name__ == "__main__":
  app.run(host="localhost", port=5000, threaded=True)