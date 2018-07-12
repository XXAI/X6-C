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
     { path: '', component: TableroComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
     { path: 'verificacion_sanitaria', component: VerificacionComponent, canActivate: [PermisosGuard], data: { key: 'A7GvzrNXlnZgHv3cSqQUtl501cxajGIF'} },
     { path: 'dictamen_tecnico', component: DictamenComponent, canActivate: [PermisosGuard], data: { key: 'U9XHLqqTKlgU8ZWgQzDbhwzVNtF9hP79'} },
     { path: 'resolucion_administrativa', component: ResolucionComponent, canActivate: [PermisosGuard], data: { key: 'QPTGZZjSgfaVgL3oCbxsr5qeej152Uky'} },
     { path: 'notificacion', component: NotificacionComponent, canActivate: [PermisosGuard], data: { key: 'cY23gDtk33ssuubq5y5TxMGmyXgQ9GAT'} },
     { path: 'licencia_sanitaria', component: LicenciaComponent, canActivate: [PermisosGuard], data: { key: 'g2jzmIMoXb5LD181GtGBqiAxuR07tTwO'} },
     { path: 'aviso_funcionamiento', component: AvisoComponent, canActivate: [PermisosGuard], data: { key: 'd0MxfILgS3AVWktchJszfeHpzxEiSOwI'} },
     { path: 'publicidad', component: PublicidadComponent, canActivate: [PermisosGuard], data: { key: 'd0MxfILgS3AVWktchJszfeHpzxEiSOwI'} }
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoRoutingModule { }
