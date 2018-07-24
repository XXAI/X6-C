import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';

import { ReporteService } from '../reporte.service';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-jurisdiccional',
  templateUrl: './jurisdiccional.component.html',
  styleUrls: ['./jurisdiccional.component.css']
})
export class JurisdiccionalComponent implements OnInit {

  muestras: any[] = [];
  options_extra = {};
  options_jurisdiccion_1 = {};
  options_jurisdiccion_2 = {};
  options_jurisdiccion_3 = {};
  options_jurisdiccion_4 = {};
  options_jurisdiccion_5 = {};
  options_jurisdiccion_6 = {};
  options_jurisdiccion_7 = {};
  options_jurisdiccion_8 = {};
  options_jurisdiccion_9 = {};
  options_jurisdiccion_10 = {};
  options_jurisdiccion_11 = {};
  options_jurisdiccion_12 = {};
  catalogo_tema: string[];
  lista_jurisdiccional: any[] = [];
  tamano = document.body.clientHeight;
  total_graficas:number = 0;

  cargando: boolean = false;
  busquedaActivada:boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  constructor(
      private title: Title,
      private http: Http,
      private reporteService: ReporteService
     ) { }
//options_muestra_total: Object;

  ngOnInit() {
    this.cargar_catalogos();
    console.log(this.lista_jurisdiccional.length);
    this.title.setTitle("Reporte Jurisdiccional");
  }

  listar(id_tema:number):void{
    //this.options_muestra_total['series'][0]['data'] = Array(50,60);
    this.cargando = true;
    this.options_extra = {};
    this.options_jurisdiccion_1 = {};
    this.options_jurisdiccion_2 = {};
    this.options_jurisdiccion_3 = {};
    this.options_jurisdiccion_4 = {};
    this.options_jurisdiccion_5 = {};
    this.options_jurisdiccion_6 = {};
    this.options_jurisdiccion_7 = {};
    this.options_jurisdiccion_8 = {};
    this.options_jurisdiccion_9 = {};
    this.options_jurisdiccion_10 = {};
    this.options_jurisdiccion_11 = {};
    this.options_jurisdiccion_12 = {};
    this.total_graficas = 0;
    this.lista_jurisdiccional = [];

    this.reporteService.lista_jurisdiccion(id_tema).subscribe(
        response => {
          
          this.lista_jurisdiccional = response;
          console.log(response);
          let i = 0;
          
          for(i= 0; i< response.length; i++)
          {
            this.options_extra = {
              title: { text:  response[i].descripcion },
              subtitle : { text : response[i].jurisdiccion.descripcion },
              chart: { type: 'column' },
              yAxis: { min: 0, title: { text: 'Total' }, stackLabels: { enabled: true,  style: { fontWeight: 'bold', color: 'gray' }}},
              xAxis: { categories: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"] },
              legend: { enabled: false},
              plotOptions: { series: { dataLabels: { align: 'center', enabled: true }}},
              series: [{ name: "PROGRAMADO", data : [ parseInt(response[i].enero),parseInt(response[i].febrero),parseInt(response[i].marzo),parseInt(response[i].abril),parseInt(response[i].mayo),parseInt(response[i].junio),parseInt(response[i].julio),parseInt(response[i].agosto),parseInt(response[i].septiembre),parseInt(response[i].octubre),parseInt(response[i].noviembre),parseInt(response[i].diciembre) ] },
              { name: "ACUMULADO", data : [ parseInt(response[i].enero_acumulado),parseInt(response[i].febrero_acumulado),parseInt(response[i].marzo_acumulado),parseInt(response[i].abril_acumulado),parseInt(response[i].mayo_acumulado),parseInt(response[i].junio_acumulado),parseInt(response[i].julio_acumulado),parseInt(response[i].agosto_acumulado),parseInt(response[i].septiembre_acumulado),parseInt(response[i].octubre_acumulado),parseInt(response[i].noviembre_acumulado),parseInt(response[i].diciembre_acumulado) ] }]
            }
            if(response[i].id_jurisdiccion == 1)
                this.options_jurisdiccion_1 = this.options_extra;
            if(response[i].id_jurisdiccion == 2)
                this.options_jurisdiccion_2 = this.options_extra;
            if(response[i].id_jurisdiccion == 3)
                this.options_jurisdiccion_3 = this.options_extra;
            if(response[i].id_jurisdiccion == 4)
                this.options_jurisdiccion_4 = this.options_extra;
            if(response[i].id_jurisdiccion == 5)
                this.options_jurisdiccion_5 = this.options_extra;
            if(response[i].id_jurisdiccion == 6)
                this.options_jurisdiccion_6 = this.options_extra;
            if(response[i].id_jurisdiccion == 7)
                this.options_jurisdiccion_7 = this.options_extra;
            if(response[i].id_jurisdiccion == 8)
                this.options_jurisdiccion_8 = this.options_extra;
            if(response[i].id_jurisdiccion == 9)
                this.options_jurisdiccion_9 = this.options_extra;
            if(response[i].id_jurisdiccion == 10)
                this.options_jurisdiccion_10 = this.options_extra;
            if(response[i].id_jurisdiccion == 11)
                this.options_jurisdiccion_11 = this.options_extra;
            if(response[i].id_jurisdiccion == 12)
                this.options_jurisdiccion_12 = this.options_extra;
                        
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
