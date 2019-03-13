import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params }   from '@angular/router';
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

import { DenunciaService } from '../denuncia.service';
import { Mensaje } from '../../mensaje';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  datos_generales:number = 1;
  datos_denuncia:number = 0;
  datos_personales:number = 2;
  tipo_denuncia:number = 2;
  estado:number = 0;
  cargando:boolean = false;
  formulario_activo:boolean = true;
  codigo_seguiimiento:string = "";

  fecha_actual:string = "";

  /* combos del formulario */
  estado_persona:any = [];
  municipio_persona:any = [];
  localidad_persona:any = [];
  estado_denuncia:any = [];
  municipio_denuncia:any = [];

  registro_denuncia: FormGroup;
  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  constructor(
    private title: Title,
      private http: Http,
      private route: ActivatedRoute,
      private denunciaService: DenunciaService,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registro_denuncia = this.fb.group({
      anonimo: ['2', [Validators.required]],
      nombre: ['', []],
      apellido_paterno: ['', []],
      apellido_materno: ['', []],
      sexo: ['1', []],
      edad: ['', []],
      correo: ['', [Validators.required]],
      lada: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      ext: ['', []],
      cp_persona: ['', []],
      estado_persona: ['', [Validators.required]],
      municipio_persona: ['', [Validators.required]],
      localidad_persona: ['', [Validators.required]],
      colonia_persona: ['', []],
      calle_persona: ['', []],
      ext_persona: ['', []],
      int_persona: ['', []],
      tipo_denuncia: ['2', [Validators.required]],
      razon_social: ['', [Validators.required]],
      giro: ['', [Validators.required]],
      producto: ['', []],
      estado_denuncia: ['', [Validators.required]],
      municipio_denuncia: ['', [Validators.required]],
      calle_denuncia: ['', []],
      ext_denuncia: ['', []],
      cp_denuncia: ['', []],
      colonia_denuncia: ['', []],
      narracion: ['', [Validators.required]],
  
    });

    this.title.setTitle("Registro de Denuncias");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();
    this.cargar_catalogo();
  }

  tab_datos(id:number):void
  {
    switch(id)
    {
      case 1:
      this.datos_denuncia = 0;
      this.datos_generales = 1;
      break;
      case 2:
      this.datos_denuncia = 1;
      this.datos_generales = 0;
      break;
    }
  }

  cargar_catalogo():void{
    this.denunciaService.carga_catalogos().subscribe(
      resultado => {
        this.estado_persona = resultado;
        this.estado_denuncia = resultado;
      },
      error => {
        this.mensajeError.mostrar = true;
        try {
          let e = error.json();
          if (error.status == 401 ){
            this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
          }
        } catch(e){
          console.log(e);
          if (error.status == 500 ){
            this.mensajeError.texto = "500 (Error interno del servidor)";
          } else {
            this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }            
        }

      }
    );
  }

  seleccion_estado(id:number):void{
    this.estado = id;
    this.denunciaService.carga_municipio(id).subscribe(
      resultado => {
        this.municipio_persona = resultado;
      },
      error => {
        this.mensajeError.mostrar = true;
        try {
          let e = error.json();
          if (error.status == 401 ){
            this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
          }
        } catch(e){
          
          if (error.status == 500 ){
            this.mensajeError.texto = "500 (Error interno del servidor)";
          } else {
            this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }            
        }

      }
    );
  }

  seleccion_estado_denuncia(id:number):void{
    this.estado = id;
    this.denunciaService.carga_municipio(id).subscribe(
      resultado => {
        this.municipio_denuncia = resultado;
      },
      error => {
        this.mensajeError.mostrar = true;
        try {
          let e = error.json();
          if (error.status == 401 ){
            this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
          }
        } catch(e){
          
          if (error.status == 500 ){
            this.mensajeError.texto = "500 (Error interno del servidor)";
          } else {
            this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }            
        }

      }
    );
  }

  seleccion_municipio(id:number):void{
    let datos =
    {
      entidad: this.estado,
      municipio: id
    }
    this.denunciaService.carga_localidad(datos).subscribe(
      resultado => {
        this.localidad_persona = resultado;
      },
      error => {
        this.mensajeError.mostrar = true;
        try {
          let e = error.json();
          if (error.status == 401 ){
            this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
          }
        } catch(e){
          
          if (error.status == 500 ){
            this.mensajeError.texto = "500 (Error interno del servidor)";
          } else {
            this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
          }            
        }

      }
    );
  }

  agregar_denuncia():void{
    this.cargando = true;
    
      this.denunciaService.nueva_denuncia(this.registro_denuncia.value).subscribe(
      respuesta => {
        
        console.log(respuesta);
        this.formulario_activo = false;
        this.cargando = false;
        this.codigo_seguiimiento = respuesta.codigo;
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

      }
    );
    
  }

  siguiente():void
  {
    this.tab_datos(2);
  }

  cambiar_datos(valor:number):void{
    this.datos_personales = valor;
  }
  
  cambiar_tipo(valor:number):void{
    this.tipo_denuncia = valor;
  }

}
