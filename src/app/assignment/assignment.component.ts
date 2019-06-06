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

  
  // Alert 
  show_alert: boolean = false;
  text_alert: string = 'All is perfect';
  type_alert: string = 'success';


  status_scanning: String = '';   // 0: Nothing -- 1: Spinner -- 2: Options
  status_rejection: boolean = false;
  show_S_A: boolean = true;

  pass: boolean = false;
  status: string = '';

  flights: []; // List of flights
  baggagesU: []; // List of baggages Unchecked
  seccion_flights : []; // Seccions of a flight


  constructor(private service_scan: ServiceScanService) { }

  ngOnInit() { this.getBaggages() }

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
   * get seccion of a flight 
   */
  public getSeccions() {
    let f: string = (<HTMLInputElement>document.getElementById("input_Flight_Id")).value.trim();
    this.service_scan.getSeccions(Number(f)).subscribe((jsonTransfer) => {
      const jsonWEBAPI = JSON.parse(JSON.parse(JSON.stringify(jsonTransfer)));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.seccion_flights = jsonWEBAPI.sections;
        this.enableSectionAndAssignment();
      } else {
        this.seccion_flights = [];
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
    setTimeout(() => {
      this.scanBaggage();
    }, 4000);
  }

  /**
   * switch_On
   */
  public switch_On() {
    let sw: boolean = (<HTMLInputElement>document.getElementById("switch_rejection")).checked;
    if (sw) {
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
      + "\nSuitcase Id : " + (<HTMLInputElement>document.getElementById("input_baggagesU")).value
      + "\nFlight Id : " + (<HTMLInputElement>document.getElementById("input_Flight_Id")).value
      + "\nSection : " + (<HTMLInputElement>document.getElementById("input_Section")).value
    );
  }

  /**
   * show_Modal
   */
  public show_Alert(value: boolean) {
    this.show_alert = value;
  }

  /**
   * insertScannedBaggage
   */
  public insertScannedBaggage() {
    let suitcase_id: string = (<HTMLInputElement>document.getElementById("input_baggagesU")).value.trim();
    let comment: string = (<HTMLInputElement>document.getElementById("input_comment")).value.trim();

    if (suitcase_id.length == 0 || comment.length == 0) {
      this.show_alert = true;
      this.text_alert = 'Empty spaces';
      this.type_alert = 'warning';
    } else {
      const json = {
        suitcase_id: Number(suitcase_id),
        username: this.childMessage,  // from other windows
        status: 'Rejected',
        comment: comment
      };

      this.service_scan.insertScannedBaggage(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        console.log(jsonWEBAPI);
        if (jsonWEBAPI.http_result == 1) {
          this.getBaggages(); // Reinicia la lista de baggage
          this.show_alert = true;
          this.text_alert = "Successful process";
          this.type_alert = 'success';
        } else {
          this.show_alert = true;
          this.text_alert = "Denied status";
          this.type_alert = 'danger';
        }
      });
    }
  }


  /**
   * get baggages un
   */
  public getBaggages() {
    this.service_scan.getBaggageUnchecked().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.baggagesU = jsonWEBAPI.suitcases;
      } else {
        this.baggagesU = [];
      }
    });
  }

}
