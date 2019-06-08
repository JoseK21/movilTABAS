import { Component, OnInit, Input } from '@angular/core';
import { delay } from 'q';
import { ServiceScanService } from '../services/service-scan.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  
  // Alert 
  show_alert: boolean = false;
  text_alert: string = 'All is perfect';
  type_alert: string = 'success';

  //Animation
  status_scanning: String = '';
  status: string = '';
  status_rejection: boolean = false;
  show_S_A: boolean = true;
  pass: boolean = false;
  
  //List
  flights: [];
  baggagesU: [];
  seccion_flights: []; 

  @Input() childMessage: string; 

  constructor(private service_scan: ServiceScanService) { }

  ngOnInit() { this.getBaggages() }

  /**
   * Get Flights' List
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
   * Get sections of a flight 
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
   * Scans a user´s baggage returns an alert if something goes wrong
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
          let suitcase_id: string = (<HTMLInputElement>document.getElementById("input_baggagesU")).value.trim();
          const json = {
            suitcase_id: Number(suitcase_id),
            username: this.childMessage,  // from other windows
            status: this.status
          };
          this.service_scan.insertScannedBaggage(json).subscribe((jsonTransfer) => {
            const userStr = JSON.stringify(jsonTransfer);
            const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
            console.log(jsonWEBAPI);
            if (jsonWEBAPI.http_result == 1) {
              this.getFlights();
              this.status_scanning = '2';
            } else {
              alert("Error add accepted baggage ");
            }
          });         
        } else if (this.pass == false) {
          this.status_scanning = '3';
        } else {
          alert("ERROR DE COMUNICACIÓN");
        }
      }
    });
  }

  /**
   *  Shows icon of scanning a suitcase
   */
  public status_scan() {
    this.status_scanning = '1'; // Show Sppiner
    setTimeout(() => {
      this.scanBaggage();
    }, 4000);
  }

  /**
   * Change Switch_On_OFF Status
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
   * Enable Section And Assignment
   */
  public enableSectionAndAssignment() {
    this.show_S_A = false;
  }

  /**
   * Disable Section And Assignment
   */
  public hidSectionAndAssignment() {
    this.show_S_A = true;
  }

  /**
   * Assign suitcases to an airplane section
   */
  public assignment() {
    let baggagesU = (<HTMLInputElement>document.getElementById("input_baggagesU")).value.trim();
    let flight_Id = (<HTMLInputElement>document.getElementById("input_Flight_Id")).value.trim();
    let section = (<HTMLInputElement>document.getElementById("input_Section")).value.trim();

    if (baggagesU.length == 0 || flight_Id.length == 0 || section.length == 0) {
      this.show_alert = true;
      this.text_alert = 'Empty spaces';
      this.type_alert = 'warning';
    } else {
      const json = {
        suitcase_id: Number(baggagesU),
        flight_id: Number(flight_Id),
        section_id: Number(section)
      };
      this.service_scan.assignBagToSection(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        console.log(jsonWEBAPI);
        if (jsonWEBAPI.http_result == 1) {
          this.getBaggages(); 
          this.show_alert = true;
          this.text_alert = jsonWEBAPI.msg;
          this.type_alert = 'success';
          (<HTMLInputElement>document.getElementById("input_baggagesU")).value = '';
          (<HTMLInputElement>document.getElementById("input_Flight_Id")).value = '';
          (<HTMLInputElement>document.getElementById("input_Section")).value = '';
          this.status_scanning = '-1'; 
        } else {
          this.show_alert = true;
          this.text_alert = jsonWEBAPI.msg;
          this.type_alert = 'danger';
        }
      });
    }
  }

  /**
   * Show Alert
   */
  public show_Alert(value: boolean) {
    this.show_alert = value;
  }

  /**
   * Assigns scanned status to the suitcases 
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
   * Gets unchecked suitcases
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
