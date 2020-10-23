import {HttpClient} from '@angular/common/http';
import {Command, RfCommand} from '../reference/reference';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RfRemoteService {
  public waitingForResponse: boolean;
  public url: string;
  private port = 5000;
  public commands: RfCommand[] = [{
    name: 'vensterbank',
    icon: 'hashtag',
    isOn: true,
    index: 0,
    location: 0,
    isVisible: true
  } as RfCommand, {
    name: 'tv kast',
    icon: 'tv',
    isOn: true,
    index: 1,
    location: 1,
    isVisible: true
  } as RfCommand, {
    name: 'keuken',
    icon: 'apple',
    isOn: true,
    index: 2,
    location: 2,
    isVisible: true
  } as RfCommand, {
    name: 'leeg',
    icon: 'fa-light',
    isOn: true,
    index: 3,
    location: 3,
    isVisible: false
  } as RfCommand, {
    name: 'alles aan',
    icon: 'toggle-on',
    isOn: true,
    index: 4,
    location: 4,
    isVisible: true
  } as RfCommand, {
    name: 'vensterbank',
    icon: 'hashtag',
    isOn: false,
    index: 0,
    location: 5,
    isVisible: true
  } as RfCommand, {
    name: 'tv kast',
    icon: 'tv',
    isOn: false,
    index: 1,
    location: 6,
    isVisible: true
  } as RfCommand, {
    name: 'keuken',
    icon: 'apple',
    isOn: false,
    index: 2,
    location: 7,
    isVisible: true
  } as RfCommand, {
    name: 'leeg',
    icon: '',
    isOn: false,
    index: 3,
    location: 8,
    isVisible: false
  } as RfCommand, {
    name: 'alles uit',
    icon: 'toggle-off',
    isOn: false,
    index: 4,
    location: 9,
    isVisible: true
  } as RfCommand
  ];

  constructor(private readonly httpClient: HttpClient) {
    let url = window.location.href;
    // remove '/' from end
    url = url.substr(0, url.length - 1);

    // remove port number if exists
    for (let i = 'http://'.length; i < url.length; i++) {
      if (url[i] === ':') {
        url = url.substr(0, i);
      }
    }

    // add port number of backend
    this.url = url + ':' + this.port;
  }

  public sendRfCommand(command: RfCommand): void {
    if (this.waitingForResponse) {
      return;
    }
    this.waitingForResponse = true;

    if (command.name === 'alles aan'){
      this.httpClient.put<string>(this.url + '/everythingOn', null)
        .subscribe(() => this.waitingForResponse = false);
    } else if (command.name === 'alles uit'){
      this.httpClient.put<string>(this.url + '/everythingOff', null)
        .subscribe(() => this.waitingForResponse = false);
    } else if (command.isOn) {
      this.httpClient.put<string>(this.url + '/send-rf-on/' + command.index, null)
        .subscribe(() => this.waitingForResponse = false);
    } else {
      this.httpClient.put<string>(this.url + '/send-rf-off/' + command.index, null)
        .subscribe(() => this.waitingForResponse = false);
    }
  }
}
