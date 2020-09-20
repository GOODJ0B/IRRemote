from ircodec.command import CommandSet

controller = CommandSet.load('samsung-tv.json')
controller.emit('power')

