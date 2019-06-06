import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class ServiceScanService {

  private api = 'https://tabas-api.azurewebsites.net/tabas/';

  constructor(private http: HttpClient) { }

  /**
   * Sign Up Admin
   * @param json '{"suitcase_id":X, "username": "XXX", "status": "XXX", "comment": "XXXXX"}' if bagggage was rejected or '{"suitcase_id":X, "username": "XXX", "status": "XXX"}' otherwise
   */
  insertScannedBaggage(json: any) {
    const path = `${this.api}scan/baggage`;
    console.log(json);
    console.log(path);
    return this.http.post(path, "'" + JSON.stringify(json) + "'", httpOptions);
  }

  assignBagToSection(json: any) {
    const path = `${this.api}section/assign`;
    console.log(json);
    console.log(path);
    return this.http.post(path, "'" + JSON.stringify(json) + "'", httpOptions);
  }

  /**
   * Do simulation of scanning a baggage
   */
  scanBaggage() {
    const path = `${this.api}scan/`;
    console.log(path);
    return this.http.get(path);
  }

  /**
   * Get all Flights
   */
  getFlights() {
    const path = `${this.api}flights/active`;
    console.log(path);
    return this.http.get(path);
  }

  /**
   * Get all Flights
   */
  getSeccions(flight:number) {
    const path = `${this.api}${flight}/sections`;
    console.log(path);
    return this.http.get(path);
  }
  
  /**
   * Get all Flights
   */
  getBaggageUnchecked() {
    const path = `${this.api}baggage/unchecked`;
    console.log(path);
    return this.http.get(path);
  }
}

