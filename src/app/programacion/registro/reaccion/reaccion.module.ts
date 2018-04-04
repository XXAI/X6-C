import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { AuthService } from '../../../auth.service';
import { ReaccionService } from './reaccion.service';

import { ReaccionRoutingModule } from './reaccion-routing.module';
import { ListaComponent } from './lista/lista.component';



@NgModule({
  imports: [
    CommonModule,
    ReaccionRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [ListaComponent],
  providers: [ AuthService, ReaccionService ]
})
export class ReaccionModule { }
