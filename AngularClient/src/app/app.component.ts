import {Component, OnInit} from '@angular/core';
import {IrRemoteService} from '../services/ir-remote-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IRRemote';


  constructor(public readonly irRemoteService: IrRemoteService) {
  }

  ngOnInit(): void {
    this.irRemoteService.updateController();
  }
}
