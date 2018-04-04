import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { MuestraRoutingModule } from './muestra-routing.module';
import { ListaComponent } from './lista/lista.component';

import { AuthService } from '../../../auth.service';
import { MuestraService } from './muestra.service';

@NgModule({
  imports: [
    CommonModule,
    MuestraRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [ListaComponent],
  providers: [ AuthService, MuestraService ]
})
export class MuestraModule { }
