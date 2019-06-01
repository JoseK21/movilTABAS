import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.init_init();
  }

  @Input() childMessage: string;    // Username from log -> from main
  parentMessage : string = 'Empty';
   
  /**
   * init
   */
  public init_init() {    
    this.parentMessage = this.childMessage;
  }
}
