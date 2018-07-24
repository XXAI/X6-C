import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { HubModule } from '../../hub/hub.module';
import { PerfilModule } from '../../perfil/perfil.module';
import { BloquearPantallaModule } from '../../bloquear-pantalla/bloquear-pantalla.module';

import { MenuComponent } from './menu.component';
import { MenuAsideComponent } from './menu-aside/menu-aside.component';
import { MenuSeguimientoComponent } from './menu-seguimiento/menu-seguimiento.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HubModule,
    PerfilModule,
    BloquearPantallaModule,
  ],
  declarations: [MenuComponent, MenuAsideComponent, MenuSeguimientoComponent],
  exports: [MenuComponent, MenuAsideComponent, MenuSeguimientoComponent]
})
export class MenuModule { }
