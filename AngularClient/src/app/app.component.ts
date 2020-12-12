import {Component, OnInit} from '@angular/core';
import {IrRemoteService} from '../services/ir-remote-service';
import {Command, RfCommand, TcpCommand} from '../reference/reference';
import {RfRemoteService} from '../services/rf-remote-service';
import {ActivatedRoute} from '@angular/router';
import {TcpRemoteService} from "../services/tcp-remote-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'IR Remote';
  public deleting = false;
  public enableEdit = false;
  public rowIndexes = [0];
  public rfRowIndexes = [0, 5];
  public tcpRowIndexes = [0, 5, 10, 15, 20];
  public adding = false;

  constructor(public readonly irRemoteService: IrRemoteService,
              public readonly rfRemoteService: RfRemoteService,
              public readonly tcpRemoteService: TcpRemoteService,
              activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(paramMap => {
      this.enableEdit = paramMap.edit !== undefined;
    });
    tcpRemoteService.initialize();
  }

  ngOnInit(): void {
    this.irRemoteService.updateController();
  }

  public tvOn() {
    this.irRemoteService.sendCommand({name: 'power'} as Command);
    this.tcpRemoteService.initialize();
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

    this.irRemoteService.sendCommand(command);
  }

  public rfCommandClickedHandler(command: RfCommand): void {
    this.rfRemoteService.sendRfCommand(command);
  }

  public tcpCommandClickedHandler(command: TcpCommand): void {
    this.tcpRemoteService.sendTcpCommand(command);
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
