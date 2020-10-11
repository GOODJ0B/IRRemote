import {HttpClient} from '@angular/common/http';
import {Controller} from '../reference/reference';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IrRemoteService {

  public url = 'http://192.168.0.185:5000';
  public controller: Controller;
  public commands: string[];

  constructor(private readonly  httpClient: HttpClient) {
  }

  public updateController(): void {
    this.httpClient.get<Controller>(this.url + '/get')
      .subscribe(controller => {
        this.controller = controller;
        console.log(controller);
        this.commands = [];
        for (const key in controller.commands) {
          this.commands.push(controller.commands[key].name);
        }
      });
  }

  public sendCommand(command: string): void {
    this.httpClient.get<string>(this.url + '/send/' + command).subscribe();
  }
}
