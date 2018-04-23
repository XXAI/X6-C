import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'programacion-menu-aside',
  templateUrl: './menu-aside.component.html',
  styleUrls: ['./menu-aside.component.css']
})
export class MenuAsideComponent implements OnInit {

  usuario: any = {}
  menu: any[] = [];
  menuProgramacion: any[] = [];
  constructor() { }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    var permisos =  usuario.permisos.split('|');

    this.menu = [
      {
        titulo: 'Registro',
        modulos: [
          /*{ permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Verificaciones', url: '/programacion/verificacion' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Muestras', url: '/programacion/muestra' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Capacitaciones', url: '/programacion/capacitacion' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Dictamenes', url: '/programacion/dictamen' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Reacciones Adversas', url: '/programacion/reaccion' },*/
        ]
      }];
    this.menuProgramacion = [
      {
        titulo: 'Programación de Metas',
        modulos: [
          { icono: 'fa-server', titulo: 'Verificación', url: '/programacion_metas/verificacion' },
          { icono: 'fa-server', titulo: 'Dictamen', url: '/programacion_metas/dictamen' },
          { icono: 'fa-server', titulo: 'Muestra', url: '/programacion_metas/muestra' },
          { icono: 'fa-server', titulo: 'Capacitación', url: '/programacion_metas/capacitacion' },
          { icono: 'fa-server', titulo: 'Reacción Adversa  ', url: '/programacion_metas/reaccion' },
          { icono: 'fa-server', titulo: 'Determinacion  ', url: '/programacion_metas/determinacion' },
        ]
      }];
    

    
    
    if (permisos.length > 0){    
      for (var i in this.menu){
       
        for (var j in this.menu[i].modulos){
          siguienteItemProtegido: 
          for (var k in permisos){
            if (permisos[k] == this.menu[i].modulos[j].permiso){
              var item = this.initmenuProgramacionPorItem(this.menu[i].titulo)
              item.modulos.push(this.menu[i].modulos[j]);      

              break siguienteItemProtegido;
            }           
          }
        }

      }
    }
  }

  initmenuProgramacionPorItem(titulo: string){
     for (var i in this.menuProgramacion){
       if (titulo == this.menuProgramacion[i].titulo){
        return this.menuProgramacion[i];
       }
     }

     this.menuProgramacion.push({ titulo: titulo, modulos: []})
     return this.menuProgramacion[this.menuProgramacion.length - 1];

  }

}
