import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { SeguimientoDenunciaService } from '../seguimiento-denuncia.service';
import { Denuncia } from '../denuncia';
import { Mensaje } from '../../mensaje';
import { ListarComponent } from '../../crud/listar.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  cargando:boolean = false;
  lista_denuncias:any = [];
  denunciante:any = [{}, {'descripcion': "ANONIMO"}, {'descripcion': "NO ANONIMO"}];
  tipo_denuncia:any = [{}, {'descripcion': "ESTABLECIMIENTO"}, {'descripcion': "FUNCIONARIO PÚBLICO"}];
  estatus_denuncia:any = [{'descripcion':'TODOS'}, {'descripcion':'NO ATENDIDO'}, {'descripcion':'EN PROCESO'},{'descripcion':'CONCLUIDO'},{'descripcion':'NO PROCEDE'}];
  busqueda: any = {texto_filtro:'', estatus_filtro: '0'};
  texto_filtro:string = "";
  estatus_filtro:number = 0;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  // # SECCION: Resultados de búsqueda
  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: Denuncia[] = [];
  busquedaActivada:boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 25;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda:number[] = [];
  paginaActual = 1;
  resultadosPorPagina = 25;
  total = 0;
  paginasTotales = 0;
  indicePaginas:number[] = [];
  ultimaPeticion:any;
  
  constructor(
    private title: Title,
    private http: Http,
    private seguimientoDenunciaService: SeguimientoDenunciaService
  ) { }

  ngOnInit() {
    this.title.setTitle("Lista de Denuncias");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();
    this.listar(1);
    

  }

  listar(pagina:number): void {
    this.paginaActual = pagina;
    console.log(this.estatus_denuncia);
    this.cargando = true;
    this.seguimientoDenunciaService.lista(pagina,this.resultadosPorPagina, this.busqueda).subscribe(
        resultado => {
          this.lista_denuncias = resultado.data as Denuncia;
          this.cargando = false;
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

    /*buscar(term: string): void {
      this.busqueda.buscarText = term;
      this.terminosBusqueda.next(term);
    }*/

    filtro(id:number, valor:any)
    {
      switch(id)
      {
        case 1:
          this.busqueda.texto_filtro = valor;
        break;
        case 2:
        this.busqueda.estatus_filtro = valor;
        break;
      }
      console.log(this.busqueda);
    }
    buscar():void
    {
        this.listar(1);
    }
  
    listarBusqueda(term:string ,pagina:number): void {
      this.paginaActualBusqueda = pagina;
  
      this.cargando = true;
      this.seguimientoDenunciaService.buscar_detalle(term, pagina, this.resultadosPorPaginaBusqueda).subscribe(
          resultado => {
            this.cargando = false;
  
            this.resultadosBusqueda = resultado.data as Denuncia[];
  
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
