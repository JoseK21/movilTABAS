import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  modal : boolean = false ;

  constructor() { }

  ngOnInit() {
  }

  /**
   * show_Modal
   */
  public show_Modal() {
    this.modal = true;
  }

  /**
   * show_Modal
   */
  public hide_Modal() {
    this.modal = false;
  }
}
