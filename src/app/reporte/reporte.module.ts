import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from './menu/menu.module';
import { ReporteService } from './programacion/reporte.service';

import { BoletinProyectosComponent } from './programacion/boletin-proyectos/boletin-proyectos.component';
import { BoletinAmbitoRiesgoComponent } from './programacion/boletin-ambito-riesgo/boletin-ambito-riesgo.component';
import { BoletinEjecutivoComponent } from './programacion/boletin-ejecutivo/boletin-ejecutivo.component';
import { JurisdiccionalComponent } from './programacion/jurisdiccional/jurisdiccional.component';
import { TableroComponent } from './tablero/tablero.component';
/**
 * Se debe agregar el ChartModule y HighchartsStatic para poder usar la gráfica
 * INICIO
 */
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { AuthService     } from '../auth.service';

import { TableroModule } from './tablero/tablero.module';
import { ProgramacionModule } from './programacion/programacion.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';


declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuModule,
    ChartModule,
    TableroModule,
    ProgramacionModule,
    SeguimientoModule
  ],
  providers: [
      AuthService,
      ReporteService,
    { 
      provide: HighchartsStatic,
      useFactory: highchartsFactory,
    }
  ]/*,
  declarations: [BoletinProyectosComponent, TableroComponent],
  exports: [BoletinProyectosComponent, TableroComponent]*/
})
export class ReporteModule { }
