import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
import { TableroComponent } from './tablero/tablero.component';
import { AvisoComponent } from './captura/aviso/aviso.component';
import { DictamenComponent } from './captura/dictamen/dictamen.component';
import { LicenciaComponent } from './captura/licencia/licencia.component';
import { NotificacionComponent } from './captura/notificacion/notificacion.component';
import { PublicidadComponent } from './captura/publicidad/publicidad.component';
import { ResolucionComponent } from './captura/resolucion/resolucion.component';
import { VerificacionComponent } from './captura/verificacion/verificacion.component';


const routes: Routes = [
  {
  path: 'captura_seguimiento',
  children: [
     { path: '', component: TableroComponent, canActivate: [PermisosGuard], data: { key: 'tzMUrHY700DXVoDrG0zsNcDCFwnOcoiu'} },
     { path: 'verificacion_sanitaria', component: VerificacionComponent, canActivate: [PermisosGuard], data: { key: '6XhHmrGZK8hlU4U2DoyidoAQFM4ReRkL'} },
     { path: 'dictamen_tecnico', component: DictamenComponent, canActivate: [PermisosGuard], data: { key: '6XhHmrGZK8hlU4U2DoyidoAQFM4ReRkL'} },
     { path: 'resolucion_administrativa', component: ResolucionComponent, canActivate: [PermisosGuard], data: { key: '6XhHmrGZK8hlU4U2DoyidoAQFM4ReRkL'} },
     { path: 'notificacion', component: NotificacionComponent, canActivate: [PermisosGuard], data: { key: '6XhHmrGZK8hlU4U2DoyidoAQFM4ReRkL'} },
     { path: 'licencia_sanitaria', component: LicenciaComponent, canActivate: [PermisosGuard], data: { key: '6XhHmrGZK8hlU4U2DoyidoAQFM4ReRkL'} },
     { path: 'aviso_funcionamiento', component: AvisoComponent, canActivate: [PermisosGuard], data: { key: '6XhHmrGZK8hlU4U2DoyidoAQFM4ReRkL'} },
     { path: 'publicidad', component: PublicidadComponent, canActivate: [PermisosGuard], data: { key: '6XhHmrGZK8hlU4U2DoyidoAQFM4ReRkL'} }
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoRoutingModule { }
