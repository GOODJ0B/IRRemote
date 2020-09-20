import flask
from ircodec.command import CommandSet
import json

with open('commands.json') as json_file:
    commands = json.load(json_file)

app = flask.Flask(__name__)
app.config["DEBUG"] = True

controller = CommandSet.load('samsung-tv.json')

@app.route('/send-command', methods=['GET'])
def home():
    command = request.args.get("command")
    controller.emit(command)

@app.route('/add-command', methods=['GET'])
def home():
    command = request.args.get("command")
    commands.append(command)
    with open('commands.json', 'w') as outfile:
        json.dump(commands, outfile)


app.run()