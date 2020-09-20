# Create a CommandSet for your remote control
# GPIO for the IR receiver: 23
# GPIO for the IR transmitter: 22
from ircodec.command import CommandSet

from infrared.commands import commands

controller = CommandSet(emitter_gpio=22, receiver_gpio=23, description='TV remote')

# Add the volume up key
for command in commands:
    controller.add(command.name)
# Connected to pigpio
# Detecting IR command...
# Received.

# Remove the volume up command
controller.remove('volume_up')

# Examine the contents of the CommandSet
controller
# CommandSet(emitter=22, receiver=23, description="TV remote")
# {}

# Save to JSON
controller.save_as('samsung-tv.json')
