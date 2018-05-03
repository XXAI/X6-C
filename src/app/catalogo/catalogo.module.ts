import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginacionModule } from '../paginacion/paginacion.module';
import { AuthService } from '../auth.service';

import { MenuModule } from './menu/menu.module';
import { CatalogoRoutingModule } from './catalogo-routing.module';

import { ListaCatalogoComponent } from './lista-catalogo/lista-catalogo.component';


@NgModule({
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ReactiveFormsModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [ListaCatalogoComponent],
  providers: [ AuthService],
})
export class CatalogoModule { }
