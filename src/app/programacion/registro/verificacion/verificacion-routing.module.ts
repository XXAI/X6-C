import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../auth-guard.service';
import { PermisosGuard } from '../../../permisos.guard';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path: 'programacion/verificacion',
    children: [
       { path: '', component: ListaComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} }/*,
       { path: 'registros/:id1/:id2/:id3', component: ListaRegistrosComponent, canActivate: [PermisosGuard], data: { key: '4oAw9FnQD7bwB8IrQzccUMTn0wutR1LQ'} }*/
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionRoutingModule { }
