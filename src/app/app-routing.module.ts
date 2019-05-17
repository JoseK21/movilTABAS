import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpAdminComponent } from './sign-up-admin/sign-up-admin.component';
import { LogComponent } from './log/log.component';

const routes: Routes = [  
  { path: '', component: LogComponent },
  { path: 'SignUpAdmin', component: SignUpAdminComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pageNotFound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
