import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
/*import { BoletinProyectosComponent } from './programacion/boletin-proyectos/boletin-proyectos.component';
import { BoletinAmbitoRiesgoComponent } from './boletin-ambito-riesgo/boletin-ambito-riesgo.component';
import { BoletinEjecutivoComponent } from './boletin-ejecutivo/boletin-ejecutivo.component';
import { JurisdiccionalComponent } from './jurisdiccional/jurisdiccional.component';*/
import { TableroComponent } from './tablero/tablero.component';

const routes: Routes = [
  {
    path: 'reportes',
    children: [
       { path: '', component: TableroComponent, canActivate: [PermisosGuard], data: { key: 'CHPlR9tEFF69AT5qBHrSW26nDzGlcG4y'} },
       /*{ path: 'proyectos', component: BoletinProyectosComponent, canActivate: [PermisosGuard], data: { key: 'CHPlR9tEFF69AT5qBHrSW26nDzGlcG4y'} },
       { path: 'ambito-riesgo', component: BoletinProyectosComponent, canActivate: [PermisosGuard], data: { key: 'CHPlR9tEFF69AT5qBHrSW26nDzGlcG4y'} },
       { path: 'ejecutivo', component: BoletinEjecutivoComponent, canActivate: [PermisosGuard], data: { key: 'CHPlR9tEFF69AT5qBHrSW26nDzGlcG4y'} },
       { path: 'jurisdiccion', component: JurisdiccionalComponent, canActivate: [PermisosGuard], data: { key: 'CHPlR9tEFF69AT5qBHrSW26nDzGlcG4y'} }*/
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
