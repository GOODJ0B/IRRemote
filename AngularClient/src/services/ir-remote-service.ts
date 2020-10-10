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
      .subscribe(controller => {
        this.controller = controller;
        console.log(controller);
        this.commands = [];
        for (const key in controller.commands) {
          const icon = icons[controller.commands[key].name] ?? 'fa fa-question-circle';
          this.commands.push({name: controller.commands[key].name, icon} as CommandInformation);
        }
      });
  }

  public sendCommand(command: string): void {
    this.httpClient.get<string>(this.url + '/send/' + command).subscribe();
  }
}
