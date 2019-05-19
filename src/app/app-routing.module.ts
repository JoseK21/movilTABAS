import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpAdminComponent } from './sign-up-admin/sign-up-admin.component';
import { LogComponent } from './log/log.component';
import { ActionsComponent } from './actions/actions.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [  
  { path: '', component: MainComponent },
  { path: 'SignUpAdmin', component: SignUpAdminComponent },
  { path: 'Actions', component: ActionsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pageNotFound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
