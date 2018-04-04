import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { AuthService } from '../../../auth.service';
import { VerificacionService } from './verificacion.service';
import { RegistroVerificacionService } from './registro-verificacion.service';

import { CapturaVerificacionComponent } from './captura-verificacion/captura-verificacion.component';
import { RegistroVerificacionComponent } from './registro-verificacion/registro-verificacion.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [CapturaVerificacionComponent, RegistroVerificacionComponent],
  providers: [ AuthService, VerificacionService, RegistroVerificacionService ]
})
export class VerificacionModule { }
