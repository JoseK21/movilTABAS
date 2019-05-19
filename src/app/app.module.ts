import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { SignUpAdminComponent } from './sign-up-admin/sign-up-admin.component';
import { ScanningComponent } from './scanning/scanning.component';
import { RejectionComponent } from './rejection/rejection.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { ActionsComponent } from './actions/actions.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    SignUpAdminComponent,
    ScanningComponent,
    RejectionComponent,
    AssignmentComponent,
    ActionsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
