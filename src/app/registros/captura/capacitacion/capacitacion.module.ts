import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { AuthService } from '../../../auth.service';
import { CapacitacionService } from './capacitacion.service';
import { RegistroCapacitacionService } from './registro-capacitacion.service';

import { CapturaCapacitacionComponent } from './captura-capacitacion/captura-capacitacion.component';
import { RegistroCapacitacionComponent } from './registro-capacitacion/registro-capacitacion.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [CapturaCapacitacionComponent, RegistroCapacitacionComponent],
  providers: [ AuthService, CapacitacionService, RegistroCapacitacionService ]
})
export class CapacitacionModule { }
