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
import { MetasService } from '../../../metas.service';
import { Programacion } from '../../../programacion';
@Component({
  selector: 'app-lista-dictamen',
  templateUrl: './lista-dictamen.component.html',
  styleUrls: ['./lista-dictamen.component.css']
})
export class ListaDictamenComponent implements OnInit {

  tamano = document.body.clientHeight;

  id_tipo_programacion:number = 4;

  cargando: boolean = false;
  showDialog:boolean = false;
  showAgregarTema:boolean = false;
  filter:boolean = false;
  
  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  programacion_jurisdiccional: FormGroup;
  // # FIN SECCION

  // # SECCION: Lista de porgramacion
  busqueda: any = {buscarText:'', id_jurisdiccion: '0', id_tipo:'0'};
  programacion_jurisdiccion: Programacion[] = [];
  catalogo_jurisdicciones: string[] = [];
  tema: string[] = [];
  tipoProgramacion: string[] = [];
  paginaActual = 1;
  resultadosPorPagina = 25;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = [];
  id_programacion:number = 0;
  // # FIN SECCION

  // # SECCION: Resultados de búsqueda
  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: Programacion[] = [];
  busquedaActivada:boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 25;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda:number[] = [];
  showAgregarProgramacion:boolean = false; 
  
  constructor( 
              private title: Title,
              private metaService:MetasService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.programacion_jurisdiccional = this.fb.group({
      //anio: ['', [Validators.required]],
      id_jurisdiccion: ['', [Validators.required]],
      id_tipo_programacion: ['', [Validators.required]],
      id_tema: ['', [Validators.required]],
      enero: ['', [Validators.required]],
      febrero: ['', [Validators.required]],
      marzo: ['', [Validators.required]],
      abril: ['', [Validators.required]],
      mayo: ['', [Validators.required]],
      junio: ['', [Validators.required]],
      julio: ['', [Validators.required]],
      agosto: ['', [Validators.required]],
      septiembre: ['', [Validators.required]],
      octubre: ['', [Validators.required]],
      noviembre: ['', [Validators.required]],
      diciembre: ['', [Validators.required]],
  
    });

    this.title.setTitle("Programación Metas");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    this.programacion_jurisdiccional.patchValue({id_tipo_programacion: this.id_tipo_programacion});

    this.listar(1);
    this.cargar_catalogos();

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
	      return term  ? this.metaService.buscar_detalle(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda, this.id_tipo_programacion) : Observable.of<any>({data:[]}) 
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
	        this.resultadosBusqueda = resultado.data as Programacion[];
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

  listar(pagina:number): void {
    this.paginaActual = pagina;
    
    this.cargando = true;
    this.metaService.lista(pagina,this.resultadosPorPagina, this.id_tipo_programacion).subscribe(
        resultado => {
          
          this.cargando = false;
          this.programacion_jurisdiccion = resultado.data as Programacion[];
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
      this.metaService.buscar_detalle(term, pagina, this.resultadosPorPaginaBusqueda, this.id_tipo_programacion).subscribe(
          resultado => {
            this.cargando = false;
  
            this.resultadosBusqueda = resultado.data as Programacion[];
  
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
      this.metaService.carga_catalogos().subscribe(
          resultado => {
            this.programacion_jurisdiccional.patchValue({anio: resultado.anio});
            this.catalogo_jurisdicciones = resultado.jurisdiccion;
            this.tema = resultado.tema;
            this.tipoProgramacion = resultado.tipoProgramacion;
           
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

    agregar_programacion():void{
      this.cargando = true;
      console.log(this.id_programacion);
      if(this.id_programacion == 0)
      {
        this.metaService.agregar_programacion(this.programacion_jurisdiccional.value).subscribe(
          respuesta => {
            /*this.cargar_usuarios();*/
            this.cargando = false;
            this.mensajeExito = new Mensaje(true);
            this.mensajeExito.texto = "Se han guardado los cambios.";
            this.mensajeExito.mostrar = true;
            let aux_jurisdiccion:number = this.programacion_jurisdiccional.get('id_jurisdiccion').value;
            let aux_tema:number = this.programacion_jurisdiccional.get('id_tema').value;
            this.listar(1);
            this.programacion_jurisdiccional.reset();
            this.programacion_jurisdiccional.patchValue({id_jurisdiccion: aux_jurisdiccion, id_tipo_programacion: this.id_tipo_programacion, id_tema: aux_tema});


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
        this.metaService.editar_programacion(this.id_programacion, this.programacion_jurisdiccional.value).subscribe(
          respuesta => {
            /*this.cargar_usuarios();*/
            this.cargando = false;
            this.mensajeExito = new Mensaje(true);
            this.mensajeExito.texto = "Se han editado los cambios correctamente.";
            this.mensajeExito.mostrar = true;
            this.listar(1);
            this.showAgregarProgramacion= false;
            this.id_programacion = 0;
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

    eliminar_programacion(id:string):void
    {
        if(confirm("¿Realmente desea eliminar esta programación?"))
        {
            this.cargando = true;
            this.metaService.elimina_programacion(id).subscribe(
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
      this.showAgregarProgramacion= true;
      this.id_programacion = 0;
      this.programacion_jurisdiccional.reset();
      this.programacion_jurisdiccional.patchValue({id_tipo_programacion: this.id_tipo_programacion});
    }

    editarProgramacion(obj: any)
    {
      this.id_programacion = obj.id;
      this.showAgregarProgramacion = !this.showAgregarProgramacion;
      this.programacion_jurisdiccional.patchValue({id_jurisdiccion: obj.id_jurisdiccion, id_tema: obj.id_tema, id_tipo_programacion: this.id_tipo_programacion});
      this.programacion_jurisdiccional.patchValue({enero: obj.enero, febrero: obj.febrero, marzo: obj.marzo, abril: obj.abril, mayo: obj.mayo, junio: obj.junio});
      this.programacion_jurisdiccional.patchValue({julio: obj.julio, agosto: obj.agosto, septiembre: obj.septiembre, octubre: obj.octubre, noviembre: obj.noviembre, diciembre: obj.diciembre});
    }

    filtro(id:number, value:string):void
     {
        switch (id) {
          case 1:
            this.busqueda.id_jurisdiccion = value;
          break;
          case 2:
            this.busqueda.id_tipo = value;
          break;
          
        }
        this.cargando = true;
        
        if(this.busqueda.buscarText.length == 0 && this.busqueda.id_jurisdiccion == 0 && this.busqueda.id_tipo == 0)
        {
          this.busquedaActivada = false;
          this.cargando = false;
        }
        else
        {
          this.busquedaActivada = true;
          this.metaService.buscar(this.ultimoTerminoBuscado, this.busqueda, 1, this.resultadosPorPaginaBusqueda).subscribe(
              resultado => {
                this.cargando = false;

                this.resultadosBusqueda = resultado.data as Programacion[];

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
