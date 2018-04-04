import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { AuthService } from '../../../auth.service';
import { MuestraService } from './muestra.service';
import { RegistroMuestraService } from './registro-muestra.service';

import { CapturaMuestraComponent } from './captura-muestra/captura-muestra.component';
import { RegistroMuestraComponent } from './registro-muestra/registro-muestra.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [CapturaMuestraComponent, RegistroMuestraComponent],
  providers: [ AuthService, MuestraService, RegistroMuestraService ]
})
export class MuestraModule { }
