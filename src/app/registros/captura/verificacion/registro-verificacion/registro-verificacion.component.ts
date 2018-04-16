import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl, NgModel  } from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { environment } from '../../../../../environments/environment';
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

import { Mensaje } from '../../../../mensaje';
import { RegistroVerificacionService } from '../registro-verificacion.service';
import { Verificacion } from '../verificacion';

@Component({
  selector: 'app-registro-verificacion',
  templateUrl: './registro-verificacion.component.html',
  styleUrls: ['./registro-verificacion.component.css']
})
export class RegistroVerificacionComponent implements OnInit {

  tamano = document.body.clientHeight;

  cargando: boolean = false;
  showDialog:boolean = false;
  showAgregarTema:boolean = false;
  nombre_archivo:string = "";

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  registrosModule: FormGroup;
  variable_medida_seguridad:boolean = true;

  // # FIN SECCION

  // # SECCION: Lista de porgramacion
  busqueda: any = {buscarText:'', id_jurisdiccion: '0'};
  registros: Verificacion[] = [];
  id_editar: number = 0;
  local: any = { anio:0, jurisdiccion:0, tema:0 };
  arreglo_meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  variable_booleana: any[] = ["NO", "SI"];
  paginaActual = 1;
  resultadosPorPagina = 25;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = [];
  id_programacion:number;
  // # FIN SECCION

  // # SECCION: Resultados de búsqueda

  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: Verificacion[] = [];
  busquedaActivada:boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 25;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda:number[] = [];
  showregistro:boolean = false;

  //subir el archivo
  tag:any;
  cargando_archivo:number = 0;
  subir_archivo:boolean = true;

  constructor(private title: Title,
  	          private location: Location,
              private registroverificacionService: RegistroVerificacionService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.registrosModule = this.fb.group({
      anio: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      jurisdiccion: ['', [Validators.required]],
      tema: ['', [Validators.required]],
      archivo: ['', []],
      establecimiento: ['', [Validators.required]],
      folio: ['', [Validators.required]],
      giro: ['', [Validators.required]],
      medida_seguridad: ['', [Validators.required]],
      descripcion_medida: ['', []],
      informativa: ['', [Validators.required]],
      
    });
    this.title.setTitle("Registros Verificaciones");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    this.route.params.subscribe(params => {
      this.local.anio = params['id1'];
      this.local.jurisdiccion = params['id2'];
      this.local.tema         = params['id3'];

    });
    this.listar(1);
    this.cargar_catalogos();
  }

  listar(pagina:number): void {
    this.paginaActual = pagina;
    
    this.cargando = true;
    this.registroverificacionService.lista(pagina,this.resultadosPorPagina, this.local).subscribe(
        resultado => {
          
          this.cargando = false;
          this.registros = resultado.data as Verificacion[];
          this.total = resultado.total | 0;
          this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

          this.indicePaginas = [];
          for(let i=0; i< this.paginasTotales; i++){
            this.indicePaginas.push(i+1);
          }
          
        },
        error => {
          this.cargando = false;
          this.mensajeError.mostrar = true;
          this.ultimaPeticion = this.listar;
          try {
            let e = error.json();
            if (error.status == 401 ){
              this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
            }
          } catch(e){
            console.log("No se puede interpretar el error");
            
            if (error.status == 500 ){
              this.mensajeError.texto = "500 (Error interno del servidor)";
            } else {
              this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
            }            
          }

        }
      );
    }

