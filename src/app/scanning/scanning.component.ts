import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.css']
})
export class ScanningComponent implements OnInit {
  @Input() childMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
