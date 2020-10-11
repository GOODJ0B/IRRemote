import {Component, OnInit} from '@angular/core';
import {IrRemoteService} from '../services/ir-remote-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'IR Remote';
  public deleting = false;

  constructor(public readonly irRemoteService: IrRemoteService) {
  }

  ngOnInit(): void {
    this.irRemoteService.updateController();
  }

  public commandClickedHandler(commandName: string): void {
    if (this.deleting) {
      if (confirm(commandName + ' verwijderen?')){
        this.irRemoteService.removeCommand(commandName);
        this.deleting = false;
      }
    } else {
      this.irRemoteService.sendCommand(commandName);
    }
  }

  public deleteCommand(): void {
    this.deleting = !this.deleting;
  }

  public addCommand(): void {
    const name = prompt('Voer een naam in:', '');

    if (name) {
      const icon = prompt('Voer een icon in (zie fontawesome.com):', '');

      if (icon) {
        this.irRemoteService.addCommand(name, icon, 4);
      }
    }
  }
}
