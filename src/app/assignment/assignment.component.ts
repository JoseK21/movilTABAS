import { Component, OnInit, Input } from '@angular/core';
import { delay } from 'q';
import { ServiceScanService } from '../services/service-scan.service';

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

  pass: boolean = false;
  status: string = '';

  flights: []; // List of flights


  constructor(private service_scan: ServiceScanService) { }

  ngOnInit() {}

  /**
   * getFlights
   */
  public getFlights() {
    this.service_scan.getFlights().subscribe((jsonTransfer) => {
      const jsonWEBAPI = JSON.parse(JSON.parse(JSON.stringify(jsonTransfer)));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.flights = jsonWEBAPI.flights;        
      } else {
        this.flights = [];
      }
    });
  }


  /**
   * scanBaggage
   */
  public scanBaggage() {
    this.service_scan.scanBaggage().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.pass = jsonWEBAPI.pass;
        this.status = jsonWEBAPI.status;
        if (this.pass == true) {
          this.getFlights();
          this.status_scanning = '2';          
        } else if (this.pass == false) {
          this.status_scanning = '3';
        } else {
          alert("ERROR DE COMUNICACIÓN");
        }
      }
    });
  }

  /**
   *  status_scan
   */
  public status_scan() {

    this.status_scanning = '1'; // Show Sppiner

    (<HTMLInputElement>document.getElementById("input_suitcase_id")).disabled = true;

    setTimeout(() => {
      this.scanBaggage();
      (<HTMLInputElement>document.getElementById("input_suitcase_id")).disabled = false;
    }, 4000);
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
      "Username : " + this.childMessage
      + "\nSuitcase Id : " + (<HTMLInputElement>document.getElementById("input_suitcase_id")).value
      + "\nFlight Id : " + (<HTMLInputElement>document.getElementById("input_Flight_Id")).value
      + "\nSection : " + (<HTMLInputElement>document.getElementById("input_Section")).value
    );
  }




}
