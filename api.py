import flask
from ircodec.command import CommandSet

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

controller = CommandSet.load('samsung-tv.json')


@app.route('/', methods=['GET'])
def home():
    return 'Online.\r\nGo to /send/ /update/ /add/ /remove/ or /get/'


@app.route('/send/<command>', methods=['GET'])
def sendCommand(command):
    print('=> sending command: ' + command)
    controller.emit(command)
    return 'command send';


@app.route('/update/<command>', methods=['GET'])
def updateCommand(command):
    print('=> updating command: ' + command)
    controller.remove(command)
    controller.add(command)
    controller.save_as('samsung-tv.json')
    return controller.to_json()


@app.route('/add/<command>', methods=['GET'])
def addCommand(command):
    print('=> adding command: ' + command)
    controller.add(command)
    controller.save_as('samsung-tv.json')
    return controller.to_json()


@app.route('/remove/<command>', methods=['GET'])
def removeCommand(command):
    print('=> removing command: ' + command)
    controller.remove(command)
    controller.save_as('samsung-tv.json')
    return controller.to_json()


@app.route('/get', methods=['GET'])
def getController():
    print('=> sending controller')
    return controller.to_json()


app.run(host='0.0.0.0')
