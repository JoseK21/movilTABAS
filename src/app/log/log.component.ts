import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { ServiceSignUpService } from '../services/service-sign-up.service';
import { ServiceLogInService } from '../services/service-log-in.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  // Show password : check box
  password_show: string = 'password';

  // Alert 
  show_alert: boolean = false;
  text_alert: string = 'All is perfect';
  type_alert: string = 'success';

  // Router
  router_Link: string = '';

  //List
  listRole: String[] = [];

  @Output() messageEvent = new EventEmitter<string>();  // nombre de usuario en msg

  constructor(private service_SignUp: ServiceSignUpService, private service_LogIn: ServiceLogInService) { }

  ngOnInit() { this.getRoles() }

  /**
   * Send Username
   * @param username 
   */
  sendUsername(username: string) {
    this.messageEvent.emit(username)
  }

  /**
   * Show Alert
   * @param value 
   */
  public show_Alert(value: boolean) {
    this.show_alert = value;
  }


  /**
   * Log In
   */
  public logIn() {
    let username: string = (<HTMLInputElement>document.getElementById("input_Username")).value.trim();
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
      this.service_LogIn.logIn(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        console.log(jsonWEBAPI);
        if (jsonWEBAPI.http_result == 1) {
          this.sendUsername(username);
          this.router_Link = 'Actions';
        } else {
          this.show_alert = true;
          this.text_alert = jsonWEBAPI.msg;
          this.type_alert = 'danger';
        }
      });
    }
  }

  /**
   * Gets Roles' List 
   */
  public getRoles() {
    this.service_SignUp.getRoles().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);
      if (jsonWEBAPI.http_result == 1) {
        this.listRole = jsonWEBAPI.roles;
      } else {
        this.listRole = [];
        this.listRole.push("Error")
      }
    });
  }



  /**
   * Show/Hide Password
   */
  public showPassword() {
    if ((<HTMLInputElement>document.getElementById("check_Password")).checked) {
      this.password_show = 'text';
    } else {
      this.password_show = 'password';
    }
  }
}
