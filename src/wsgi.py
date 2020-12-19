'''
WSGI Application Only
'''
from chat import app as application

if __name__ == "__main__":
    application.run()
