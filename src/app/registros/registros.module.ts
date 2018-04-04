import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from './menu/menu.module';

import { PaginacionModule } from '../paginacion/paginacion.module';

import { AuthService } from '../auth.service';
import { VerificacionService } from './captura/verificacion/verificacion.service';
import { RegistroVerificacionService } from './captura/verificacion/registro-verificacion.service';

import { MuestraService } from './captura/muestra/muestra.service';
import { RegistroMuestraService } from './captura/muestra/registro-muestra.service';

import { CapacitacionService } from './captura/capacitacion/capacitacion.service';
import { RegistroCapacitacionService } from './captura/capacitacion/registro-capacitacion.service';

import { ReaccionService } from './captura/reaccion/reaccion.service';
import { RegistroReaccionService } from './captura/reaccion/registro-reaccion.service';

import { DictamenService } from './captura/dictamen/dictamen.service';
import { RegistroDictamenService } from './captura/dictamen/registro-dictamen.service';

import { RegistrosRoutingModule } from './registros-routing.module';
import { CapturaVerificacionComponent } from './captura/verificacion/captura-verificacion/captura-verificacion.component';
import { RegistroVerificacionComponent } from './captura/verificacion/registro-verificacion/registro-verificacion.component';
import { RegistroMuestraComponent } from './captura/muestra/registro-muestra/registro-muestra.component';
import { CapturaMuestraComponent } from './captura/muestra/captura-muestra/captura-muestra.component';
import { CapturaCapacitacionComponent } from './captura/capacitacion/captura-capacitacion/captura-capacitacion.component';
import { RegistroCapacitacionComponent } from './captura/capacitacion/registro-capacitacion/registro-capacitacion.component';
import { RegistroDictamenComponent } from './captura/dictamen/registro-dictamen/registro-dictamen.component';
import { CapturaDictamenComponent } from './captura/dictamen/captura-dictamen/captura-dictamen.component';
import { CapturaReaccionComponent } from './captura/reaccion/captura-reaccion/captura-reaccion.component';
import { RegistroReaccionComponent } from './captura/reaccion/registro-reaccion/registro-reaccion.component';

@NgModule({
  imports: [
    CommonModule,
    RegistrosRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [CapturaVerificacionComponent, RegistroVerificacionComponent, RegistroMuestraComponent, CapturaMuestraComponent, CapturaCapacitacionComponent, RegistroCapacitacionComponent, RegistroDictamenComponent, CapturaDictamenComponent, CapturaReaccionComponent, RegistroReaccionComponent],
  providers: [ AuthService, VerificacionService, RegistroVerificacionService, MuestraService, RegistroMuestraService, CapacitacionService, RegistroCapacitacionService, ReaccionService, RegistroReaccionService, DictamenService, RegistroDictamenService ],
})
export class RegistrosModule { }
