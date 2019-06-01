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
  signUpAdmin(json: any) {
    console.log(JSON.parse(JSON.stringify(json)));
    const path = `${this.api}signup`;
    return this.http.post(path, "'" + JSON.stringify(json) + "'", httpOptions);
  }

  /**
   * Set the Role of a Admin
   * @param username Username of Admin
   * @param json '{"roles":["A", "B"]}'
   */
  adminSetRole(username: string, json: any) {
    console.log(JSON.parse(JSON.stringify(json)));
    const path = `${this.api}signup/${username}/roles`;
    return this.http.post(path, "'" + JSON.stringify(json) + "'", httpOptions);
  }

  /**
   * Get all Roles
   */
  getRoles() {
    const path = `${this.api}roles`;
    console.log(path);
    return this.http.get(path);
  }
}
