from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO(logger=True, engineio_logger=True)


def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__)
    app.debug = debug
    app.config['SECRET_KEY'] = 'hard to guess...'

    socketio.init_app(app)
    
    '''
    두가지 방식 모두가 가능하지만,
    객체지향적 구조면에서 전자를 추천합니다.
    '''
    from app.events import ChatNamepsace
    socketio.on_namespace(ChatNamepsace('/chat'))
    # from app.events import socketio_init
    # socketio_init(socketio)

    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    
    return app
