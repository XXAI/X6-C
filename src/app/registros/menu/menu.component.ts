import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-programacion',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  mostrarMenuAside: boolean = false;
  usuario: any = {};
  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }
  toggleMenuAside() {
    this.mostrarMenuAside = !this.mostrarMenuAside;
  }

}
