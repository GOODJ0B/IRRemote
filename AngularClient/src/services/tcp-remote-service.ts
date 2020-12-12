import {Injectable} from '@angular/core';
import KEYS from "../reference/keys";
import {TcpCommand} from "../reference/reference";
import APPS from "../reference/apps";

@Injectable({
  providedIn: 'root',
})
export class TcpRemoteService {

  private ip = "192.168.0.41";
  private port = 8001;
  private name = "Tm9kZUpTLVRlc3Q=";
  private readonly WS_URL = `ws://${this.ip}:${this.port}/api/v2/channels/samsung.remote.control?name=${this.name}`;
  public connected = false;

  public commands: TcpCommand[] = [{
    isVisible: false,
    customHandling: () => this.getApps(),
  } as TcpCommand, {
    isVisible: false,
  } as TcpCommand, {
    isVisible: true,
    customHandling: () => this.openApp(APPS.VideoLand),
    image: "assets/videoland.png"
  } as TcpCommand, {
    isVisible: true,
    customHandling: () => this.openApp(APPS.NLZiet),
    image: "assets/nlziet.png"
  } as TcpCommand, {
    isVisible: true,
    customHandling: () => this.openApp(APPS.Netflix),
    image: "assets/netflix.png"
  } as TcpCommand, {
    icon: "fa-download",
    location: 10,
    name: "input",
    isVisible: true,
    key: KEYS.KEY_ID_INPUT,
  } as TcpCommand, {
    icon: "fa-cogs",
    location: 11,
    name: "menu",
    isVisible: true,
    key: KEYS.KEY_MENU,
  } as TcpCommand, {
    isVisible: false,
  } as TcpCommand, {
    location: 13,
    name: "play",
    isVisible: true,
    key: KEYS.KEY_PLAY,
  } as TcpCommand, {
    icon: "fa-stop",
    location: 14,
    name: "stop",
    isVisible: true,
    key: KEYS.KEY_STOP,
  } as TcpCommand, {
    isVisible: false,
  } as TcpCommand, {
    isVisible: false,
  } as TcpCommand, {
    icon: "fa-chevron-up",
    location: 17,
    name: "up",
    isVisible: true,
    key: KEYS.KEY_UP,
  } as TcpCommand, {
    isVisible: false,
  } as TcpCommand, {
    isVisible: false,
  } as TcpCommand, {
    isVisible: false,
  } as TcpCommand, {
    icon: "fa-chevron-left",
    location: 21,
    name: "left",
    isVisible: true,
    key: KEYS.KEY_LEFT,
  } as TcpCommand, {
    icon: "fa-circle",
    location: 22,
    name: "ok",
    isVisible: true,
    key: KEYS.KEY_ENTER,
  } as TcpCommand, {
    icon: "fa-chevron-right",
    location: 23,
    name: "right",
    isVisible: true,
    key: KEYS.KEY_RIGHT,
  } as TcpCommand, {
    icon: "fa-volume-up",
    location: 24,
    name: "volume up",
    isVisible: true,
    key: KEYS.KEY_VOLUP,
  } as TcpCommand, {
    icon: "fa-power-off",
    location: 25,
    name: "power",
    isVisible: true,
    key: KEYS.KEY_POWER,
  } as TcpCommand, {
    icon: "fa-undo",
    location: 26,
    name: "back",
    isVisible: true,
    key: KEYS.KEY_RETURN,
  } as TcpCommand, {
    icon: "fa-chevron-down",
    location: 27,
    name: "down",
    isVisible: true,
    key: KEYS.KEY_DOWN,
  } as TcpCommand, {
    icon: "fa-home",
    location: 28,
    name: "home",
    isVisible: true,
    key: KEYS.KEY_HOME,
  } as TcpCommand, {
    icon: "fa-volume-down",
    location: 29,
    name: "volume down",
    isVisible: true,
    key: KEYS.KEY_VOLDOWN,
  } as TcpCommand
  ];

  constructor() {
  }

  private getApps() {
    const message = {
      method: 'ms.channel.emit',
      params: {
        data: '',
        event: 'ed.installedApp.get',
        to: 'host'
      }
    }
    this.webSocket.send(JSON.stringify(message));
  }

  private openApp(appId: APPS) {
    const message = {
      method: 'ms.channel.emit',
      params: {
        data: {
          action_type: 'DEEP_LINK',
          appId: appId
        },
        event: 'ed.apps.launch',
        to: 'host'
      }
    }
    this.webSocket.send(JSON.stringify(message));
  }

  public sendTcpCommand(command: TcpCommand) {
    if (command.customHandling) {
      command.customHandling();
      return;
    }
    const message = this.getCommandByKey(command.key);
    this.webSocket.send(JSON.stringify(message));
    if (command.key === KEYS.KEY_POWER) {
      this.connected = false;
    }
  }

  private onOpen(event) {
    console.info('onOpen', event);
    this.connected = true;
  }

  private onClose(event) {
    console.info('onClose', event);
    this.connected = false;
  }

  private onError(event) {
    console.warn('onError', event);
  }

  private onMessage(event) {
    const data = JSON.parse(event.data);
    console.log('onMessage', event, data);
  }

  private webSocket: WebSocket;

  public initialize(): void {
    // const emptyCommands = [];
    // for (let i = 0; i < 10; i++) {
    //   emptyCommands.push({ isVisible: false } as TcpCommand);
    // }
    // this.commands = emptyCommands.concat(this.commands);

    const config = {
      debug: true,
      ip: '192.168.0.41',
      mac: '40163BE48858',
      nameApp: 'NodeJS-Test',
      port: 8001,
    };

    this.webSocket = new WebSocket(this.WS_URL)

    this.webSocket.onopen = this.onOpen.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onmessage = this.onMessage.bind(this);
  }

  private getCommandByKey(key: KEYS): any {
    return {
      method: 'ms.remote.control',
      params: {
        Cmd: 'Click',
        DataOfCmd: key,
        Option: 'false',
        TypeOfRemote: 'SendRemoteKey'
      }
    }
  }
}
