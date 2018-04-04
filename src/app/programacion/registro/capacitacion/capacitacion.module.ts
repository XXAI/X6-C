import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { AuthService } from '../../../auth.service';
import { CapacitacionService } from './capacitacion.service';
import { RegistrosService } from './registros.service';

import { CapacitacionRoutingModule } from './capacitacion-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ListaRegistrosComponent } from './lista-registros/lista-registros.component';

@NgModule({
  imports: [
    CommonModule,
    CapacitacionRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [ListaComponent, ListaRegistrosComponent],
  providers: [ AuthService, CapacitacionService, RegistrosService ]
})
export class CapacitacionModule { }
