import {HttpClient} from '@angular/common/http';
import {Controller} from '../reference/reference';
import {Injectable} from '@angular/core';
import { CommandInformation } from '../reference/command-information';
import { icons } from '../reference/icons';

@Injectable({
  providedIn: 'root',
})
export class IrRemoteService {

  public url = 'http://192.168.0.185:5000';
  public controller: Controller;
  public commands: CommandInformation[];

  constructor(private readonly  httpClient: HttpClient) {
  }

  public updateController(): void {
    this.httpClient.get<Controller>(this.url + '/get')
      .subscribe(this.updateCommands.bind(this));
  }

  public sendCommand(command: string): void {
    this.httpClient.get<string>(this.url + '/send/' + command).subscribe();
  }

  public addCommand(command: string): void {
    this.httpClient.get<Controller>(this.url + '/add/' + command).subscribe(this.updateCommands.bind(this));
  }

  public updateCommand(command: string): void {
    this.httpClient.get<Controller>(this.url + '/update/' + command).subscribe(this.updateCommands.bind(this));
  }

  public removeCommand(command: string): void {
    this.httpClient.get<Controller>(this.url + '/remove/' + command).subscribe(this.updateCommands.bind(this));
  }

  private updateCommands(controller: Controller): void {
      this.controller = controller;
      console.log(controller);
      this.commands = [];
      for (const key in controller.commands) {
        const icon = icons[controller.commands[key].name] ?? 'fa fa-question-circle';
        this.commands.push({name: controller.commands[key].name, icon} as CommandInformation);
      }
  }
}
