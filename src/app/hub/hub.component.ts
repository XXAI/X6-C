import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  mostrar = false;

  // Se debe indicar los permisos para que el usuario tenga al menos uno para mostrar el item

  itemsProtegidos = [
    {
      title: 'Panel de control', routerLink: '/panel-control', icono: 'assets/hub-panel-control.svg',
      permisos: [
        'mGKikN0aJaeF2XrHwwYK3XNw0f9CSZDe', // Ver usuarios
        'ICmOKw3HxhgRna4a78OP0QmKrIX0bNsp', // Ver roles
        'DYwQAxJbpHWw07zT09scEogUeFKFdGSu', // Ver permisos
        'NNN3YYcmuXdZYVSGCk0CJFjcx3ATnRQ5', // Sincronización local
        '3DMVRdBv4cLGzdfAqXO7oqTvAMbEdhI7', // Sincronización con servidor central
        '8DDwGNuZOZfoFfaDOsQvBBhVzmnlU4PA', // Ver Servidores
        'tFcVVgwywaPvfj4ZdOoCZfBpcTtZAST0', // Actualizar sistema
        'WcIjPIhPWGJbLyb4OiYe91sRKP7NGTAK', // Respaldo y restauracion base de datos
      ]
    },
    {
      title: 'Programación de Metas', routerLink: '/programacion_metas', icono: 'assets/catalogo-pedido.svg',
      permisos: [
        'esZVkmjOfAuCTja8FzJ1ihSVNEU29lUj'//esZVkmjOfAuCTja8FzJ1ihSVNEU29lUj' // Ver usuarios
      ]
    },
    {
      title: 'Captura de Registros', routerLink: '/captura_registros', icono: 'assets/catalogo-pedido.svg',
      permisos: [
        'esZVkmjOfAuCTja8FzJ1ihSVNEU29lUj'//esZVkmjOfAuCTja8FzJ1ihSVNEU29lUj' // Ver usuarios
      ]
    },
    {
      title: 'Reportes', routerLink: '/reportes/proyecto', icono: 'assets/catalogo-pedido.svg',
      permisos: [
        'esZVkmjOfAuCTja8FzJ1ihSVNEU29lUj'//esZVkmjOfAuCTja8FzJ1ihSVNEU29lUj' // Ver usuarios
      ]
    }
  ];
  hubAutorizado = [ { title: 'Dashboard', routerLink: '/dashboard', icono: 'assets/hub-dashboard.svg' } ]

  constructor() { }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    var permisos =  usuario.permisos.split('|');

    if(permisos.length > 0) {
      for(var i in this.itemsProtegidos){
        siguienteItemProtegido:     
        for(var j in this.itemsProtegidos[i].permisos){
          for(var k in permisos){
            if(permisos[k] == this.itemsProtegidos[i].permisos[j]){
              this.hubAutorizado.push(this.itemsProtegidos[i]);              
              break siguienteItemProtegido;
            }           
          }
        }
      }
      
    }
  }

  toggle() {
    this.mostrar = !this.mostrar;
  }

}
