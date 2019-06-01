import { Component, OnInit, Input } from '@angular/core';
import { ServiceScanService } from '../services/service-scan.service';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.css']
})
export class ScanningComponent implements OnInit {
  @Input() childMessage: string;

  pass: string = '';
  status: string = '';

  constructor(private service_scan: ServiceScanService) { }

  ngOnInit() {
  }

  

  /**
   * scanBaggage
   */
  /*
  public scanBaggage() {
    this.service_scan.scanBaggage().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.pass = jsonWEBAPI.pass; 
        this.status = jsonWEBAPI.status;
      } else {
        this.pass = jsonWEBAPI.pass; 
        this.status = jsonWEBAPI.status;
      }
    });
  }
    */
  

}
