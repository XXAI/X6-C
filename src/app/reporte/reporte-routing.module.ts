import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
import { BoletinProyectosComponent } from './boletin-proyectos/boletin-proyectos.component';
import { BoletinAmbitoRiesgoComponent } from './boletin-ambito-riesgo/boletin-ambito-riesgo.component';
import { BoletinEjecutivoComponent } from './boletin-ejecutivo/boletin-ejecutivo.component';
import { JurisdiccionalComponent } from './jurisdiccional/jurisdiccional.component';

const routes: Routes = [
  {
    path: 'reportes',
    children: [
       { path: 'proyecto', component: BoletinProyectosComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'ambito-riesgo', component: BoletinAmbitoRiesgoComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'ejecutivo', component: BoletinEjecutivoComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'jurisdiccion', component: JurisdiccionalComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
