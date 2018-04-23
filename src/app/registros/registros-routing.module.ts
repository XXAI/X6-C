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
import { CapturaDeterminacionComponent } from './captura/determinacion/captura-determinacion/captura-determinacion.component';
import { RegistroDeterminacionComponent } from './captura/determinacion/registro-determinacion/registro-determinacion.component';

const routes: Routes = [
  {
    path: 'captura_registros',
    children: [
       { path: '', component: CapturaVerificacionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'verificacion', component: CapturaVerificacionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'verificacion/:id1/:id2/:id3', component: RegistroVerificacionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'muestra', component: CapturaMuestraComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'muestra/:id1/:id2/:id3', component: RegistroMuestraComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'capacitacion', component: CapturaCapacitacionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'capacitacion/:id1/:id2/:id3', component: RegistroCapacitacionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'dictamen', component: CapturaDictamenComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'dictamen/:id1/:id2/:id3', component: RegistroDictamenComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'reaccion', component: CapturaReaccionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'reaccion/:id1/:id2/:id3', component: RegistroReaccionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'determinacion', component: CapturaDeterminacionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} },
       { path: 'determinacion/:id1/:id2/:id3', component: RegistroDeterminacionComponent, canActivate: [PermisosGuard], data: { key: 'OHDYRToKLymGxFKepWuZ6WzdCXfCt9pF'} }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrosRoutingModule { }
