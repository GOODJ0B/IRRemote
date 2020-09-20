from ircodec.command import CommandSet

class IRSender:

    def __init__(self):
        self.controller = CommandSet.load('samsung-tv.json')

    # Load from JSON

    def sendCommand(self, commandName):
        # Send the volume up command
        self.controller.emit(commandName)
        return

