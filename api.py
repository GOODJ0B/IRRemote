import flask
from flask_cors import CORS
from ircodec.command import CommandSet
import pickle
import json
import time
from rpi_rf import RFDevice

from command import Command

rfRetries = 5

rfCodesOn = [8373588,
             8376660,
             8377428,
             8377620,
             8377668]

rfCodesOff = [8373585,
              8376657,
              8377425,
              8377617,
              8377665]

rfGpioPort = 17

app = flask.Flask(__name__)
CORS(app)
# app.config["DEBUG"] = True

# to create a new controller:
# controller = CommandSet(emitter_gpio=22, receiver_gpio=23, description='TV remote', name='SamsungTV')

controller = CommandSet.load('samsung-tv.json')
commands = []
with open("commands.txt", "rb") as fp:
    commands = pickle.load(fp)


@app.route('/', methods=['GET'])
def home():
    return 'Online.\r\nGo to /send/ /update/ /add/ /remove/ or /get/'


@app.route('/send/<command>', methods=['PUT'])
def sendCommand(command):
    print('=> sending command: ' + command)
    controller.emit(command)
    return '{ "success":"true" }'


@app.route('/everythingOff', methods=['PUT'])
def everythingOff():
    print('=> sending everything off')
    for code in rfCodesOff:
        sendRfCommand(code)
    return '{ "success":"true" }'


@app.route('/everythingOn', methods=['PUT'])
def everythingOn():
    print('=> sending everything on')
    sendRfCommand(rfCodesOn[0])
    sendRfCommand(rfCodesOn[1])
    return '{ "success":"true" }'


@app.route('/send-rf-on/<command>', methods=['PUT'])
def sendRfOnCommand(command):
    print('=> sending rf on command: ' + command)
    sendRfCommand(rfCodesOn[int(command)])
    return '{ "success":"true" }'


@app.route('/send-rf-off/<command>', methods=['PUT'])
def sendRfOffCommand(command):
    print('=> sending rf off command: ' + command)
    sendRfCommand(rfCodesOff[int(command)])
    return '{ "success":"true" }'


@app.route('/update/<name>', methods=['PUT'])
def updateCommand(name):
    print('=> updating command: ' + name)

    controller.remove(name)
    controller.add(name)
    controller.save_as('samsung-tv.json')

    return getCommandsJson()


@app.route('/update/<location>/<icon>/<name>', methods=['PUT'])
def updateCommandIconLocaton(name, icon, location):
    print('=> updating command icon and location: ' + name)

    for command in commands:
        if (command.name == name):
            command.icon = icon
            command.location = location

    return getCommandsJson()


@app.route('/add/<location>/<icon>/<name>', methods=['POST'])
def addCommand(name, icon, location):
    print('=> adding command: ' + name)

    controller.add(name)
    controller.save_as('samsung-tv.json')

    commands.append(Command(name, icon, location))
    saveCommands()

    return getCommandsJson()


@app.route('/remove/<name>', methods=['DELETE'])
def removeCommand(name):
    print('=> removing command: ' + name)

    controller.remove(name)
    controller.save_as('samsung-tv.json')

    global commands
    commands = [command for command in commands if command.name != name]

    return getCommandsJson()


@app.route('/get', methods=['GET'])
def getCommands():
    print('=> sending commands')
    return getCommandsJson()

rfDevice = RFDevice(17)
rfDevice.enable_tx()

def sendRfCommand(code):
    for i in range(rfRetries):
        rfDevice.tx_code(code, 1, 188, 24)
        time.sleep(0.03)
   

def saveCommands():
    with open('commands.txt', 'wb') as file:
        pickle.dump(commands, file)


def getCommandsJson():
    return json.dumps(commands, default=lambda obj: obj.__dict__)


app.run(host='0.0.0.0')
