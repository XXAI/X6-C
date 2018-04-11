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

import { Mensaje } from '../../../../mensaje';
import { VerificacionService } from '../verificacion.service';
import { Verificacion } from '../verificacion';

@Component({
  selector: 'app-captura-verificacion',
  templateUrl: './captura-verificacion.component.html',
  styleUrls: ['./captura-verificacion.component.css']
})
export class CapturaVerificacionComponent implements OnInit {

  tamano = document.body.clientHeight;

  cargando: boolean = false;
  filter:boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  //programacion_jurisdiccional: FormGroup;
  // # FIN SECCION

  // # SECCION: Lista de porgramacion
  busqueda: any = {buscarText:'', id_jurisdiccion: '0'};
  verificacion: Verificacion[] = [];
  catalogo_jurisdicciones: string[] = [];
  tema: string[] = [];
  tipoProgramacion: string[] = [];
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
  showAgregarProgramacion:boolean = false;

  constructor(private title: Title,
              private verificacionService:VerificacionService) { }

  ngOnInit() {
    this.title.setTitle("Registro Capacitación");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    this.listar(1);
    this.cargar_catalogos();

    var self = this;

    var busquedaSubject = this.terminosBusqueda
	    .debounceTime(300) // Esperamos 300 ms pausando eventos
	    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
	    .switchMap((term:string)  =>  { 
	      
        this.busquedaActivada = true;

        let bandera:boolean = false;
        if(this.busqueda.buscarText.length == 0 && this.busqueda.id_jurisdiccion == 0)
        {
          this.busquedaActivada = false;
          this.cargando = false;
          bandera = true;
        }

	      this.ultimoTerminoBuscado = term;
	      this.paginaActualBusqueda = 1;
        this.cargando = true;
        if(bandera)
          return term  ? this.verificacionService.buscar_detalle(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda, this.busqueda.id_jurisdiccion) : Observable.of<any>({data:[]});
        else
	        return this.verificacionService.buscar_detalle(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda, this.busqueda.id_jurisdiccion);
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
	        this.resultadosBusqueda = resultado.data as Verificacion[];
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

  buscar(term: string): void {
    this.busqueda.buscarText = term;
    this.terminosBusqueda.next(term);
  }

  listarBusqueda(term:string ,pagina:number): void {
    this.paginaActualBusqueda = pagina;

    this.cargando = true;
    this.verificacionService.buscar_detalle(term, pagina, this.resultadosPorPaginaBusqueda, this.busqueda.id_jurisdiccion).subscribe(
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

  filtro(id:number, value:string):void
     {
        switch (id) {
          case 1:
            this.busqueda.id_jurisdiccion = value;
          break;
        }
        this.cargando = true;
        
        if(this.busqueda.buscarText.length == 0 && this.busqueda.id_jurisdiccion == 0)
        {
          this.busquedaActivada = false;
          this.cargando = false;
        }
        else
        {
          this.busquedaActivada = true;
          this.verificacionService.buscar(this.ultimoTerminoBuscado, this.busqueda, 1, this.resultadosPorPaginaBusqueda).subscribe(
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
                this.ultimaPeticion = function(){this.listarBusqueda(this.ultimoTerminoBuscado,1);};
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
     }

  cargar_catalogos():void{
    this.verificacionService.carga_catalogos().subscribe(
        resultado => {
          this.catalogo_jurisdicciones = resultado.jurisdiccion;
          this.tema = resultado.tema;
          
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

  listar(pagina:number): void {
    this.paginaActual = pagina;
    
    this.cargando = true;
    this.verificacionService.lista(pagina,this.resultadosPorPagina).subscribe(
        resultado => {
          
          this.cargando = false;
          this.verificacion = resultado.data as Verificacion[];
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
