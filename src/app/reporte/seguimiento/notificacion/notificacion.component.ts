import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';

import { SeguimientoService } from '../seguimiento.service';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  tabla_area_operativa: any[] = [];
  options_area_operativa: Object = {};
  grafica_area_operativa: Object[] = [];

  tabla_tipo_notificacion: any[] = [];
  options_tipo_notificacion: Object = {};
  grafica_tipo_notificacion: Object[] = [];

  tabla_procedimiento_notificacion: any[] = [];
  options_procedimiento_notificacion: Object = {};
  grafica_procedimiento_notificacion: Object[] = [];

  tabla_trabajador: any[] = [];
  options_trabajador: Object = {};
  grafica_trabajador: Object[] = [];

  tabla_emitidas: any[] = [];
  options_emitidas: Object = {};
  grafica_emitidas: Object[] = [];

  total_graficas:number = 0;
  id_filtro:number = 0;

  catalogo_area_operativa:any[] = [];
  
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

  tipo_notificacion:any[] = ['PERSONAL', 'POR CORREO CERTIFICADO'];
  procedimiento_notificacion:any[] = ['NOTIFICACIÓN', "CUMPLIMIENTO CITATORIO", "INSTRUCTIVO"];
  emitidas:any[] = ['NOTIFICACIONES EMITIDAS'];
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
        this.title.setTitle("Reporte Notificación");
    }

  listar():void{
    this.cargando = true;
    
    this.tabla_area_operativa = [];
    this.grafica_area_operativa = [];
    this.options_area_operativa = {};

    this.tabla_tipo_notificacion = [];
    this.grafica_tipo_notificacion = [];
    this.options_tipo_notificacion = {};

    this.tabla_procedimiento_notificacion = [];
    this.options_procedimiento_notificacion = {};
    this.grafica_procedimiento_notificacion = [];

    this.tabla_trabajador = [];
    this.options_trabajador = {};
    this.grafica_trabajador = [];

    this.tabla_emitidas = [];
    this.options_emitidas = {};
    this.grafica_emitidas = [];

    
    this.total_graficas = 0;

    this.tamano = (document.body.offsetWidth) * 0.70;
    this.seguimientoService.lista_notificacion(this.id_filtro).subscribe(
        response => {
          

          let i = 0;
          this.tabla_area_operativa = response.Area_Operativa;
          this.tabla_trabajador = response.Trabajador;
          

          
          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Tipo_Notificacion.length; index++) {
                  var arreglo:any = response.Tipo_Notificacion[index];
                  if((arreglo.id_tipo_notificacion - 1) == i)
                  {
                        var datos = response.Tipo_Notificacion[index];
                        var serie = {name: this.tipo_notificacion[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                        var data_table = {descripcion: this.tipo_notificacion[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                        this.tabla_tipo_notificacion.push(data_table);
                        bandera++;
                  }
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.tipo_notificacion[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_tipo_notificacion.push(data_table);
                var serie = {name: this.tipo_notificacion[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_tipo_notificacion.push(serie);
              i++;
          }while(i< this.tipo_notificacion.length);

          
          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Procedimiento_Notificacion.length; index++) {
                  var arreglo:any = response.Procedimiento_Notificacion[index];
                  if((arreglo.id_procedimiento_notificacion - 1) == i)
                  {
                        var datos = response.Procedimiento_Notificacion[index];
                        var serie = {name: this.procedimiento_notificacion[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                        var data_table = {descripcion: this.procedimiento_notificacion[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                        this.tabla_procedimiento_notificacion.push(data_table);
                        bandera++;
                  }
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.procedimiento_notificacion[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_procedimiento_notificacion.push(data_table);
                var serie = {name: this.procedimiento_notificacion[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_procedimiento_notificacion.push(serie);
              i++;
          }while(i< this.procedimiento_notificacion.length);

          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Notificacion_Emitida.length; index++) {
                  var arreglo:any = response.Notificacion_Emitida[index];
                  
                      var datos = response.Notificacion_Emitida[index];
                      var serie = {name: this.emitidas[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.emitidas[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_emitidas.push(data_table);
                      bandera++;
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.emitidas[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_emitidas.push(data_table);
                var serie = {name: this.emitidas[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_emitidas.push(serie);
              i++;
          }while(i< this.emitidas.length);

  
            this.options_area_operativa = this.graficar(this.tamano, 'ÁREA OPERATIVA', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.carga_grafica_catalogo(response.Area_Operativa));
            this.options_tipo_notificacion = this.graficar(this.tamano, 'TIPO DE NOTIFICACIÓN', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.grafica_tipo_notificacion);
            this.options_procedimiento_notificacion = this.graficar(this.tamano, 'PROCEDIMIENTO DE NOTIFICACIÓN', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.grafica_procedimiento_notificacion);
            this.options_trabajador = this.graficar(this.tamano, 'NOTIFICADOR', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.carga_grafica_catalogo(response.Trabajador));
            this.options_emitidas = this.graficar(this.tamano, 'NOTIFICACIONES EMITIDAS', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.grafica_emitidas);
            
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
            this.catalogo_area_operativa = response.AreaOperativa;
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

  carga_grafica_catalogo(obj:any):any{
      let grafica: any[] = [];
      for(let i = 0; i < obj.length; i++)
      {
          var datos = obj[i];
          var serie = {name: obj[i].descripcion, data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
          grafica.push(serie);
      }

      return grafica;
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
