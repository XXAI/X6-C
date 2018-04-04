import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { AuthService } from '../../../auth.service';
import { VerificacionService } from './verificacion.service';

import { VerificacionRoutingModule } from './verificacion-routing.module';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  imports: [
    CommonModule,
    VerificacionRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [ListaComponent],
  providers: [ AuthService, VerificacionService ]
})
export class VerificacionModule { }
