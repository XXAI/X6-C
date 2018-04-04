import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificacionRoutingModule } from './verificacion-routing.module';
import { ListaVerificacionComponent } from './lista-verificacion/lista-verificacion.component';

@NgModule({
  imports: [
    CommonModule,
    VerificacionRoutingModule
  ],
  declarations: [ ListaVerificacionComponent]
})
export class VerificacionModule { }
