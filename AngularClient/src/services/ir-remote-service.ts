import {HttpClient} from '@angular/common/http';
import {Command} from '../reference/reference';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IrRemoteService {

  public url: string;
  private port = 5000;
  public commands: Command[];
  public isReceiving = false;

  constructor(private readonly  httpClient: HttpClient) {
    let url = window.location.href;
    // remove '/' from end
    url = url.substr(0, url.length - 1);

    // remove port number if exists
    for (let i = 'http://'.length; i < url.length; i++) {
      if (url[i] === ':') {
        url = url.substr(0, i);
      }
    }

    // url = 'http://192.168.0.40';
    // add port number of backend
    this.url = url + ':' + this.port;
  }

  public updateController(): void {
    this.httpClient.get<Command[]>(this.url + '/get')
      .subscribe(this.updateCommands.bind(this));
  }

  public sendCommand(command: Command): void {
    command.isBusy = true;
    this.httpClient.put(this.url + '/send/' + command.name, null)
      .subscribe(); // () => command.isBusy = false);
  }

  public addCommand(name: string, icon: string, location: number): void {
    this.isReceiving = true;
    this.httpClient.post<Command[]>(this.url + '/add/' + location + '/' + icon  + '/' + name, null)
      .subscribe(this.updateCommands.bind(this));
  }

  public updateCommand(name: string, icon: string, location: number): void {
    this.httpClient.put<Command[]>(this.url + '/update/' + location + '/' + icon  + '/' + name, null)
      .subscribe(this.updateCommands.bind(this));
  }

  public removeCommand(name: string): void {
    this.httpClient.delete<Command[]>(this.url + '/remove/' + name).subscribe(this.updateCommands.bind(this));
  }

  private updateCommands(commands: Command[]): void {
    this.isReceiving = false;
    this.commands = [];
    for (let i = 0; i < 40; i++) {
      this.commands[i] = {
        name: 'Toevoegen',
        icon: 'fa-plus',
        location: i,
        isAddAction: true
      } as Command;
    }

    commands.forEach(command => {
      this.commands[command.location] = command;
    });

    console.log(this.commands);
  }
}
