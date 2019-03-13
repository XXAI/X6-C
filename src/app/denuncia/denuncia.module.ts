import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DenunciaRoutingModule } from './denuncia-routing.module';
import { PanelDenunciaComponent } from './panel-denuncia/panel-denuncia.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';

import { DenunciaService } from './denuncia.service';
import { SeguimientoDenunciaService } from './seguimiento-denuncia.service';
import { ListaComponent } from './lista/lista.component';
import { MenuModule } from './menu/menu.module';


import { PaginacionModule } from '../paginacion/paginacion.module';
import { RegistroSeguimientoComponent } from './registro-seguimiento/registro-seguimiento.component';

@NgModule({
  imports: [
    CommonModule,
    DenunciaRoutingModule,
    ReactiveFormsModule,
    MenuModule,
    PaginacionModule
  ],
  providers: [
    DenunciaService,
    SeguimientoDenunciaService
  ],
  declarations: [PanelDenunciaComponent, NuevoComponent, SeguimientoComponent, ListaComponent, RegistroSeguimientoComponent]
})
export class DenunciaModule { }
