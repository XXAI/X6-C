import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params }   from '@angular/router';
import { environment } from '../../../environments/environment';
import { Location}           from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { DenunciaService } from '../denuncia.service';
import { Mensaje } from '../../mensaje';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  tabs:number = 1;
  fecha_actual:string = "";
  folio:string = "";
  cargando:boolean = false;
  obj_denuncia:any = {};

  obj_estatus:any = [{'descripcion':''}, {'descripcion':'NO ATENDIDO'}, {'descripcion':'EN PROCESO'},{'descripcion':'CONCLUIDO'},{'descripcion':'NO PROCEDE'}];

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();


  constructor(
    private title: Title,
    private location: Location,
    private route: ActivatedRoute,
    private denunciaService: DenunciaService,
  ) { }

  ngOnInit() { 
    this.route.params.subscribe(params => {
      this.folio = params['id'];
    });
    this.cargar_denuncia(this.folio);
  }

  cargar_denuncia(id:string):void
  {
    this.cargando = true;
    let obj =
    {
      'folio': id
    };
    this.denunciaService.seguimiento_denuncia(obj).subscribe(
    respuesta => {
      console.log(respuesta);
      this.cargando = false;
      this.obj_denuncia = respuesta;

      if(this.obj_denuncia.anonimo == 1)
      {
        this.obj_denuncia.nombre = "N/A";
        this.obj_denuncia.apellido_paterno = "N/A";
        this.obj_denuncia.apellido_materno = "N/A";
        this.obj_denuncia.sexo = "N/A";
        this.obj_denuncia.edad = "N/A";
        this.obj_denuncia.denunciante = "ANONIMO";
        
      }else{
        this.obj_denuncia.denunciante = "NO ANONIMO";
        if(this.obj_denuncia.sexo == 1)
          this.obj_denuncia.sexo = "MASCULINO";
        else if(this.obj_denuncia.sexo == 2)
          this.obj_denuncia.sexo = "FEMENINO";
        else    
          this.obj_denuncia.sexo = "N/A";
      }

      if(this.obj_denuncia.tipo_denuncia == 1)
          this.obj_denuncia.tipo_denuncia = "ESTABLECIMIENTO";
        else if(this.obj_denuncia.tipo_denuncia == 2)
        {
          this.obj_denuncia.tipo_denuncia = "FUNCIONARIO PÚBLICO";
          this.obj_denuncia.producto = "N/A";
        }else    
          this.obj_denuncia.tipo_denuncia = "N/A";

      this.obj_denuncia.EstatusDenuncia = this.obj_estatus[this.obj_denuncia.idEstatus].descripcion;    

      this.obj_denuncia.EntidadPersona    = respuesta.catalogo_entidad_persona.nombre;
      this.obj_denuncia.MunicipioPersona  = respuesta.catalogo_municipio_persona.nombre;
      this.obj_denuncia.LocalidadPersona  = respuesta.catalogo_localidad_persona.nombre;
      this.obj_denuncia.EntidadDenuncia   = respuesta.catalogo_entidad_denuncia.nombre;
      this.obj_denuncia.MunicipioDenuncia = respuesta.catalogo_municipio_denuncia.nombre;
      
    },
    error => {
      this.cargando = false;
      let e = error.json();
      this.mensajeError = new Mensaje(true);
      this.mensajeError.texto = e.error;
      this.mensajeError.mostrar = true;      
      
      try {
        let e = error.json();
        if (error.status == 401 ){
          this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
        }
        // Problema de validación
        if (error.status == 409){
          this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
          
        }
      } catch(e){
                    
        if (error.status == 500 ){
          this.mensajeError.texto = "500 (Error interno del servidor)";
        } else {
          this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
        }            
      }

    });
  }

  tab_datos(id:number):void
  {
    this.tabs = id;
  }

}
