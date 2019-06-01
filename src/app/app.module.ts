import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { SignUpAdminComponent } from './sign-up-admin/sign-up-admin.component';
import { ScanningComponent } from './scanning/scanning.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { ActionsComponent } from './actions/actions.component';
import { MainComponent } from './main/main.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    SignUpAdminComponent,
    ScanningComponent,
    AssignmentComponent,
    ActionsComponent,
    MainComponent,
    SignOutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
