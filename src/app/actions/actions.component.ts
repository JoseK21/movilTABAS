import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor() { }
  ngOnInit() { this.init_init(); }
  @Output() messageEvent = new EventEmitter<string>();
  @Input() childMessage: string;
  parentMessage: string = 'Empty';

  /**
   * 
   */
  public init_init() {
    this.parentMessage = this.childMessage;
  }

  /**
   * 
   * @param $event 
   */
  receiveMessage($event) {
    this.sendMessage($event);
  }


  /**
   * 
   * @param $event 
   */
  sendMessage($event) {
    this.messageEvent.emit($event)
  }
}
