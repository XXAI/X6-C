import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';

import { ReporteService } from '../reporte.service';
import { Mensaje } from '../../mensaje';

@Component({
  selector: 'app-boletin-proyectos',
  templateUrl: './boletin-proyectos.component.html',
  styleUrls: ['./boletin-proyectos.component.css']
})
export class BoletinProyectosComponent implements OnInit {

  muestras: any[] = [];
  options_muestra_total: Object = {};
  options_muestra_especificaciones: Object = {};
  options_verificacion_total: Object = {};
  options_capacitacion_total: Object = {};
  options_dictamen_total: Object = {};
  options_reaccion_total: Object = {};
  catalogo_tema: string[];
  tamano = document.body.clientHeight;
  total_graficas:number = 0;
  lista_datos:any[] = [];
  lista_detalles:any[] = [];

  cargando: boolean = false;
  busquedaActivada:boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  constructor(
    private http: Http,
      private reporteService: ReporteService
     ) { }
//options_muestra_total: Object;

  ngOnInit() {
    this.cargar_catalogos();
    
  }

  listar(id_tema:number):void{
    //this.options_muestra_total['series'][0]['data'] = Array(50,60);
    this.cargando = true;
    this.options_muestra_total = {};
    this.options_muestra_especificaciones = {};
    this.options_verificacion_total = {};
    this.options_capacitacion_total = {};
    this.options_dictamen_total = {};
    this.options_reaccion_total = {};
    this.total_graficas = 0;
    this.lista_datos = [];
    this.lista_detalles = [];
    
    
    this.reporteService.lista(id_tema).subscribe(
        response => {
          let i = 0;
          this.lista_datos = response.table;
          this.lista_detalles = response.detalles;
          
          for(i= 0; i< response.datos.length; i++)
          {
           
            if(response.datos[i].id_tipo_programacion == 1)
            {
                this.options_verificacion_total = {
                    title : { text : response.datos[i].tema },
                    subtitle: { text:  response.datos[i].tipo },
                    chart: { type: 'column' },
                    yAxis: { min: 0, title: { text: 'Total' }, stackLabels: { enabled: true,  style: { fontWeight: 'bold', color: 'gray' }}},
                    xAxis: { categories: ["Metas", "Acumulado"] },
                    //legend: { align: 'right', x: -30, verticalAlign: 'top', y: 25, floating: false, borderColor: '#CCC', borderWidth: 1, shadow: false },
                    legend: { enabled: false},
                    plotOptions: { series: { dataLabels: { align: 'center', enabled: true }}},
                    series: [{ name: "Verificaciones", data : [ parseInt(response.datos[i].total),parseInt(response.datos[i].acumulado) ] }]
                }
                this.total_graficas++;
                
            }
            if(response.datos[i].id_tipo_programacion == 2)
            {
              //console.log(response[0].total);
                this.options_muestra_total = {
                    title : { text : response.datos[i].tema },
                    subtitle: { text:  response.datos[i].tipo },
                    yAxis: { min: 0, title: { text: 'Total' }, stackLabels: { enabled: true,  style: { fontWeight: 'bold', color: 'gray' }}},
                    chart: { type: 'column' },
                    xAxis: { categories: ["Meta", "Acumulado"] },
                    //legend: { align: 'right', x: -30, verticalAlign: 'top', y: 25, floating: false, borderColor: '#CCC', borderWidth: 1, shadow: false },
                    legend: { enabled: false},
                    plotOptions: { series: { dataLabels: { align: 'center', enabled: true }}},
                    series: [{ name: "Muestras", data : [ parseInt(response.datos[i].total) ,  parseInt(response.datos[i].acumulado) ] }]
                }

                this.options_muestra_especificaciones = {
                  title : { text : response.datos[i].tema },
                  subtitle: { text:  response.datos[i].tipo +" Acumulado" },
                  chart: { type: 'column' },
                  yAxis: { min: 0, title: { text: 'Total' }, stackLabels: { enabled: true,  style: { fontWeight: 'bold', color: 'gray' }}},
                  xAxis: { categories: ["Dentro de Especificaciones", "Fuera de Especificaciones"] },
                  //legend: { align: 'right',x: -30, verticalAlign: 'top', y: 25, floating: true, borderColor: '#CCC', borderWidth: 1, shadow: false },
                  legend: { enabled: false},
                  plotOptions: { series: { dataLabels: { align: 'center', enabled: true }}},
                  series: [{ name: "Muestras Acumuladas", data : [ parseInt(response.datos[i].dentro_especificaciones),parseInt(response.datos[i].fuera_especificaciones) ] }]
              }
              this.total_graficas++;
              
            }
            if(response.datos[i].id_tipo_programacion == 3)
            {
              //console.log(response[0].total);
                this.options_capacitacion_total = {
                    title : { text : response.datos[i].tema },
                    subtitle: { text:  response.datos[i].tipo },
                    chart: { type: 'column' },
                    yAxis: { min: 0, title: { text: 'Total' }, stackLabels: { enabled: true,  style: { fontWeight: 'bold', color: 'gray' }}},
                    xAxis: { categories: ["Metas", "Acumulado"] },
                    //legend: { align: 'right', x: -30, verticalAlign: 'top', y: 25, floating: true, borderColor: '#CCC', borderWidth: 1, shadow: false },
                    legend: { enabled: false},
                    plotOptions: { series: { dataLabels: { align: 'center', enabled: true }}},
                    series: [{ name: "Capacitaciones", data : [ parseInt(response.datos[i].total),parseInt(response.datos[i].acumulado) ] }]
                }
                this.total_graficas++;
                
            }
            if(response.datos[i].id_tipo_programacion == 4)
            {
              //console.log(response[0].total);
                this.options_dictamen_total = {
                    title : { text : response.datos[i].tema },
                    subtitle: { text:  response.datos[i].tipo },
                    chart: { type: 'column' },
                    yAxis: { min: 0, title: { text: 'Total' }, stackLabels: { enabled: true,  style: { fontWeight: 'bold', color: 'gray' }}},
                    xAxis: { categories: ["Metas", "Acumulado"] },
                    //legend: { align: 'right', x: -30, verticalAlign: 'top', y: 25, floating: true, borderColor: '#CCC', borderWidth: 1, shadow: false },
                    legend: { enabled: false},
                    plotOptions: { series: { dataLabels: { align: 'center', enabled: true }}},
                    series: [{ name: "Dictamenes", data : [ parseInt(response.datos[i].total),parseInt(response.datos[i].acumulado) ] }]
                }
                this.total_graficas++;
                
            }
            if(response.datos[i].id_tipo_programacion == 5)
            {
              //console.log(response[0].total);
                this.options_reaccion_total = {
                    title : { text : response.datos[i].tema },
                    chart: { type: 'column' },
                    subtitle: { text:  response.datos[i].tipo },
                    yAxis: { min: 0, title: { text: 'Total' }, stackLabels: { enabled: true,  style: { fontWeight: 'bold', color: 'gray' }}},
                    xAxis: { categories: ["Metas", "Acumulado"] },
                    //legend: { align: 'right', x: -30, verticalAlign: 'top', y: 25, floating: true, borderColor: '#CCC', borderWidth: 1, shadow: false },
                    legend: { enabled: false},
                    plotOptions: { series: { dataLabels: { align: 'center', enabled: true }}},
                    series: [{ name: "Reacciones Adversas", data : [ parseInt(response.datos[i].total),parseInt(response.datos[i].acumulado) ] }]
                }
                this.total_graficas++;
                
            }
            
          }
          
          this.cargando=false;  
      },
      error => {
        this.cargando=false;
        console.log(error);
      }
    );
    
    
  }

  filtro(id_tema):void
  {
    this.listar(id_tema);
  }

  cargar_catalogos():void{
    this.reporteService.carga_catalogos().subscribe(
        resultado => {
          
          this.catalogo_tema = resultado.tema;
        },
        error => {
          this.cargando = false;
          this.mensajeError.mostrar = true;
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
