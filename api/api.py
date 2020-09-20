import flask

from infrared.sender import IRSender

app = flask.Flask(__name__)
app.config["DEBUG"] = True

irSender = IRSender()

@app.route('/ir-command', methods=['GET'])
def home(commandName):
    irSender.sendCommand(commandName)

app.run()