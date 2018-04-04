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

const routes: Routes = [
  {
    path: 'programacion_metas',
    children: [
       { path: '', component: ListaVerificacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'verificacion', component: ListaVerificacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'muestra', component: ListaMuestraComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'capacitacion', component: ListaCapacitacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'dictamen', component: ListaDictamenComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'reaccion', component: ListaReaccionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramacionRoutingModule { }
