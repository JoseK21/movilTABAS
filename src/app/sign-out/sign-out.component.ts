import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  message: string = "log_in"
  @Input() childMessage: string;
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }
  ngOnInit() {  }

  /**
   * Send Message to Sign Out
   */
  sendMessage() {
    this.messageEvent.emit(this.message)
  }
}
