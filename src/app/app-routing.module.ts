import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent }       from './login/login.component';
import { PanelDenunciaComponent }      from './denuncia/panel-denuncia/panel-denuncia.component';



import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'denuncia', component: PanelDenunciaComponent },
    { path: 'login',  component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }