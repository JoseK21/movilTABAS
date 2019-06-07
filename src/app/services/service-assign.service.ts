import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class ServiceAssignService {

  private api = 'https://tabas-api.azurewebsites.net/tabas/';

  constructor(private http: HttpClient) { }

  /**
   * Sign Up Admin
   * @param json '{full_name: XX, email: XX@XX, phone_number: XX, username: XX, password: XX}'
   */
  assing(json: any) {
    console.log(JSON.parse(JSON.stringify(json)));
    const path = `${this.api}signup`;
    return this.http.post(path, "'" + JSON.stringify(json) + "'", httpOptions);
  }

 

  /**
   * Gets suitcases from a user.
   */
  getBaggageChecker(suit_id:string) {
    const path = `${this.api}suitcases/${suit_id}/user`;
    console.log(path);
    return this.http.get(path);
  }
}
