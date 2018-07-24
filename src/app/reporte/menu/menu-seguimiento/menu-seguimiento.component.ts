import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reporte-menu-seguimiento',
  templateUrl: './menu-seguimiento.component.html',
  styleUrls: ['./menu-seguimiento.component.css']
})
export class MenuSeguimientoComponent implements OnInit {

  usuario: any = {}
  menu: any[] = [];
  menuSeguimiento: any[] = [];
  constructor() { }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    var permisos =  usuario.permisos.split('|');

    this.menu = [
      {
        titulo: 'Registro',
        modulos: [
         
        ]
      }];
    this.menuSeguimiento = [
      {
        titulo: 'Reportes Seguimiento',
        modulos: [
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Verificación Sanitaria', url: '/reportes/seguimiento/verificacion' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Dictamen Técnico', url: '/reportes/seguimiento/dictamen' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Resoluciones Administrativas', url: '/reportes/seguimiento/resolucion' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Notificaciones', url: '/reportes/seguimiento/notificacion' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Licencias Sanitarias', url: '/reportes/seguimiento/licencia' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Avisos de Funcionamiento', url: '/reportes/seguimiento/aviso' },
          { permiso: 'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', icono: 'fa-edit', titulo: 'Publicidad', url: '/reportes/seguimiento/publicidad' }
        ]
      }];
    

    
    
    if (permisos.length > 0){    
      for (var i in this.menu){
       
        for (var j in this.menu[i].modulos){
          siguienteItemProtegido: 
          for (var k in permisos){
            if (permisos[k] == this.menu[i].modulos[j].permiso){
              var item = this.initmenuSeguimientoPorItem(this.menu[i].titulo)
              item.modulos.push(this.menu[i].modulos[j]);      

              break siguienteItemProtegido;
            }           
          }
        }

      }
    }
  }

  initmenuSeguimientoPorItem(titulo: string){
     for (var i in this.menuSeguimiento){
       if (titulo == this.menuSeguimiento[i].titulo){
        return this.menuSeguimiento[i];
       }
     }

     this.menuSeguimiento.push({ titulo: titulo, modulos: []})
     return this.menuSeguimiento[this.menuSeguimiento.length - 1];

  }

}
