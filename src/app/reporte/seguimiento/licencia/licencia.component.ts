import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';

import { SeguimientoService } from '../seguimiento.service';
import { Mensaje } from '../../../mensaje';
@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  styleUrls: ['./licencia.component.css']
})
export class LicenciaComponent implements OnInit {

  tabla_verificacion: any[] = [];
  options_verificacion: Object = {};
  grafica_verificacion: Object[] = [];

  tabla_dictamen: any[] = [];
  options_dictamen: Object = {};
  grafica_dictamen: Object[] = [];

  tabla_estatus: any[] = [];
  options_estatus: Object = {};
  grafica_estatus: Object[] = [];

  tabla_notificacion: any[] = [];
  options_notificacion: Object = {};
  grafica_notificacion: Object[] = [];

  tabla_otorgados: any[] = [];
  options_otorgados: Object = {};
  grafica_otorgados: Object[] = [];

  tabla_solicitudes: any[] = [];
  options_solicitudes: Object = {};
  grafica_solicitudes: Object[] = [];

  tabla_giro: any[] = [];
  options_giro: Object = {};
  grafica_giro: Object[] = [];

  total_graficas:number = 0;
  id_filtro:number = 0;

  catalogo_verificacion:any[] = [];
  
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

  verificacion:any[] = ['SI', 'NO'];
  dictamen:any[] = ['APROBADO', 'NO APROBADO'];
  notificacion:any[] = ['SI', "NO"];
  otorgados:any[] = ['LICENCIAS OTORGADAS'];
  solicitudes:any[] = ['SOLICITUDES DE LICENCIAS'];
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
    
    this.tabla_verificacion = [];
    this.grafica_verificacion = [];
    this.options_verificacion = {};

    this.tabla_dictamen = [];
    this.grafica_dictamen = [];
    this.options_dictamen = {};

    this.tabla_estatus = [];
    this.options_estatus = {};
    this.grafica_estatus = [];

    this.tabla_notificacion = [];
    this.options_notificacion = {};
    this.grafica_notificacion = [];

    this.tabla_otorgados = [];
    this.options_otorgados = {};
    this.grafica_otorgados = [];

    this.tabla_solicitudes = [];
    this.options_solicitudes= {};
    this.grafica_solicitudes = [];

    this.tabla_giro = [];
    this.options_giro = {};
    this.grafica_giro = [];

    
    this.total_graficas = 0;

    this.tamano = (document.body.offsetWidth) * 0.70;
    this.seguimientoService.lista_licencia(this.id_filtro).subscribe(
        response => {
          

          let i = 0;
          this.tabla_estatus = response.Estatus;
          this.tabla_giro = response.Giro;
          

          
          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Registro_Dictamen.length; index++) {
                  var arreglo:any = response.Registro_Dictamen[index];
                  if((arreglo.id_dictamen - 1) == i)
                  {
                        var datos = response.Registro_Dictamen[index];
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
              for (let index = 0; index < response.Registro_Verificacion.length; index++) {
                  var arreglo:any = response.Registro_Verificacion[index];
                  if((arreglo.id_verificacion_sanitaria - 1) == i)
                  {
                        var datos = response.Registro_Verificacion[index];
                        var serie = {name: this.verificacion[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                        var data_table = {descripcion: this.verificacion[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                        this.tabla_verificacion.push(data_table);
                        bandera++;
                  }
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.verificacion[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_verificacion.push(data_table);
                var serie = {name: this.verificacion[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_verificacion.push(serie);
              i++;
          }while(i< this.verificacion.length);

          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Registro_Entrega.length; index++) {
                  var arreglo:any = response.Registro_Entrega[index];
                  
                      var datos = response.Registro_Entrega[index];
                      var serie = {name: this.otorgados[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.otorgados[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_otorgados.push(data_table);
                      bandera++;
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.otorgados[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_otorgados.push(data_table);
                var serie = {name: this.otorgados[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_otorgados.push(serie);
              i++;
          }while(i< this.otorgados.length);

          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Registro_Solicitud.length; index++) {
                  var arreglo:any = response.Registro_Solicitud[index];
                  
                      var datos = response.Registro_Solicitud[index];
                      var serie = {name: this.solicitudes[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.solicitudes[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_solicitudes.push(data_table);
                      bandera++;
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.solicitudes[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_solicitudes.push(data_table);
                var serie = {name: this.solicitudes[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_solicitudes.push(serie);
              i++;
          }while(i< this.solicitudes.length);


          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Registro_Notificacion.length; index++) {
                  var arreglo:any = response.Registro_Notificacion[index];
                  if((arreglo.id_notificacion - 1) == i)
                  {
                      var datos = response.Registro_Notificacion[index];
                      var serie = {name: this.notificacion[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                      var data_table = {descripcion: this.notificacion[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                      this.tabla_notificacion.push(data_table);
                      bandera++;
                  }
                  
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.notificacion[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_notificacion.push(data_table);
                var serie = {name: this.notificacion[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_notificacion.push(serie);
              i++;
          }while(i< this.notificacion.length);

  
            this.options_verificacion = this.graficar(this.tamano, 'VERIFICACIÓN SANITARIA', '', this.meses, this.grafica_verificacion);
            this.options_dictamen = this.graficar(this.tamano, 'DICTAMEN TÉCNICO', '', this.meses, this.grafica_dictamen);
            this.options_estatus = this.graficar(this.tamano, 'ESTATUS', '', this.meses, this.carga_grafica_catalogo(response.Estatus));
            this.options_giro = this.graficar(this.tamano, 'GIRO', '', this.meses, this.carga_grafica_catalogo(response.Giro));
            this.options_notificacion = this.graficar(this.tamano, 'NOTIFICACIÓN', '', this.meses, this.grafica_notificacion);
            this.options_otorgados = this.graficar(this.tamano, 'LICENCIAS OTORGADAS', '', this.meses, this.grafica_otorgados);
            this.options_solicitudes = this.graficar(this.tamano, 'SOLICITUDES DE LICENCIAS ', '', this.meses, this.grafica_solicitudes);
            
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
            this.catalogo_verificacion = response.AreaOperativa;
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
