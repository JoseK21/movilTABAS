import { Component, OnInit, ViewChild } from '@angular/core';
import { LogComponent } from '../log/log.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // show : string = 'actions';
  show: string = 'log_in';
  username: string = '';

  parentMessage = "message from parent"

  @ViewChild(LogComponent) child;

  constructor() { }

  ngOnInit() { }

  receiveMessage($event) {
    this.username = $event;
    this.show = 'actions'
  }
  
  receiveMessageSIGN_OUT($event) {
    if($event=='log_in'){
      this.show = 'log_in'
    }
  }

}
