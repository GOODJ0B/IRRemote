import pickle
import json

class Command:
  def __init__(self, name, icon, location):
    self.name = name
    self.icon = icon
    self.location = location

# with open("commands.txt", "rb") as fp:
#     commands = pickle.load(fp)
#
# commands = []
# commands.append(Command('power', 'fa-power-off', "1"))
# commands.append(Command('home', 'fa-home', "2"))
#
#
# with open('commands.txt', 'wb') as file:
#     pickle.dump(commands, file)
# print(commands)
# commands = [command for command in commands if command.name != 'power']
# print(commands[0].name)
