import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
import { ListaCatalogoComponent } from './lista-catalogo/lista-catalogo.component';

const routes: Routes = [
  {
    path: 'catalogos',
    children: [
       { path: 'temas', component: ListaCatalogoComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       /*{ path: 'verificacion', component: ListaVerificacionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'muestra', component: ListaMuestraComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'capacitacion', component: ListaCapacitacionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'dictamen', component: ListaDictamenComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'reaccion', component: ListaReaccionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} },
       { path: 'determinacion', component: ListaDeterminacionComponent, canActivate: [PermisosGuard], data: { key: 'XWJov5DR90tIuFYeMj3LorKUHVnb2E9D'} }*/
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
