import flask
from ircodec.command import CommandSet

app = flask.Flask(__name__)
app.config["DEBUG"] = True

controller = CommandSet.load('samsung-tv.json')


@app.route('/', methods=['GET'])
def home():
    return 'Online.\r\nGo to /send-command/command or /receive-command/command.'


@app.route('/send-command/<command>', methods=['GET'])
def sendCommand(command):
    print('=> sending command: ' + command)
    controller.emit(command)
    return 'command send';


@app.route('/receive-command/<command>', methods=['GET'])
def receiveCommand(command):
    print('=> receiving command: ' + command)
    controller.add(command)
    return 'command send';


app.run(host= '0.0.0.0')
