import {Component, OnInit} from '@angular/core';
import {IrRemoteService} from '../services/ir-remote-service';
import {Command, RfCommand} from '../reference/reference';
import {RfRemoteService} from '../services/rf-remote-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'IR Remote';
  public deleting = false;
  public enableEdit = false;
  public rowIndexes = [10, 15, 20, 25, 30, 35];
  public rfRowIndexes = [0, 5];
  public adding = false;

  constructor(public readonly irRemoteService: IrRemoteService,
              public readonly rfRemoteService: RfRemoteService,
              activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(paramMap => {
      this.enableEdit = paramMap.edit !== undefined;
    });
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
      return;
    }

    if (this.deleting) {
      if (confirm(command.name + ' verwijderen?')){
        this.irRemoteService.removeCommand(command.name);
        this.deleting = false;
      }
      return;
    }

    this.irRemoteService.sendCommand(command.name);
  }

  public rfCommandClickedHandler(command: RfCommand): void {
    this.rfRemoteService.sendRfCommand(command);
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
