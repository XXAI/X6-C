import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
import { CapturaVerificacionComponent } from './captura/verificacion/captura-verificacion/captura-verificacion.component';
import { RegistroVerificacionComponent } from './captura/verificacion/registro-verificacion/registro-verificacion.component';
import { CapturaMuestraComponent } from './captura/muestra/captura-muestra/captura-muestra.component';
import { RegistroMuestraComponent } from './captura/muestra/registro-muestra/registro-muestra.component';
import { CapturaCapacitacionComponent } from './captura/capacitacion/captura-capacitacion/captura-capacitacion.component';
import { RegistroCapacitacionComponent } from './captura/capacitacion/registro-capacitacion/registro-capacitacion.component';
import { CapturaDictamenComponent } from './captura/dictamen/captura-dictamen/captura-dictamen.component';
import { RegistroDictamenComponent } from './captura/dictamen/registro-dictamen/registro-dictamen.component';
import { CapturaReaccionComponent } from './captura/reaccion/captura-reaccion/captura-reaccion.component';
import { RegistroReaccionComponent } from './captura/reaccion/registro-reaccion/registro-reaccion.component';

const routes: Routes = [
  {
    path: 'captura_registros',
    children: [
       { path: '', component: CapturaVerificacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'verificacion', component: CapturaVerificacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'verificacion/:id1/:id2/:id3', component: RegistroVerificacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'muestra', component: CapturaMuestraComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'muestra/:id1/:id2/:id3', component: RegistroMuestraComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'capacitacion', component: CapturaCapacitacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'capacitacion/:id1/:id2/:id3', component: RegistroCapacitacionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'dictamen', component: CapturaDictamenComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'dictamen/:id1/:id2/:id3', component: RegistroDictamenComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'reaccion', component: CapturaReaccionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} },
       { path: 'reaccion/:id1/:id2/:id3', component: RegistroReaccionComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrosRoutingModule { }
