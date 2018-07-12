import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  usuario: any = {};
  /**
   * Contiene el término de búsqueda que ingresa el usuario.
   * @type {string}
   */
  busqueda = '';

  /**
   * Contiene la lista de los módulos en general que se agregan en este archivo.
   * @type {array}
   */
  modulos: any[] = [];
  /**
   * Contiene los módulos que van a mostrarse en la vista de acuerdo a los permisos.
   * @type {array}
   */
  modulosAutorizados: any[] = [];
  /**
   * Contiene la lista de los módulos que se agregan a la lista de accesos directos.
   * @type {array}
   */
  accesosDirectos: any[] = [];
  /**
   * Contiene la lista de los módulos con acceso directo que se mostrarán en la vista
   * de acuerdo al rol del usuario.
   * @type {array}
   */
  accesosDirectosAutorizados: any[] = [];
  /**
   * Este método inicializa la carga de las dependencias
   * que se necesitan para el funcionamiento del modulo
   */
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Registro de Seguimiento');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.modulos = [
      {
        permiso: 'A7GvzrNXlnZgHv3cSqQUtl501cxajGIF',
        icono: 'assets/modulo.svg', titulo: 'Verificaciones Sanitarias',
        url: '/captura_seguimiento/verificacion_sanitaria'
      },
      {
        permiso: 'U9XHLqqTKlgU8ZWgQzDbhwzVNtF9hP79',
        icono: 'assets/modulo.svg', titulo: 'Dictámenes Técnicos',
        url: '/captura_seguimiento/dictamen_tecnico'
      },
      {
        permiso: 'cY23gDtk33ssuubq5y5TxMGmyXgQ9GAT',
        icono: 'assets/modulo.svg', titulo: 'Resoluciones Administrativas',
        url: '/captura_seguimiento/resolucion_administrativa'
      },
      {
        permiso: 'QPTGZZjSgfaVgL3oCbxsr5qeej152Uky',
        icono: 'assets/modulo.svg', titulo: 'Notificaciones',
        url: '/captura_seguimiento/notificacion'
      },
      {
        permiso: 'g2jzmIMoXb5LD181GtGBqiAxuR07tTwO',
        icono: 'assets/modulo.svg', titulo: 'Licencias Sanitarias',
        url: '/captura_seguimiento/licencia_sanitaria'
      },
      {
        permiso: 'd0MxfILgS3AVWktchJszfeHpzxEiSOwI',
        icono: 'assets/modulo.svg', titulo: 'Avisos de Funcionamiento',
        url: '/captura_seguimiento/aviso_funcionamiento'
      },
      {
        permiso: 'd0MxfILgS3AVWktchJszfeHpzxEiSOwI',
        icono: 'assets/modulo.svg', titulo: 'Publicidad',
        url: '/captura_seguimiento/publicidad'
      }
    ];

    this.accesosDirectos = [
    ];

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let permisos =  usuario.permisos.split('|');

    if (permisos.length > 0) {

      for (var i in this.modulos) {
        siguienteItemProtegido:
        for(var j in permisos){

          if(permisos[j] == this.modulos[i].permiso){
            
            this.modulosAutorizados.push(this.modulos[i]);
            break siguienteItemProtegido;
          }           
        }
      }

      for(var i in this.accesosDirectos){
        siguienteItemProtegido:
        for(var j in permisos){
          if(permisos[j] == this.accesosDirectos[i].permiso){
            this.accesosDirectosAutorizados.push(this.accesosDirectos[i]);
            break siguienteItemProtegido;
          }           
        }        
      }
    }   
    
  }
}
