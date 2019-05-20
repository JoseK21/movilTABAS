import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  @Input() childMessage: string;
  
  constructor() { }

  ngOnInit() {
  }

}
