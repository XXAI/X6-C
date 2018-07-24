import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';

import { SeguimientoService } from '../seguimiento.service';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  tabla_medio: any[] = [];
  options_medio: Object = {};
  grafica_medio: Object[] = [];

  tabla_dictamen: any[] = [];
  options_dictamen: Object = {};
  grafica_dictamen: Object[] = [];

  tabla_medida_seguridad: any[] = [];
  options_medida_seguridad: Object = {};
  grafica_medida_seguridad: Object[] = [];

  tabla_resolucion: any[] = [];
  options_resolucion: Object = {};
  grafica_resolucion: Object[] = [];

  tabla_sancion: any[] = [];
  options_sancion: Object = {};
  grafica_sancion: Object[] = [];

  tabla_informe: any[] = [];
  options_informe: Object = {};
  grafica_informe: Object[] = [];

  total_graficas:number = 0;
  id_filtro:number = 0;

  catalogo_medio:any[] = [];
  
  meses:String[] = ['ENERO','FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPIEMBRE', 'OCUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  tamano = 0;
  colores:string[] =  ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

  medio:any[] = ['IMPRESO', 'RADIO', 'TELEVISIÓN', 'REDES SOCIALES', 'INTERNET'];
  medida:any[] = ['SUSPENSIÓN DE SERVICIOS', 'PROHIBICIÓN DE ACTOS DE USO'];
  dictamen:any[] = ['SIN ANOMALIAS', 'CON ANOMALIAS'];
  resolucion:any[] = ['CON SANCIÓN ADMINISTRATIVA', 'CONCLUIDO', 'POR ACUERDO'];
  sancion:any[] = ['AMONESTACION', 'MULTA', 'CLAUSURA', 'ARRESTO'];
  informe:any[] = ['NO. DE INFORMES DE VERIFICACION'];
  registros_ceros:any[] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  registros_grafica_ceros:any[] = [0,0,0,0,0,0,0,0,0,0,0,0];

  cargando: boolean = false;
  busquedaActivada:boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  constructor(
      private title: Title,
      private http: Http,
      private seguimientoService: SeguimientoService
     ) { }


    ngOnInit() {
        this.listar();
        this.cargar_catalogo();
        this.title.setTitle("Reporte Publicidad");
    }

  listar():void{
    this.cargando = true;
    
    this.tabla_medio = [];
    this.grafica_medio = [];
    this.options_medio = {};

    this.tabla_dictamen = [];
    this.grafica_dictamen = [];
    this.options_dictamen = {};

    this.tabla_medida_seguridad = [];
    this.options_medida_seguridad = {};
    this.grafica_medida_seguridad = [];

    this.tabla_resolucion = [];
    this.options_resolucion = {};
    this.grafica_resolucion = [];

    this.tabla_sancion = [];
    this.options_sancion = {};
    this.grafica_sancion = [];

    this.tabla_informe = [];
    this.options_informe= {};
    this.grafica_informe = [];

    
    this.total_graficas = 0;

    this.tamano = (document.body.offsetWidth) * 0.70;
    this.seguimientoService.lista_publicidad(this.id_filtro).subscribe(
        response => {
          

          let i = 0;
          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Dictamen.length; index++) {
                  var arreglo:any = response.Dictamen[index];
                  if((arreglo.id_dictamen - 1) == i)
                  {
                        var datos = response.Dictamen[index];
                        var serie = {name: this.dictamen[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                        var data_table = {descripcion: this.dictamen[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                        this.tabla_dictamen.push(data_table);
                        bandera++;
                  }
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.dictamen[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_dictamen.push(data_table);
                var serie = {name: this.dictamen[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_dictamen.push(serie);
              i++;
          }while(i< this.dictamen.length);

          
          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Medio.length; index++) {
                  var arreglo:any = response.Medio[index];
                  if((arreglo.id_medio_utilizado - 1) == i)
                  {
                        var datos = response.Medio[index];
                        var serie = {name: this.medio[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                        var data_table = {descripcion: this.medio[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                        this.tabla_medio.push(data_table);
                        bandera++;
                  }
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.medio[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_medio.push(data_table);
                var serie = {name: this.medio[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_medio.push(serie);
              i++;
          }while(i< this.medio.length);

          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Sancion.length; index++) {
                  var arreglo:any = response.Sancion[index];
                  if((arreglo.id_sancion_administrativa - 1) == i)
                  {
                      var datos = response.Sancion[index];
                      var serie = {name: this.sancion[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.sancion[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_sancion.push(data_table);
                      bandera++;
                  }
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.sancion[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_sancion.push(data_table);
                var serie = {name: this.sancion[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_sancion.push(serie);
              i++;
          }while(i< this.sancion.length);

         


          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Resolucion.length; index++) {
                  var arreglo:any = response.Resolucion[index];
                  if((arreglo.id_resolucion_administrativa - 1) == i)
                  {
                      var datos = response.Resolucion[index];
                      var serie = {name: this.resolucion[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.resolucion[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_resolucion.push(data_table);
                      bandera++;
                  }
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.resolucion[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_resolucion.push(data_table);
                var serie = {name: this.resolucion[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_resolucion.push(serie);
              i++;
          }while(i< this.resolucion.length);

          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Informe.length; index++) {
                  var arreglo:any = response.Informe[index];
                  
                      var datos = response.Informe[index];
                      var serie = {name: this.informe[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.informe[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_informe.push(data_table);
                      bandera++;
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.informe[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_informe.push(data_table);
                var serie = {name: this.informe[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_informe.push(serie);
              i++;
          }while(i< this.informe.length);

          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Medida_Seguridad.length; index++) {
                  var arreglo:any = response.Medida_Seguridad[index];
                  if((arreglo.id_medida_seguridad - 1) == i)
                  {
                      var datos = response.Medida_Seguridad[index];
                      var serie = {name: this.medida[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.medida[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_medida_seguridad.push(data_table);
                      bandera++;
                  }
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.medida[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_medida_seguridad.push(data_table);
                var serie = {name: this.medida[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_medida_seguridad.push(serie);
              i++;
          }while(i< this.medida.length);
  
            this.options_medio = this.graficar(this.tamano, 'MEDIO UTILIZADO', '', this.meses, this.grafica_medio);
            this.options_dictamen = this.graficar(this.tamano, 'DICTAMEN TÉCNICO', '', this.meses, this.grafica_dictamen);
            this.options_medida_seguridad = this.graficar(this.tamano, 'MEDIDA SEGURIDAD', '', this.meses, this.grafica_medida_seguridad);
            this.options_resolucion = this.graficar(this.tamano, 'RESOLUCIÓN ADMINISTRATIVA', '', this.meses, this.grafica_resolucion);
            this.options_sancion = this.graficar(this.tamano, 'SANCIÓN ADMINISTRATIVA', '', this.meses, this.grafica_sancion);
            this.options_informe = this.graficar(this.tamano, 'No. DE INFORMES DE VERIFICACIÓN', '', this.meses, this.grafica_informe);
            
            this.cargando=false;  
      },
      error => {
        this.cargando=false;
        console.log(error);
      }
    );
    
    
  }


  cargar_catalogo():void
  {
    this.seguimientoService.catalogos_seguimiento(0).subscribe(
        response => {
            console.log(response);
            this.catalogo_medio = response.AreaOperativa;
      },
      error => {
        this.cargando=false;
        console.log(error);
      }
    );
  }

  filtro(id_area:number):void{
        this.id_filtro = id_area;
        this.listar();
  }

  
  graficar(tamano:number, titulo:String, subtitulo:String, arreglo_meses:any[], datos_grafica:any[]):object{

    var data = new Object();
    data['chart']       = {  type: 'column', width: this.tamano, height: 500  };
    data['colors']      = this.colores;
    data['title']       = { text: titulo  };
    data['subtitle']    = { text: subtitulo  };
    data['xAxis']       = { categories: arreglo_meses, crosshair: true };
    data['yAxis']       = { min: 0, title: {  text: 'Cantidad' }};
    data['legend']      = { align: 'left', verticalAlign: 'bottom', width: 20, useHTML: true };
    data['tooltip']     = { enabled: true, 
                            headerFormat: '<span style="font-size:10px"><b>{point.key}</b></span><table>',   
                            pointFormat: '<tr><td style="padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        };
    data['plotOptions'] = { column: { pointPadding: 0.2, borderWidth: 0 } };
    data['series']      = datos_grafica;
    data['exporting']   = { showtable: true };                   
    data['credits']     = { enabled: true, href:"http://saludchiapas.gob.mx", text: "Instituto de Salud del Estado de Chiapas", style: { fofontSize: '20px' } };      
    
    if(datos_grafica.length > 20)
        data['tooltip'].shared = false ;                   
    
    return data;
  }

}
