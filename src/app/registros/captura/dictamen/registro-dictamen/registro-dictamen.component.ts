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
import { RegistroDictamenService } from '../registro-dictamen.service';
import { Dictamen } from '../dictamen';

@Component({
  selector: 'app-registro-dictamen',
  templateUrl: './registro-dictamen.component.html',
  styleUrls: ['./registro-dictamen.component.css']
})
export class RegistroDictamenComponent implements OnInit {

  tamano = document.body.clientHeight;

  cargando: boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  registrosModule: FormGroup;
  registrosNotificacionModule: FormGroup;
  registrosCitatorioModule: FormGroup;
  registrosResolucionModule: FormGroup;
  registrosAmonestacionModule: FormGroup;
  registrosMultaModule: FormGroup;
  pestanas:number=1;
  showbuscador:boolean= false;

  indice_archivo:number;
  // # FIN SECCION

  // # SECCION: Lista de porgramacion
  busqueda: any = {buscarText:'', id_jurisdiccion: '0'};
  registros:Dictamen[] = [];
  id_editar: number = 0;
  local: any = { anio:0, jurisdiccion:0, tema:0 };
  arreglo_meses: any[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  variable_booleana: any[] = ["NO", "SI"];
  mostrar_pestana:boolean = false;
  lista_busqueda_verificacion: string[] = [];
  lista_busqueda_verificacion_completo: string[] = [];
  lista_notificaciones: string[] = [];
  lista_citatorios: string[] = [];
  lista_resoluciones: string[] = [];
  lista_amonestaciones: string[] = [];
  lista_multas: string[] = [];
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
  resultadosBusqueda:Dictamen[] = [];
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

  //subir el archivo notificaion
  tag_archivo:any;
  
  constructor(private title: Title,
  	          private location: Location,
              private registrodictamenService: RegistroDictamenService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.registrosModule = this.fb.group({
      anio: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      jurisdiccion: ['', [Validators.required]],
      tema: ['', [Validators.required]],
      archivo: ['', []],
      oficio: ['', [Validators.required]],
      no_verificacion: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      id_verificacion: ['', [Validators.required]]
      });

    this.registrosNotificacionModule = this.fb.group({
      oficio_notificacion: ['', []],
        archivo: ['', []],
    });

    this.registrosCitatorioModule = this.fb.group({
      oficio_citatorio: ['', []],
      archivo: ['', []]
    });

    this.registrosResolucionModule = this.fb.group({
      oficio_resolucion: ['', []],
      archivo: ['', []]
    });
    this.registrosAmonestacionModule = this.fb.group({
      oficio_amonestacion: ['', []],
      archivo: ['', []]
    });
    this.registrosMultaModule = this.fb.group({
      oficio_multa: ['', []],
      archivo: ['', []]
    });
 

    this.title.setTitle("Registros Dictamen");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    this.route.params.subscribe(params => {
      this.local.anio = params['id1'];
      this.local.jurisdiccion = params['id2'];
      this.local.tema         = params['id3'];

    });
    //console.log(this.registrosModule.get('anio'));
    this.listar(1);
    this.cargar_catalogos(this.local);
  }

  listar(pagina:number): void {
    this.paginaActual = pagina;
    
    this.cargando = true;
    this.registrodictamenService.lista(pagina,this.resultadosPorPagina, this.local).subscribe(
        resultado => {
          
          this.cargando = false;
          this.registros = resultado.data as Dictamen[];
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
      this.registrodictamenService.buscar_detalle(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
          resultado => {
            this.cargando = false;
  
            this.resultadosBusqueda = resultado.data as Dictamen[];
  
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

    tabulaciones(index:number):void{
      this.pestanas = index;
    }

    verificacion(index:number)
    {
      if(this.pestanas == index)
        return true;
      else
        return false;  
    }

    cargar_catalogos(obj: any):void{
      this.registrodictamenService.carga_catalogos(obj).subscribe(
          resultado => {
            
            this.registrosModule.patchValue({jurisdiccion:resultado.jurisdiccion[this.local.jurisdiccion - 1].descripcion});
            this.registrosModule.patchValue({tema:resultado.tema[this.local.tema - 1].descripcion});
            this.lista_busqueda_verificacion = resultado.verificaciones;
            this.lista_busqueda_verificacion_completo = resultado.verificaciones;
            
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

    fileArchivo(e: Event) {
      var element: HTMLInputElement = e.target as HTMLInputElement;
      this.tag_archivo = element;    
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
            return 0;
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
        formData.append("oficio", this.registrosModule.get("oficio").value);
        formData.append("mes", this.registrosModule.get("mes").value);
        formData.append("id_verificacion", this.registrosModule.get("id_verificacion").value);
       
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
            
        });
        var self = this;
        if(this.id_editar == 0)  
          xhr.open("POST", environment.API_URL+"/registro-dictamen", true);
        else  
          xhr.open("POST", environment.API_URL+"/registro-dictamen/"+this.id_editar, true);
        
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
               //self.showregistro = !self.showregistro;
               //self.reset_form();
               self.mostrar_pestana = true;
               var json = JSON.parse( xhr.responseText);
                self.id_editar = json.data.id;
                console.log(self.id_editar); 
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

  agregar_archivo(index:number) {
    

    this.indice_archivo = index;
    var formData: FormData = new FormData();
    if(this.tag_archivo)
    {
      let img:any = this.tag_archivo.files[0];
      formData.append("file", img, img.name);
    }else{
      alert("ES NECESARIO ELEGIR UN ARCHIVO A SUBIR, VUELVA A INTENTARLO POR FAVOR");
      return 0;
    }
      this.cargando = true;

      this.subir_archivo = false;
      
      formData.append("id_jurisdiccion", this.local.jurisdiccion);
      formData.append("anio", this.local.anio);
      formData.append("id_tema", this.local.tema);
      formData.append("mes", this.registrosModule.get("mes").value);

      if(index == 1)
      {
        formData.append("oficio", this.registrosNotificacionModule.get("oficio_notificacion").value);
        formData.append("id_tipo_seguimiento", index.toString());
      }else if(index == 2)
      {
        formData.append("oficio", this.registrosCitatorioModule.get("oficio_citatorio").value);
        formData.append("id_tipo_seguimiento", index.toString());
      }else if(index == 3)
      {
        formData.append("oficio", this.registrosResolucionModule.get("oficio_resolucion").value);
        formData.append("id_tipo_seguimiento", index.toString());
      }else if(index == 4)
      {
        formData.append("oficio", this.registrosAmonestacionModule.get("oficio_amonestacion").value);
        formData.append("id_tipo_seguimiento", index.toString());
      }else if(index == 5)
      {
        formData.append("oficio", this.registrosMultaModule.get("oficio_multa").value);
        formData.append("id_tipo_seguimiento", index.toString());
      }
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
          
      });
      var self = this;
        xhr.open("POST", environment.API_URL+"/registro-dictamen-archivos/"+this.id_editar, true);
      
      xhr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('token'));
      var usuario = JSON.parse(localStorage.getItem("usuario"));

      if(usuario.proveedor_activo){
        xhr.setRequestHeader("X-Proveedor-Id", usuario.proveedor_activo.id);
      }

      xhr.onreadystatechange = function (index) {
          if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
             self.mensajeExito = new Mensaje(true);
              self.mensajeExito.mostrar = true;
              self.mensajeExito.texto = "Se  guardo correctamente el registro";
             self.listar(1);
             var json = JSON.parse( xhr.responseText);
             
             if(self.indice_archivo == 1)
             {
                self.lista_notificaciones = json.data;
             }else if(self.indice_archivo == 2)
             {
              self.lista_citatorios = json.data;
             }else if(self.indice_archivo == 3)
             {
              self.lista_resoluciones = json.data;
             }else if(self.indice_archivo == 4)
             {
              self.lista_amonestaciones = json.data;
             }else if(self.indice_archivo == 5)
             {
              self.lista_multas = json.data;
             }
              console.log(self.lista_notificaciones);
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
      var download = window.open(`${environment.API_URL}/descargar-dictamen/${obj.id}?${query}`);  
}

ver_archivo(id:number, obj:any) {
      var query = "token="+localStorage.getItem('token')+"&tipo="+id;
      var self = this;
      window.open(`${environment.API_URL}/ver-archivo/${obj.id}?${query}`);  
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
    console.log(obj);
    this.mensajeError = new Mensaje(true);
    this.mensajeError.mostrar = true;
    
    if(obj.status == 500)
    this.mensajeError.texto = obj.responseText;
      else
    this.mensajeError.texto = "Ha ocurrido un error al enviar el archivo";
  }

  

    eliminar(id:string):void
    {
        if(confirm("¿Realmente desea eliminar este registro?"))
        {
            this.cargando = true;
            this.registrodictamenService.elimina(id).subscribe(
            resultado => {
              this.cargando = false;
              this.listar(1);
              this.mensajeExito = new Mensaje(true);
              this.mensajeExito.mostrar = true;
              this.mensajeExito.texto = "Se ha eliminado satisfactoriamente el registro";
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

    eliminar_archivo(identificador:number, id:string):void
    {
        if(confirm("¿Realmente desea eliminar este registro?"))
        {
            this.cargando = true;
            this.registrodictamenService.elimina_archivos(id).subscribe(
            resultado => {
              this.cargando = false;
              this.listar(1);
              if(identificador == 1){
                this.lista_notificaciones = resultado;
              }else if(identificador == 2){
                this.lista_citatorios = resultado;
              }else if(identificador == 3){
                this.lista_resoluciones = resultado;
              }else if(identificador == 4){
                this.lista_amonestaciones = resultado;
              }else if(identificador == 5){
                this.lista_multas = resultado;
              }

              this.mensajeExito = new Mensaje(true);
              this.mensajeExito.mostrar = true;
              this.mensajeExito.texto = "Se ha eliminado satisfactoriamente el registro";
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

    verifica_busqueda(texto_busqueda:string):void
    {
      
      this.lista_busqueda_verificacion = this.lista_busqueda_verificacion_completo;
      if(texto_busqueda!="")
      {
        let lista = this.lista_busqueda_verificacion.filter(function(category){
          return category['folio'].toLowerCase().indexOf(texto_busqueda.toLowerCase()) > -1;
        });
        this.lista_busqueda_verificacion = lista;
      }
    }

    seleccionar_verificacion(obj:any):void
    {
        console.log(obj);
        this.registrosModule.patchValue({no_verificacion: obj.folio, institucion: obj.establecimiento, id_verificacion: obj.id});
        this.showbuscador = false;
    }

    crear_nuevo()
    {
      this.mostrar_pestana = false;
      this.showregistro= true;
      this.reset_form();
      this.id_editar = 0;
      this.tabulaciones(1);

      this.lista_notificaciones = [];
      this.lista_citatorios = [];
      this.lista_resoluciones = [];
      this.lista_amonestaciones = [];
      this.lista_multas = [];
    }

    reset_form()
    {
      
      let form_jurisdiccion = this.registrosModule.get("jurisdiccion").value;
      let form_tema = this.registrosModule.get("tema").value;
      this.registrosModule.reset();
      this.registrosModule.patchValue({anio: this.local.anio, jurisdiccion: form_jurisdiccion, tema:form_tema});
      this.tag = "";
      this.tag_archivo = "";
    }

    regresar(){
      this.location.back();
    }

    editar(obj:any)
    {
      this.reset_form();
      this.mostrar_pestana = true;
      this.showregistro = true;  
      this.registrosModule.patchValue({reaccion:obj.reaccion, oficio: obj.oficio});
      this.registrosModule.patchValue({ mes: obj.mes, anio: this.local.anio, id_verificacion:obj.verificacion.id, no_verificacion:obj.verificacion.folio, institucion: obj.verificacion.establecimiento});
      
      this.tabulaciones(1);
      this.lista_notificaciones = obj.notificaciones;
      this.lista_citatorios = obj.citatorios;
      this.lista_resoluciones = obj.resoluciones;
      this.lista_amonestaciones = obj.amonestaciones;
      this.lista_multas = obj.multas;

      this.id_editar = obj.id;
      console.log(this.lista_citatorios.length);
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
