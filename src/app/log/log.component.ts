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

  constructor(private service_SignUp: ServiceSignUpService, private service_LogIn: ServiceLogInService) { }

  listRole: String[] = [];


  ngOnInit() { this.getRoles() }


  @Output() messageEvent = new EventEmitter<string>();  // nombre de usuario en msg

  sendUsername(username: string) {
    this.messageEvent.emit(username)
  }


  /**
   * show_Modal
   */
  public show_Alert(value: boolean) {
    this.show_alert = value;
  }


  /**
   * getDataFromDOM
   */
  public getDataFromDOM() {
    let username: string = (<HTMLInputElement>document.getElementById("input_Username")).value.trim();
    let password: string = (<HTMLInputElement>document.getElementById("input_Password")).value.trim();
    let role: string = (<HTMLInputElement>document.getElementById("input_Role")).value.trim();

    if (username.length == 0 || password.length == 0) { //if (username.length == 0 || password.length == 0 || role.length == 0) {
      this.show_alert = true;
      this.text_alert = 'Empty spaces';
      this.type_alert = 'warning';
    } else {
      this.show_alert = true;
      this.text_alert = "Username : " + username + "\nPassword : " + password + "\nRole : " + role;
      this.type_alert = 'success';

      this.sendUsername(username);

      this.router_Link = 'Actions';
    }
  }

  /**
   * getRoles
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
   * showPassword
   */
  public showPassword() {
    if ((<HTMLInputElement>document.getElementById("check_Password")).checked) {
      this.password_show = 'text';
    } else {
      this.password_show = 'password';
    }
  }
}
