import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
import { ListaComponent } from './lista/lista.component';
import { ListaVerificacionComponent } from './metas/verificacion/lista-verificacion/lista-verificacion.component';
import { ListaMuestraComponent } from './metas/muestra/lista-muestra/lista-muestra.component';
import { ListaCapacitacionComponent } from './metas/capacitacion/lista-capacitacion/lista-capacitacion.component';
import { ListaDictamenComponent } from './metas/dictamen/lista-dictamen/lista-dictamen.component';
import { ListaReaccionComponent } from './metas/reaccion/lista-reaccion/lista-reaccion.component';
import { ListaDeterminacionComponent } from './metas/determinacion/lista-determinacion/lista-determinacion.component';

const routes: Routes = [
  {
    path: 'programacion_metas',
    children: [
       { path: '', component: ListaVerificacionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'verificacion', component: ListaVerificacionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'muestra', component: ListaMuestraComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'capacitacion', component: ListaCapacitacionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'dictamen', component: ListaDictamenComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'reaccion', component: ListaReaccionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'determinacion', component: ListaDeterminacionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramacionRoutingModule { }
