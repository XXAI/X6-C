import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../menu/menu.module';
import { SeguimientoService } from './seguimiento.service';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';


import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { AuthService     } from '../../auth.service';
import { VerificacionComponent } from './verificacion/verificacion.component';
import { DictamenComponent } from './dictamen/dictamen.component';
import { ResolucionComponent } from './resolucion/resolucion.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { LicenciaComponent } from './licencia/licencia.component';
import { AvisoComponent } from './aviso/aviso.component';
import { PublicidadComponent } from './publicidad/publicidad.component';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  imports: [
    CommonModule,
    SeguimientoRoutingModule,
    ReactiveFormsModule,
    MenuModule,
    ChartModule
  ],
  providers: [
      AuthService,
      SeguimientoService,
    { 
      provide: HighchartsStatic,
      useFactory: highchartsFactory,
    }
  ],
  declarations: [VerificacionComponent, DictamenComponent, ResolucionComponent, NotificacionComponent, LicenciaComponent, AvisoComponent, PublicidadComponent]  
})
export class SeguimientoModule { }
