import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from '../../menu/menu.module';

import { PaginacionModule } from '../../../paginacion/paginacion.module';

import { AuthService } from '../../../auth.service';
import { DictamenService } from './dictamen.service';

import { DictamenRoutingModule } from './dictamen-routing.module';
import { ListaComponent } from './lista/lista.component';

@NgModule({
  imports: [
    CommonModule,
    DictamenRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [ListaComponent],
  providers: [ AuthService, DictamenService ]
})
export class DictamenModule { }
