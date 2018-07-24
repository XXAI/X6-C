import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../menu/menu.module';
import { ReporteService } from '../programacion/reporte.service';

import { BoletinProyectosComponent } from '../programacion/boletin-proyectos/boletin-proyectos.component';
import { TableroComponent } from '../tablero/tablero.component';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { AuthService     } from '../../auth.service';

import { TableroRoutingModule } from './tablero-routing.module';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  imports: [
    CommonModule,
    TableroRoutingModule,
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
  declarations: [TableroComponent],
  exports:[TableroComponent]
})
export class TableroModule { }
