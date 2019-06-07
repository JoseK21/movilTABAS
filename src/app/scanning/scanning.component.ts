import { Component, OnInit, Input } from '@angular/core';
import { ServiceScanService } from '../services/service-scan.service';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.css']
})
export class ScanningComponent implements OnInit {
  @Input() childMessage: string;

  // Alert 
  show_alert: boolean = false;
  text_alert: string = 'All is perfect';
  type_alert: string = 'success';

  pass: string = '';
  status: string = '';
  list1: String[] = [];

  constructor(private service_scan: ServiceScanService) { }

  ngOnInit( ) {  this.getUnassignedBaggage()  }

  /**
   * getRoles
   */
  public getUnassignedBaggage() { 
    this.service_scan.getUnassignedBaggage().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.list1 = jsonWEBAPI.suitcases;     
      } else {
        this.list1 = [];
          this.list1.push(jsonWEBAPI.msg)
      }
    });
  }

  /**
   * getRoles
   */
  public getBaggageInfo() {
    let id: string = (<HTMLInputElement>document.getElementById("input_BaggageSCAN")).value.trim();
    this.service_scan.getBaggageChecker(Number(id)).subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        (<HTMLInputElement>document.getElementById("output_regBy")).value = jsonWEBAPI.user;     //  sfdfdfdfd
      } else {
        (<HTMLInputElement>document.getElementById("output_regBy")).value = 'Error - Don´t Load the User'
      }
    });
  }
}
