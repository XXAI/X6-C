import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from './menu/menu.module';

import { PaginacionModule } from '../paginacion/paginacion.module';

import { AuthService } from '../auth.service';
import { PrincipalService } from './principal.service';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { TableroComponent } from './tablero/tablero.component';
import { VerificacionComponent } from './captura/verificacion/verificacion.component';
import { DictamenComponent } from './captura/dictamen/dictamen.component';
import { ResolucionComponent } from './captura/resolucion/resolucion.component';
import { NotificacionComponent } from './captura/notificacion/notificacion.component';
import { LicenciaComponent } from './captura/licencia/licencia.component';
import { AvisoComponent } from './captura/aviso/aviso.component';
import { PublicidadComponent } from './captura/publicidad/publicidad.component';

@NgModule({
  imports: [
    CommonModule,
    SeguimientoRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [TableroComponent, VerificacionComponent, DictamenComponent, ResolucionComponent, NotificacionComponent, LicenciaComponent, AvisoComponent, PublicidadComponent],
  providers: [ AuthService, PrincipalService ],
})
export class SeguimientoModule { }
