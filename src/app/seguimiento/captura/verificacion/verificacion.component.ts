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

import { Mensaje } from '../../../mensaje';
import { PrincipalService } from '../../principal.service';
import { Seguimiento } from '../../seguimiento';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  tamano = document.body.clientHeight;

  cargando: boolean = false;
  showDialog:boolean = false;
  showAgregarTema:boolean = false;
  filter:boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();
  ultimaPeticion:any;
  registrosModule: FormGroup;
  
  // # FIN SECCION

  // # SECCION: Lista de porgramacion
  busqueda: any = {buscarText:'', areaoperativa: '0', giro:'0'};
  lista_verificacion: Seguimiento[] = [];
  
  paginaActual = 1;
  resultadosPorPagina = 25;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = [];
  obj_seleccion:any;
  // # FIN SECCION

  // # SECCION: Resultados de búsqueda
  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: Seguimiento[] = [];
  busquedaActivada:boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 25;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda:number[] = [];
  showForm:boolean = false;
  id_objeto:number = 0;

  //catalogos
  CatalogoMotivoOrden: string[] = ['POR VIGILANCIA ORDINARIA', 'POR SOLICITUD COFEPRIS', 'POR DENUNCIA', 'POR OPERATIVO', 'DE SEGUIMIENTO', 'POR TRAMITE DE LICENCIA SANITARIA'];
  CatalogoBooleano: string[] = ['SI', 'NO'];
  CatalogoAreaOperativa: string[];
  CatalogoFiscalia: string[];
  CatalogoGiro: string[];
  CatalogoTipoDocumento: string[];
  CatalogoTrabajador: string[];
  CatalogoMedidaSeguridad: string[];

  constructor( 
    private title: Title,
    private principalService:PrincipalService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.registrosModule = this.fb.group({
      id: ['', [Validators.required]],
      no_orden: ['', [Validators.required]],
      fecha_orden: ['', [Validators.required]],
      id_area_operativa: ['', [Validators.required]],
      id_motivo_orden_verificacion: ['', [Validators.required]],
      id_fiscalia: ['', [Validators.required]],
      id_toma_muestra: ['', [Validators.required]],
      id_giro: ['', [Validators.required]],
      establecimiento: ['', [Validators.required]],
      fecha_acta: ['', [Validators.required]],
      id_tipo_acta: ['', [Validators.required]],
      id_primer_verificador: ['', [Validators.required]],
      id_segundo_verificador: ['', [Validators.required]],
      id_medida_seguridad: ['', [Validators.required]],
      motivo_suspension: ['', [Validators.required]],
      fecha_envio_dictamen: ['', [Validators.required]],
    });

    this.title.setTitle("Registro Verificacion Sanitaria");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();

    this.listar(1);
    this.cargar_catalogos(1);

    //Extra
    var self = this;

    var busquedaSubject = this.terminosBusqueda
	    .debounceTime(300) // Esperamos 300 ms pausando eventos
	    .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
	    .switchMap((term:string)  =>  { 
	      
        this.busquedaActivada = true;
        let busquedas_registradas:number = 0;
        if(this.busqueda.buscarText.length == 0 && this.busqueda.areaoperativa == 0 && this.busqueda.giro == 0)
        {
          this.busquedaActivada = false;
          this.cargando = false;
          busquedas_registradas = 0;
        }else
          busquedas_registradas = 1;

	      this.ultimoTerminoBuscado = term;
	      this.paginaActualBusqueda = 1;
	      this.cargando = true;
	      return busquedas_registradas ? this.principalService.buscar_verificacion(term, this.busqueda, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda) : Observable.of<any>({data:[]}) 
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
	        this.resultadosBusqueda = resultado.data as Seguimiento[];
	        this.totalBusqueda = resultado.total | 0;
	        this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

	        this.indicePaginasBusqueda = [];
	        for(let i=0; i< this.paginasTotalesBusqueda; i++){
	          this.indicePaginasBusqueda.push(i+1);
	        }
	        
	        console.log("Búsqueda cargada.");
	      }

	    );
    //fin extra
  }

buscar(term: string): void {
    this.busqueda.buscarText = term;
    this.terminosBusqueda.next(term);
}

