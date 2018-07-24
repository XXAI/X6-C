import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';
import { PermisosGuard } from '../../permisos.guard';
import { VerificacionComponent } from './verificacion/verificacion.component';
import { DictamenComponent } from './dictamen/dictamen.component';
import { ResolucionComponent } from './resolucion/resolucion.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { LicenciaComponent } from './licencia/licencia.component';
import { AvisoComponent } from './aviso/aviso.component';
import { PublicidadComponent } from './publicidad/publicidad.component';

const routes: Routes = [ {
  path: 'reportes/seguimiento',
  children: [
    { path: 'verificacion', component: VerificacionComponent  , canActivate: [PermisosGuard], data: { key: 'GVfkfTtu7G2bOjXy78nVRAlFVYodH1KK'} },
    { path: 'dictamen'    , component: DictamenComponent      , canActivate: [PermisosGuard], data: { key: 'GVfkfTtu7G2bOjXy78nVRAlFVYodH1KK'} },
    { path: 'resolucion'  , component: ResolucionComponent    , canActivate: [PermisosGuard], data: { key: 'GVfkfTtu7G2bOjXy78nVRAlFVYodH1KK'} },
    { path: 'notificacion', component: NotificacionComponent  , canActivate: [PermisosGuard], data: { key: 'GVfkfTtu7G2bOjXy78nVRAlFVYodH1KK'} },
    { path: 'licencia'    , component: LicenciaComponent      , canActivate: [PermisosGuard], data: { key: 'GVfkfTtu7G2bOjXy78nVRAlFVYodH1KK'} },
    { path: 'aviso'       , component: AvisoComponent         , canActivate: [PermisosGuard], data: { key: 'GVfkfTtu7G2bOjXy78nVRAlFVYodH1KK'} },
    { path: 'publicidad'  , component: PublicidadComponent    , canActivate: [PermisosGuard], data: { key: 'GVfkfTtu7G2bOjXy78nVRAlFVYodH1KK'} }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoRoutingModule { }
