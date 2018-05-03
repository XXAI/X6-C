import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from './menu/menu.module';

import { PaginacionModule } from '../paginacion/paginacion.module';

import { AuthService } from '../auth.service';
import { MetasService } from './metas.service';

import { ProgramacionRoutingModule } from './programacion-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ListaVerificacionComponent } from './metas/verificacion/lista-verificacion/lista-verificacion.component';
import { ListaMuestraComponent } from './metas/muestra/lista-muestra/lista-muestra.component';
import { ListaCapacitacionComponent } from './metas/capacitacion/lista-capacitacion/lista-capacitacion.component';
import { ListaDictamenComponent } from './metas/dictamen/lista-dictamen/lista-dictamen.component';
import { ListaReaccionComponent } from './metas/reaccion/lista-reaccion/lista-reaccion.component';
import { ListaDeterminacionComponent } from './metas/determinacion/lista-determinacion/lista-determinacion.component';
import { TableroComponent } from './tablero/tablero.component';


@NgModule({
  imports: [
    CommonModule,
    ProgramacionRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [ListaComponent, ListaVerificacionComponent, ListaMuestraComponent, ListaCapacitacionComponent, ListaDictamenComponent, ListaReaccionComponent, ListaDeterminacionComponent, TableroComponent],
  providers: [ AuthService, MetasService ],
})
export class ProgramacionModule { }
