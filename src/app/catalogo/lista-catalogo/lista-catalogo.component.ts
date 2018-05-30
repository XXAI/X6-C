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
import { CatalogoService } from '../catalogo.service';
import { Tema } from '../tema';

@Component({
  selector: 'app-lista-catalogo',
  templateUrl: './lista-catalogo.component.html',
  styleUrls: ['./lista-catalogo.component.css']
})
export class ListaCatalogoComponent implements OnInit {

  cargando: boolean = false;
  showDialog:boolean = false;
  showTema:boolean = false;
  filter:boolean = false;
  id_tema:number = 0;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  
  ultimaPeticion:any;
  form_tema: FormGroup;
  // # FIN SECCION

  // # SECCION: Lista de porgramacion
  busqueda: any = {buscarText:'', id_jurisdiccion: '0', id_tipo:'0'};
  tema: Tema[] = [];
  paginaActual = 1;
  resultadosPorPagina = 25;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = [];
  catalogo_ambito:any;
  // # FIN SECCION

  // # SECCION: Resultados de búsqueda
  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: Tema[] = [];
  busquedaActivada:boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 25;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda:number[] = [];
  
  constructor( 
              private title: Title,
              private catalogoService:CatalogoService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.cargar_catalogos();
    this.form_tema = this.fb.group({
     
      id_ambito_riesgo: ['', []],
      descripcion: ['', [Validators.required]],
     
    });

    this.title.setTitle("Programación Metas");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    this.listar(1);
    var self = this;

    var busquedaSubject = this.terminosBusqueda
	    .debounceTime(300) // Esperamos 300 ms pausando eventos
	    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
	    .switchMap((term:string)  =>  { 
	      
        this.busquedaActivada = true;
        if(this.busqueda.buscarText.length == 0 && this.busqueda.id_jurisdiccion == 0 && this.busqueda.id_tipo == 0)
        {
          this.busquedaActivada = false;
          this.cargando = false;
        }

	      this.ultimoTerminoBuscado = term;
	      this.paginaActualBusqueda = 1;
	      this.cargando = true;
	      return term  ? this.catalogoService.buscar_detalle(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda) : Observable.of<any>({data:[]}) 
	    }
	      
	    
	    ).catch( function handleError(error){ 
	     
	      self.cargando = false;      
	      self.mensajeError.mostrar = true;
	      self.ultimaPeticion = function(){self.listarBusqueda(self.ultimoTerminoBuscado,self.paginaActualBusqueda);};//OJO
	      try {
	        let e = error.json();
	        if (error.status == 401 ){
	          self.mensajeError.texto = "No tiene permiso para hacer esta operación.";
	        }
	      } catch(e){
	        console.log("No se puede interpretar el error");
	        
	        if (error.status == 500 ){
	          self.mensajeError.texto = "500 (Error interno del servidor)";
	        } else {
	          self.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
	        }            
	      }
	      // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
	      return busquedaSubject
	    
	    });

	    busquedaSubject.subscribe(
	      resultado => {
	        this.cargando = false;
	        this.resultadosBusqueda = resultado.data as Tema[];
	        this.totalBusqueda = resultado.total | 0;
	        this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

	        this.indicePaginasBusqueda = [];
	        for(let i=0; i< this.paginasTotalesBusqueda; i++){
	          this.indicePaginasBusqueda.push(i+1);
	        }
	        
	        console.log("Búsqueda cargada.");
	      }

	    );
  }
  listar(pagina:number): void {
    this.paginaActual = pagina;
    
    this.cargando = true;
    this.catalogoService.lista_tema(pagina,this.resultadosPorPagina).subscribe(
      resultado => {
        
        this.cargando = false;
        this.tema = resultado.data as Tema[];
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
    this.catalogoService.buscar_detalle(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
        resultado => {
          this.cargando = false;

          this.resultadosBusqueda = resultado.data as Tema[];

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

  eliminar_tema(id:any): void{
    if(confirm("¿Realmente desea eliminar este tema?"))
      {
          this.cargando = true;
          this.catalogoService.elimina_tema(id).subscribe(
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
      this.showTema = true;
      this.id_tema = 0;
      //this.programacion_jurisdiccional.reset();
      //this.programacion_jurisdiccional.patchValue({id_tipo_programacion: this.id_tipo_programacion});
  }

  cargar_catalogos():void{
    this.catalogoService.carga_catalogos().subscribe(
        resultado => {
          this.catalogo_ambito =  resultado.ambito;
         
         
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

  agregar_tema():void{
    this.cargando = true;
    if(this.id_tema == 0)
    {
      this.catalogoService.agregar_tema(this.form_tema.value).subscribe(
        respuesta => {
          /*this.cargar_usuarios();*/
          this.cargando = false;
          this.mensajeExito = new Mensaje(true);
          this.mensajeExito.texto = "Se han guardado los cambios.";
          this.mensajeExito.mostrar = true;
          this.listar(1);
          this.showTema = false;
          this.form_tema.reset();
        
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
    }else{
      this.catalogoService.editar_tema(this.id_tema, this.form_tema.value).subscribe(
        respuesta => {
          /*this.cargar_usuarios();*/
          this.cargando = false;
          this.mensajeExito = new Mensaje(true);
          this.mensajeExito.texto = "Se han editado los cambios correctamente.";
          this.mensajeExito.mostrar = true;
          this.listar(1);
          this.showTema= false;
          this.id_tema = 0;
          this.form_tema.reset();
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
  }

  editarTema(obj: any)
    {
      console.log(obj);
      this.id_tema = obj.id;
      this.showTema = true;
      this.form_tema.patchValue({id_ambito_riesgo: obj.id_ambito_riesgo, descripcion: obj.descripcion});
    }
}
