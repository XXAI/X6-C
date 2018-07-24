import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../menu/menu.module';
import { ReporteService } from './reporte.service';

import { ProgramacionRoutingModule } from './programacion-routing.module';
import { BoletinProyectosComponent } from './boletin-proyectos/boletin-proyectos.component';
import { BoletinAmbitoRiesgoComponent } from './boletin-ambito-riesgo/boletin-ambito-riesgo.component';
import { BoletinEjecutivoComponent } from './boletin-ejecutivo/boletin-ejecutivo.component';
import { JurisdiccionalComponent } from './jurisdiccional/jurisdiccional.component';
/**
 * Se debe agregar el ChartModule y HighchartsStatic para poder usar la gráfica
 * INICIO
 */
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { AuthService     } from '../../auth.service';



declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  imports: [
    CommonModule,
    ProgramacionRoutingModule,
    ReactiveFormsModule,
    MenuModule,
    ChartModule
  ],
  providers: [
      AuthService,
      ReporteService,
    { 
      provide: HighchartsStatic,
      useFactory: highchartsFactory,
    }
  ],
  declarations: [BoletinProyectosComponent, BoletinAmbitoRiesgoComponent, BoletinEjecutivoComponent, JurisdiccionalComponent],
  exports: [BoletinProyectosComponent, BoletinAmbitoRiesgoComponent, BoletinEjecutivoComponent, JurisdiccionalComponent]
})
export class ProgramacionModule { }
