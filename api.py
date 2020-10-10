import flask
from ircodec.command import CommandSet
import RPi.GPIO as GPIO

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

# controller = CommandSet(emitter_gpio=22, receiver_gpio=23, description='TV remote', name='SamsungTV')

controller = CommandSet.load('samsung-tv.json')

GPIO.setmode(GPIO.BCM)

@app.route('/', methods=['GET'])
def home():
    return 'Online.\r\nGo to /send/ /update/ /add/ /remove/ or /get/'


@app.route('/send/<command>', methods=['GET'])
def sendCommand(command):
    print('=> sending command: ' + command)
    controller.emit(command)
    GPIO.setup(22, GPIO.OUT)
    GPIO.output(22, False)
    return 'command send'


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
