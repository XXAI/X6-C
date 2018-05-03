import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl, NgModel  } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Mensaje } from '../../mensaje';

@Component({
  selector: 'app-lista-catalogo',
  templateUrl: './lista-catalogo.component.html',
  styleUrls: ['./lista-catalogo.component.css']
})
export class ListaCatalogoComponent implements OnInit {

  cargando: boolean = false;
  showDialog:boolean = false;
  showAgregarTema:boolean = false;
  filter:boolean = false;

  busquedaActivada:boolean = false;
  
  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  
  constructor() { }

  ngOnInit() {
  }

  

}
