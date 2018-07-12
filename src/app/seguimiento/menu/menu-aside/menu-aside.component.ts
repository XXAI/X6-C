import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seguimiento-menu-aside',
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
        titulo: 'Registro Seguimiento',
        modulos: [
          /*{ permiso: 'A7GvzrNXlnZgHv3cSqQUtl501cxajGIF', icono: 'fa-server', titulo: 'Verificación', url: '/programacion_metas/verificacion' },
          { permiso: 'cY23gDtk33ssuubq5y5TxMGmyXgQ9GAT', icono: 'fa-server', titulo: 'Dictamen', url: '/programacion_metas/dictamen' },
          { permiso: 'U9XHLqqTKlgU8ZWgQzDbhwzVNtF9hP79', icono: 'fa-server', titulo: 'Monitoreo', url: '/programacion_metas/muestra' },
          { permiso: 'QPTGZZjSgfaVgL3oCbxsr5qeej152Uky', icono: 'fa-server', titulo: 'Capacitación', url: '/programacion_metas/capacitacion' },
          { permiso: 'g2jzmIMoXb5LD181GtGBqiAxuR07tTwO', icono: 'fa-server', titulo: 'Reacción Adversa  ', url: '/programacion_metas/reaccion' },
          { permiso: 'd0MxfILgS3AVWktchJszfeHpzxEiSOwI', icono: 'fa-server', titulo: 'Determinacion  ', url: '/programacion_metas/determinacion' }*/
          /*{ icono: 'fa-server', titulo: 'Verificación', url: '/programacion_metas/verificacion' },
          { icono: 'fa-server', titulo: 'Dictamen', url: '/programacion_metas/dictamen' },
          { icono: 'fa-server', titulo: 'Monitoreo', url: '/programacion_metas/muestra' },
          { icono: 'fa-server', titulo: 'Capacitación', url: '/programacion_metas/capacitacion' },
          { icono: 'fa-server', titulo: 'Reacción Adversa  ', url: '/programacion_metas/reaccion' },
          { icono: 'fa-server', titulo: 'Determinacion  ', url: '/programacion_metas/determinacion' }*/
        ]
      }];
    this.menuProgramacion = [
      {
        titulo: 'Registro Seguimiento',
        modulos: [
          { permiso:'', icono: 'fa-server', titulo: 'Verificación Sanitaria', url: '/captura_seguimiento/verificacion_sanitaria' }, 
          { permiso:'', icono: 'fa-server', titulo: 'Díctamen Técnico', url: '/captura_seguimiento/dictamen_tecnico' },
          { permiso:'', icono: 'fa-server', titulo: 'Resolución Administrativa', url: '/captura_seguimiento/resolucion_administrativa' },
          { permiso:'', icono: 'fa-server', titulo: 'Notificación', url: '/captura_seguimiento/notificacion' },
          { permiso:'', icono: 'fa-server', titulo: 'Licencias Sanitarias', url: '/captura_seguimiento/licencia_sanitaria' },
          { permiso:'', icono: 'fa-server', titulo: 'Aviso de Funcionamiento', url: '/captura_seguimiento/aviso_funcionamiento' },
          { permiso:'', icono: 'fa-server', titulo: 'Publicidad', url: '/captura_seguimiento/publicidad' }
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
