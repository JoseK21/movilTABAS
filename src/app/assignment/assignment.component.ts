import { Component, OnInit, Input } from '@angular/core';
import { delay } from 'q';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  @Input() childMessage: string;      // Username from log In
  

  status_scanning: String = '';   // 0: Nothing -- 1: Spinner -- 2: Options
  status_rejection: boolean = false;
  show_S_A: boolean = true;

  constructor() { }

  ngOnInit() {
    
  }

  /**
   *  status_scan
   */
  public status_scan() {
    let suitcase_ID: string = (<HTMLInputElement>document.getElementById("input_suitcase_id")).value.trim();
    if (suitcase_ID == '1') {
      this.status_scanning = '1';
      setTimeout(() => {
        this.status_scanning = '2';
        (<HTMLInputElement>document.getElementById("input_suitcase_id")).disabled = false;
      }, 4000);
      (<HTMLInputElement>document.getElementById("input_suitcase_id")).disabled = true;      
    }
    else{
      this.status_scanning = suitcase_ID;
    }
  }

  /**
   * switch_On
   */
  public switch_On() {
    let suitcase_ID: boolean = (<HTMLInputElement>document.getElementById("switch_rejection")).checked;
    if (suitcase_ID) {
      this.status_rejection = true;
    } else {
      this.status_rejection = false;
    }
  }

  /**
   * enableSectionAndAssignment
   */
  public enableSectionAndAssignment() {
    this.show_S_A = false;
  }

  /**
   * enableSectionAndAssignment
   */
  public hidSectionAndAssignment() {
    this.show_S_A = true;
  }

  /**
   * assignment
   */
  public assignment() {
    alert(
      "Username : "+this.childMessage  
    + "\nSuitcase Id : " + (<HTMLInputElement>document.getElementById("input_suitcase_id")).value
    +"\nFlight Id : "+(<HTMLInputElement>document.getElementById("input_Flight_Id")).value 
    +"\nSection : "+(<HTMLInputElement>document.getElementById("input_Section")).value     
    );    
  }

}