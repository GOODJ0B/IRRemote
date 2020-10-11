import {Component, OnInit} from '@angular/core';
import {IrRemoteService} from '../services/ir-remote-service';
import {Command} from '../reference/reference';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'IR Remote';
  public deleting = false;
  public rowIndexes = [0, 5, 10, 15, 20, 25, 30, 35];
  public adding = false;

  constructor(public readonly irRemoteService: IrRemoteService) {
  }

  ngOnInit(): void {
    this.irRemoteService.updateController();
  }

  public commandClickedHandler(command: Command): void {
    if (command.isAddAction) {
      if (!this.adding) {
        return;
      }
        this.addCommand(command.location);
    }
    if (this.deleting) {
      if (confirm(command.name + ' verwijderen?')){
        this.irRemoteService.removeCommand(command.name);
        this.deleting = false;
      }
    } else {
      this.irRemoteService.sendCommand(command.name);
    }
  }

  public startDeleting(): void {
    this.deleting = !this.deleting;
  }

  public startAdding(): void {
    this.adding = !this.adding;
  }

  public addCommand(location: number): void {
    const name = prompt('Voer een naam in:', '');

    if (name) {
      const icon = prompt('Voer een icon in (zie fontawesome.com):', '');

      if (icon) {
        this.irRemoteService.addCommand(name, icon, location);
      }
    }
  }
}
