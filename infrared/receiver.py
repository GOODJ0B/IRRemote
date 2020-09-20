# Create a CommandSet for your remote control
# GPIO for the IR receiver: 23
# GPIO for the IR transmitter: 22
from ircodec.command import CommandSet

controller = CommandSet(emitter_gpio=22, receiver_gpio=23, description='TV remote', name='SamsungTV')

power = 'power'
volume_up = 'volume_up'
volume_down = 'volume_down'
up = 'up'
down = 'down'
left = 'left'
right = 'right'
ok = 'ok'
back = 'back'
home = 'home'
play = 'play'
pause = 'pause'
stop = 'stop'
playpause = 'playpause'

commands = [
    power,
    volume_up,
    volume_down,
    up,
    down,
    left,
    right,
    ok,
    back,
    home,
    play,
    pause,
    stop,
    playpause,
]

# Add the volume up key
for command in commands:
    controller.add(command)
# Connected to pigpio
# Detecting IR command...
# Received.

# Remove the volume up command
# controller.remove('volume_up')

# Examine the contents of the CommandSet
controller
# CommandSet(emitter=22, receiver=23, description="TV remote")
# {}

# Save to JSON
controller.save_as('samsung-tv.json')
