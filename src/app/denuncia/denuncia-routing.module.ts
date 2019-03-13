import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PermisosGuard } from '../permisos.guard';
import { NuevoComponent } from './nuevo/nuevo.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { ListaComponent } from './lista/lista.component';
import { RegistroSeguimientoComponent } from './registro-seguimiento/registro-seguimiento.component';

const routes: Routes = [
  {
    path: 'denuncia',
    children: [
       { path: 'nuevo', component: NuevoComponent  },
       { path: 'seguimiento/:id', component: SeguimientoComponent },
       { path: 'lista', component: ListaComponent, canActivate: [PermisosGuard], data: { key: 'tot9Ovudb2WGT6xwOlduZtCLpE7FAdCW'} },
       { path: 'registro-seguimiento/:id', component: RegistroSeguimientoComponent, canActivate: [PermisosGuard], data: { key: 'tot9Ovudb2WGT6xwOlduZtCLpE7FAdCW'} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciaRoutingModule { }
