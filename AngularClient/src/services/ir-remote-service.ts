import {HttpClient} from '@angular/common/http';
import {Command} from '../reference/reference';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IrRemoteService {

  public url = 'http://192.168.0.40:5000';
  public commands: Command[];
  public isReceiving = false;

  constructor(private readonly  httpClient: HttpClient) {
  }

  public updateController(): void {
    this.httpClient.get<Command[]>(this.url + '/get')
      .subscribe(this.updateCommands.bind(this));
  }

  public sendCommand(command: string): void {
    this.httpClient.get(this.url + '/send/' + command).subscribe();
  }

  public addCommand(name: string, icon: string, location: number): void {
    this.isReceiving = true;
    this.httpClient.get<Command[]>(this.url + '/add/' + location + '/' + icon  + '/' + name).subscribe(this.updateCommands.bind(this));
  }

  public updateCommand(name: string, icon: string, location: number): void {
    this.httpClient.get<Command[]>(this.url + '/update/' + location + '/' + icon  + '/' + name).subscribe(this.updateCommands.bind(this));
  }

  public removeCommand(name: string): void {
    this.httpClient.get<Command[]>(this.url + '/remove/' + name).subscribe(this.updateCommands.bind(this));
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
