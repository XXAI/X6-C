import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
import { ListaVerificacionComponent } from './metas/verificacion/lista-verificacion/lista-verificacion.component';
import { ListaMuestraComponent } from './metas/muestra/lista-muestra/lista-muestra.component';
import { ListaCapacitacionComponent } from './metas/capacitacion/lista-capacitacion/lista-capacitacion.component';
import { ListaDictamenComponent } from './metas/dictamen/lista-dictamen/lista-dictamen.component';
import { ListaReaccionComponent } from './metas/reaccion/lista-reaccion/lista-reaccion.component';
import { ListaDeterminacionComponent } from './metas/determinacion/lista-determinacion/lista-determinacion.component';
import { TableroComponent } from './tablero/tablero.component';

const routes: Routes = [
  {
    path: 'programacion_metas',
    children: [
       { path: '', component: TableroComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'verificacion', component: ListaVerificacionComponent, canActivate: [PermisosGuard], data: { key: 'A7GvzrNXlnZgHv3cSqQUtl501cxajGIF'} },
       { path: 'muestra', component: ListaMuestraComponent, canActivate: [PermisosGuard], data: { key: 'U9XHLqqTKlgU8ZWgQzDbhwzVNtF9hP79'} },
       { path: 'capacitacion', component: ListaCapacitacionComponent, canActivate: [PermisosGuard], data: { key: 'QPTGZZjSgfaVgL3oCbxsr5qeej152Uky'} },
       { path: 'dictamen', component: ListaDictamenComponent, canActivate: [PermisosGuard], data: { key: 'cY23gDtk33ssuubq5y5TxMGmyXgQ9GAT'} },
       { path: 'reaccion', component: ListaReaccionComponent, canActivate: [PermisosGuard], data: { key: 'g2jzmIMoXb5LD181GtGBqiAxuR07tTwO'} },
       { path: 'determinacion', component: ListaDeterminacionComponent, canActivate: [PermisosGuard], data: { key: 'd0MxfILgS3AVWktchJszfeHpzxEiSOwI'} }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramacionRoutingModule { }
