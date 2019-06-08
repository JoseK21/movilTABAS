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
   * Insert Scanned Baggage
   * @param json '{"suitcase_id":X, "username": "XXX", "status": "XXX", "comment": "XXXXX"}'
   */
  insertScannedBaggage(json: any) {
    const path = `${this.api}scan/baggage`;
    console.log(json);
    console.log(path);
    return this.http.post(path, "'" + JSON.stringify(json) + "'", httpOptions);
  }

  /**
   * Assign BagCart to Section
   * @param json 
   */
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
   * Get all Sections of a Flight
   */
  getSeccions(flight: number) {
    const path = `${this.api}${flight}/sections`;
    console.log(path);
    return this.http.get(path);
  }

  /**
   * Get Unchecked Baggages 
   */
  getBaggageUnchecked() {
    const path = `${this.api}baggage/unchecked`;
    console.log(path);
    return this.http.get(path);
  }

  /**
   * Get Unassigned Baggage
  */
  getUnassignedBaggage() {
    const path = `${this.api}baggage/unassigned`;
    console.log(path);
    return this.http.get(path);
  }


  /**
   * Get Checker Baggage
   */
  getBaggageChecker(suit_id: number) {
    const path = `${this.api}suitcases/${suit_id}/user`;
    console.log(path);
    return this.http.get(path);
  }

}