listar(pagina:number): void {
  this.paginaActual = pagina;
  
  this.cargando = true;
  this.principalService.lista_verificacion(pagina,this.resultadosPorPagina, 1).subscribe(
      resultado => {
        
        this.cargando = false;
        this.lista_verificacion = resultado.data as Seguimiento[];
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

cargar_catalogos(tipo_acta:number): void {
  this.principalService.catalogos_seguimiento(tipo_acta).subscribe(
      resultado => {
        this.CatalogoAreaOperativa = resultado.AreaOperativa;
        this.CatalogoFiscalia = resultado.Fiscalia;
        this.CatalogoGiro = resultado.Giro;
        this.CatalogoTipoDocumento = resultado.TipoDocumento;
        this.CatalogoTrabajador = resultado.Trabajador;        
        this.CatalogoMedidaSeguridad = resultado.MedidaSeguridad;        
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

  eliminar(id:string):void
  {
      if(confirm("¿Realmente desea eliminar este registro?"))
      {
          this.cargando = true;
          this.principalService.elimina_verificacion(id).subscribe(
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

  agregar_registro()
  {
    this.cargando = true;    
    if(this.id_objeto== 0)
    {
      this.principalService.agregar_verificacion(this.registrosModule.value).subscribe(
        resultado => {
          this.listar(1);
          this.cargando = false;
          this.mensajeExito = new Mensaje(true);
          this.mensajeExito.texto = "Se han guardado los cambios.";
          this.mensajeExito.mostrar = true;
          //this.showForm = false;
        },
        error => {
          this.cargando = false;
          
          this.mensajeError = new Mensaje(true);
          this.mensajeError.texto = "No especificado.";
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
      this.principalService.editar_verificacion(this.id_objeto, this.registrosModule.value).subscribe(
        resultado => {
          this.listar(1);
          this.cargando = false;
          this.mensajeExito = new Mensaje(true);
          this.mensajeExito.texto = "Se han guardado los cambios.";
          this.mensajeExito.mostrar = true;
          this.showForm = false;
        },
        error => {
          this.cargando = false;
          
          this.mensajeError = new Mensaje(true);
          this.mensajeError.texto = "No especificado.";
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

  cargar_registro(Objeto:any)
  {

    this.showForm = true;
   
    //this.registrosModule.patchValue({'no_orden':Objeto.no_orden});
    this.cargando = true;  
    this.id_objeto = Objeto.id;
    this.principalService.ver_verificacion(Objeto.id).subscribe(
        resultado => {
          this.showForm = true;
          console.log(resultado);
          this.cargando = false; 
          //let r = resultado;
          //this.registrosModule.patchValue({'no_orden':r.no_orden, 'id_area_operativa': r.id_area_operativa});
          this.registrosModule.patchValue(resultado);
          //resultado.fecha_orden = resultado.fecha_orden.substr(1,4);
          console.log(resultado);
          //this.registrosModule.patchValue({'fecha_orden': resultado.fecha_orden});
          //this.registrosModule.patchValue({'fecha_orden': '2018-01-01'});
        },
        error => {
          this.cargando = false;

          this.mensajeError = new Mensaje(true);
          this.mensajeError = new Mensaje(true);
          this.mensajeError.mostrar;

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

  listarBusqueda(term:string ,pagina:number): void {
    this.paginaActualBusqueda = pagina;

    this.cargando = true;
    this.principalService.buscar_verificacion(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
        resultado => {
          this.cargando = false;

          this.resultadosBusqueda = resultado.data as Seguimiento[];

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

  crear_nuevo():void{
    this.showForm = true;
    this.registrosModule.reset();
    this.registrosModule.patchValue({'id':0});
    this.id_objeto = 0;
  }

  filtro(id:number, value:string):void
  {
    switch (id) {
      case 1:
        this.busqueda.areaoperativa = value;
      break;
      case 2:
        this.busqueda.giro = value;
      break;
      
    }
    this.cargando = true;
    
    if(this.busqueda.buscarText.length == 0 && this.busqueda.areaoperativa == 0 && this.busqueda.giro == 0)
    {
      this.busquedaActivada = false;
      this.cargando = false;
    }
    else
    {
      this.busquedaActivada = true;
      this.principalService.buscar_verificacion(this.ultimoTerminoBuscado, this.busqueda, 1, this.resultadosPorPaginaBusqueda).subscribe(
          resultado => {
            this.cargando = false;

            this.resultadosBusqueda = resultado.data as Seguimiento[];

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