    listarBusqueda(term:string ,pagina:number): void {
      this.paginaActualBusqueda = pagina;
  
      this.cargando = true;
      this.registroverificacionService.buscar_detalle(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
          resultado => {
            this.cargando = false;
  
            this.resultadosBusqueda = resultado.data as Verificacion[];
  
            this.totalBusqueda = resultado.total | 0;
            this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);
  
            this.indicePaginasBusqueda = [];
            for(let i=0; i< this.paginasTotalesBusqueda; i++){
              this.indicePaginasBusqueda.push(i+1);
            }
            
          },
          error => {
            this.cargando = false;
            this.mensajeError.mostrar = true;
            this.ultimaPeticion = function(){this.listarBusqueda(term,pagina);};
            try {
              let e = error.json();
              if (error.status == 401 ){
                this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
              }
            } catch(e){
              console.log("No se puede interpretar el error");
              
              if (error.status == 500 ){
                this.mensajeError.texto = "500 (Error interno del servidor)";
              } else {
                this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
              }            
            }
  
          }
        );
    }

    cargar_catalogos():void{
      this.registroverificacionService.carga_catalogos().subscribe(
          resultado => {
            for (let index = 0; index < resultado.jurisdiccion.length; index++) {
              if(resultado.jurisdiccion[index].id == this.local.jurisdiccion)
                this.registrosModule.patchValue({jurisdiccion:resultado.jurisdiccion[index].descripcion});
            }
            
            this.registrosModule.patchValue({tema:resultado.tema[this.local.tema - 1].descripcion});
          },
          error => {
            this.cargando = false;
            this.mensajeError.mostrar = true;
            this.ultimaPeticion = this.listar;
            try {
              let e = error.json();
              if (error.status == 401 ){
                this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
              }
            } catch(e){
              console.log("No se puede interpretar el error");
              
              if (error.status == 500 ){
                this.mensajeError.texto = "500 (Error interno del servidor)";
              } else {
                this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
              }            
            }
  
          }
        );
    }

    fileChanged(e: Event) {
      var element: HTMLInputElement = e.target as HTMLInputElement;
      this.tag = element;    
    }

    agregar() {
      
      var formData: FormData = new FormData();
      if(this.id_editar == 0)
      {  
        if(this.tag)
          {
            let img:any = this.tag.files[0];
            formData.append("file", img, img.name);
          }else{
            alert("ES NECESARIO ELEGIR UN ARCHIVO A SUBIR, VUELVA A INTENTARLO POR FAVOR");
          }
      }else{
        if(this.tag)
        {
          let img:any = this.tag.files[0];
          formData.append("file", img, img.name);
        }
      } 
      
        this.cargando = true;

        this.subir_archivo = false;
        
        formData.append("id_jurisdiccion", this.local.jurisdiccion);
        formData.append("anio", this.local.anio);
        formData.append("id_tema", this.local.tema);
        formData.append("folio", this.registrosModule.get("folio").value);
        formData.append("establecimiento", this.registrosModule.get("establecimiento").value);
        formData.append("giro", this.registrosModule.get("giro").value);
        formData.append("medida_seguridad", this.registrosModule.get("medida_seguridad").value);
        formData.append("descripcion_medida", this.registrosModule.get("descripcion_medida").value);
        formData.append("informativa", this.registrosModule.get("informativa").value);
        formData.append("mes", this.registrosModule.get("mes").value);
       
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
            
        });
        var self = this;
        if(this.id_editar == 0)  
          xhr.open("POST", environment.API_URL+"/registro-verificacion", true);
        else  
          xhr.open("POST", environment.API_URL+"/registro-verificacion/"+this.id_editar, true);
        
        xhr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('token'));
        var usuario = JSON.parse(localStorage.getItem("usuario"));

        if(usuario.proveedor_activo){
          xhr.setRequestHeader("X-Proveedor-Id", usuario.proveedor_activo.id);
        }

        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
               self.mensajeExito = new Mensaje(true);
                self.mensajeExito.mostrar = true;
                self.mensajeExito.texto = "Se  guardo correctamente el registro";
               self.listar(1);
               self.showregistro = !self.showregistro;
               self.reset_form();
               self.cargando = false; 
            }

            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {
               self.error_envio(xhr);
               self.subir_archivo = true; 
               self.cargando = false;       
            }
            self.cargando_archivo = xhr.readyState;
        };        
        xhr.send(formData);
      
  }

  descargar(obj:any) {
      var query = "token="+localStorage.getItem('token');
      var self = this;
      var download = window.open(`${environment.API_URL}/descargar-verificacion/${obj.id}?${query}`);  
  }

  descargar_archivo() {
    var query = "token="+localStorage.getItem('token');
    var self = this;
    var download = window.open(`${environment.API_URL}/descargar-verificacion/${this.id_editar}?${query}`);  
}
error_descargar(obj)
{
  this.mensajeError = new Mensaje(true);
  this.mensajeError.mostrar = true;
  
  if(obj.status == 500)
  this.mensajeError.texto = obj.responseText;
    else
  this.mensajeError.texto = "Ha ocurrido un error al descargar el archivo";
}
  error_envio(obj)
  {
    this.mensajeError = new Mensaje(true);
    this.mensajeError.mostrar = true;
    
    if(obj.status == 500)
    {
      let respuesta = JSON.parse(obj.responseText);
      this.mensajeError.texto = respuesta.error;
    }else
    this.mensajeError.texto = "Ha ocurrido un error al enviar el archivo";
  }

  verificar_estado(valor:number):void{
    if(valor == 1)
      this.variable_medida_seguridad = false;
    else
    {
      this.registrosModule.patchValue({descripcion_medida:""});
      this.variable_medida_seguridad = true;
    }
  } 

    eliminar(id:string):void
    {
        if(confirm("¿Realmente desea eliminar esta programación?"))
        {
            this.cargando = true;
            this.registroverificacionService.elimina(id).subscribe(
            resultado => {
              this.cargando = false;
              this.listar(1);
              this.mensajeExito = new Mensaje(true);
              this.mensajeExito.mostrar = true;
              this.mensajeExito.texto = "Se ha eliminado satisfactoriamente la programación";
            },
            error => {
              this.cargando = false;
              this.mensajeError = new Mensaje(true);
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
    }

    crear_nuevo()
    {
      this.showregistro= true;
      this.reset_form();
      this.id_editar = 0;
    }

    reset_form()
    {
      
      let form_jurisdiccion = this.registrosModule.get("jurisdiccion").value;
      let form_tema = this.registrosModule.get("tema").value;
      this.registrosModule.reset();
      this.registrosModule.patchValue({anio: this.local.anio, jurisdiccion: form_jurisdiccion, tema:form_tema});
      this.tag = "";
    }

    regresar(){
      this.location.back();
    }

    editar(obj:any)
    {
      this.showregistro = true;  
      this.registrosModule.patchValue({folio: obj.folio, establecimiento:obj.establecimiento, giro: obj.giro, medida_seguridad:obj.medida_seguridad});
      this.registrosModule.patchValue({descripcion_medida: obj.descripcion_medida, informativa:obj.informativa, mes: obj.mes, anio: this.local.anio});
      this.id_editar = obj.id;
      this.nombre_archivo = obj.archivo;
    }

    paginaSiguiente():void {
	    this.listar(this.paginaActual+1);
    }
    paginaAnterior():void {
        this.listar(this.paginaActual-1);
    }

    paginaSiguienteBusqueda(term:string):void {
        this.listarBusqueda(term,this.paginaActualBusqueda+1);
    }
    paginaAnteriorBusqueda(term:string):void {
        this.listarBusqueda(term,this.paginaActualBusqueda-1);
    }

}
