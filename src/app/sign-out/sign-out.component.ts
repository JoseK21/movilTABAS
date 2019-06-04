import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  @Input() childMessage: string;
  constructor() { }
  ngOnInit() {  }

  message: string = "log_in"

  @Output() messageEvent = new EventEmitter<string>();

  
  sendMessage() {
    this.messageEvent.emit(this.message)
  }
}
