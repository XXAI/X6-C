import { Component, OnInit } from '@angular/core';
import { HttpModule,Http }   from '@angular/http';
import { Title } from '@angular/platform-browser';

import { SeguimientoService } from '../seguimiento.service';
import { Mensaje } from '../../../mensaje';

@Component({
  selector: 'app-resolucion',
  templateUrl: './resolucion.component.html',
  styleUrls: ['./resolucion.component.css']
})
export class ResolucionComponent implements OnInit {

  
  tabla_area_operativa: any[] = [];
  options_area_operativa: Object = {};
  grafica_area_operativa: Object[] = [];

  tabla_sancion: any[] = [];
  options_sancion: Object = {};
  grafica_sancion: Object[] = [];

  tabla_recurso: any[] = [];
  options_recurso: Object = {};
  grafica_recurso: Object[] = [];

  tabla_trabajador: any[] = [];
  options_trabajador: Object = {};
  grafica_trabajador: Object[] = [];

  tabla_giro: any[] = [];
  options_giro: Object = {};
  grafica_giro: Object[] = [];

  tabla_estatus: any[] = [];
  options_estatus: Object = {};
  grafica_estatus: Object[] = [];

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

  sancion:any[] = ['AMONESTACION', 'MULTA', 'CLAUSURA', 'ARRESTO'];
  recurso:any[] = ['SI', 'NO', 'RECHAZO'];
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
        this.title.setTitle("Reporte Resolución Administrativa");
    }

  listar():void{
    this.cargando = true;
    
    this.tabla_area_operativa = [];
    this.grafica_area_operativa = [];
    this.options_area_operativa = {};

    this.tabla_sancion = [];
    this.grafica_sancion = [];
    this.options_sancion = {};

    this.tabla_recurso = [];
    this.options_recurso = {};
    this.grafica_recurso = [];

    this.tabla_trabajador = [];
    this.options_trabajador = {};
    this.grafica_trabajador = [];

    this.tabla_giro = [];
    this.options_giro = {};
    this.grafica_giro = [];

    this.tabla_estatus = [];
    this.options_estatus = {};
    this.grafica_estatus = [];
    
    this.total_graficas = 0;

    this.tamano = (document.body.offsetWidth) * 0.70;
    this.seguimientoService.lista_resolucion(this.id_filtro).subscribe(
        response => {
          

          let i = 0;
          this.tabla_area_operativa = response.Area_Operativa;
          this.tabla_trabajador = response.Trabajador;
          this.tabla_giro = response.Giro;
          this.tabla_estatus = response.Estatus;

          
          i = 0;
          do
          {
              let bandera:number = 0;
              for (let index = 0; index < response.Sancion.length; index++) {
                  var arreglo:any = response.Sancion[index];
                  if((arreglo.id_sancion - 1) == i)
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
              for (let index = 0; index < response.Recurso.length; index++) {
                  var arreglo:any = response.Recurso[index];
                  if((arreglo.id_recurso_inconformidad - 1) == i)
                  {
                        var datos = response.Recurso[index];
                        var serie = {name: this.recurso[i] , data:[datos.ENERO, datos.FEBRERO, datos.MARZO, datos.ABRIL, datos.MAYO, datos.JUNIO, datos.JULIO, datos.AGOSTO, datos.SEPTIEMBRE, datos.OCTUBRE, datos.NOVIEMBRE, datos.DICIEMBRE]};
                        var data_table = {descripcion: this.recurso[i], ENERO:datos.ENERO, FEBRERO: datos.FEBRERO, MARZO: datos.MARZO, ABRIL: datos.ABRIL, MAYO: datos.MAYO, JUNIO: datos.JUNIO, JULIO: datos.JULIO, AGOSTO: datos.AGOSTO, SEPTIEMBRE: datos.SEPTIEMBRE, OCTUBRE: datos.OCTUBRE, NOVIEMBRE: datos.NOVIEMBRE, DICIEMBRE: datos.DICIEMBRE, TOTAL: datos.TOTAL  };
                        this.tabla_recurso.push(data_table);
                        bandera++;
                  }
              }
              if(bandera == 0)
              {
                var datos:any =  this.registros_ceros; 
                var data_table = {descripcion: this.recurso[i], ENERO: datos[0], FEBRERO: datos[1], MARZO: datos[2], ABRIL: datos[3], MAYO: datos[4], JUNIO: datos[5], JULIO: datos[6], AGOSTO: datos[7], SEPTIEMBRE: datos[8], OCTUBRE: datos[9], NOVIEMBRE: datos[10], DICIEMBRE: datos[11], TOTAL: datos[12] };
                this.tabla_recurso.push(data_table);
                var serie = {name: this.recurso[i] , data:this.registros_grafica_ceros};        
              }

              this.grafica_recurso.push(serie);
              i++;
          }while(i< this.recurso.length);

  
            this.options_area_operativa = this.graficar(this.tamano, 'ÁREA OPERATIVA', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.carga_grafica_catalogo(response.Area_Operativa));
            this.options_sancion = this.graficar(this.tamano, 'SANCIÓN ADMINISTRATIVA', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.grafica_sancion);
            this.options_recurso = this.graficar(this.tamano, 'RECURSO INCONFORMIDAD', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.grafica_recurso);
            this.options_trabajador = this.graficar(this.tamano, 'RESOLUTOR', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.carga_grafica_catalogo(response.Trabajador));
            this.options_giro = this.graficar(this.tamano, 'GIRO', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.carga_grafica_catalogo(response.Giro));
            this.options_estatus = this.graficar(this.tamano, 'ESTATUS', 'ÁREA OPERATIVA: '+response.Titulo_Filtro, this.meses, this.carga_grafica_catalogo(response.Estatus));
            
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
