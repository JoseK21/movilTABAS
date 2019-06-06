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

  ngOnInit( ) {  this.getBaggageActive()  }

  /**
   * getRoles
   */
  public getBaggageActive() {
    this.service_scan.getUnassignedBaggage().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.list1 = jsonWEBAPI.suitcases;     
      } else {
        this.list1 = [];
        this.list1.push("Error")
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

   /**
   * Log In
   */
  public xxx() {
    let username: string = (<HTMLInputElement>document.getElementById("input_BaggageSCAN")).value.trim();
    let password: string = (<HTMLInputElement>document.getElementById("input_Password")).value.trim();
    let role: string = (<HTMLInputElement>document.getElementById("input_Role")).value.trim();

    if (username.length == 0 || password.length == 0 ||role == 'ERROR') { //if (username.length == 0 || password.length == 0 || role.length == 0) {
      this.show_alert = true;
      this.text_alert = 'Empty spaces';
      this.type_alert = 'warning';
    } else {
      const json = {
        username: username,
        password: password,
        role: role
      };

      /*
      this.service_scan.logIn(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        console.log(jsonWEBAPI);
        if (jsonWEBAPI.http_result == 1) {
        } else {
          this.show_alert = true;
          this.text_alert = jsonWEBAPI.msg;
          this.type_alert = 'danger';
        }
      });
      */
    }
  }


}
