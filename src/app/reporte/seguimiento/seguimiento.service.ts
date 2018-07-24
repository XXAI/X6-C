import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../../jwt-request.service';

@Injectable()
export class SeguimientoService {

  static readonly URL_VERIFICACION: string = "reporte-seguimiento-verificacion";
  static readonly URL_DICTAMEN: string = "reporte-seguimiento-dictamen";
  static readonly URL_RESOLUCION: string = "reporte-seguimiento-resolucion";
  static readonly URL_LICENCIA: string = "reporte-seguimiento-licencia";
  static readonly URL_NOTIFICACION: string = "reporte-seguimiento-notificacion";
  static readonly URL_AVISO: string = "reporte-seguimiento-aviso";
  static readonly URL_PUBLICIDAD: string = "reporte-seguimiento-publicidad";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  lista_verificacion(area_operativa:number): Observable<any>{
		return this.jwtRequest.get(SeguimientoService.URL_VERIFICACION,null,{id_area_operativa: area_operativa}).map( (response: Response) => response.json().data);
  }

  lista_dictamen(area_operativa:number): Observable<any>{
		return this.jwtRequest.get(SeguimientoService.URL_DICTAMEN,null,{id_area_operativa: area_operativa}).map( (response: Response) => response.json().data);
  }

  lista_resolucion(area_operativa:number): Observable<any>{
		return this.jwtRequest.get(SeguimientoService.URL_RESOLUCION,null,{id_area_operativa: area_operativa}).map( (response: Response) => response.json().data);
  }

  lista_notificacion(area_operativa:number): Observable<any>{
		return this.jwtRequest.get(SeguimientoService.URL_NOTIFICACION,null,{id_area_operativa: area_operativa}).map( (response: Response) => response.json().data);
  }

  lista_licencia(area_operativa:number): Observable<any>{
		return this.jwtRequest.get(SeguimientoService.URL_LICENCIA,null,{id_area_operativa: area_operativa}).map( (response: Response) => response.json().data);
  }

  lista_aviso(area_operativa:number): Observable<any>{
		return this.jwtRequest.get(SeguimientoService.URL_AVISO,null,{id_area_operativa: area_operativa}).map( (response: Response) => response.json().data);
  }

  lista_publicidad(area_operativa:number): Observable<any>{
		return this.jwtRequest.get(SeguimientoService.URL_PUBLICIDAD,null,{id_area_operativa: area_operativa}).map( (response: Response) => response.json().data);
  }

  catalogos_seguimiento(tipo_acta:number): Observable<any>{
		return this.jwtRequest.get('catalogos-seguimiento' ,null,{id_tipo: tipo_acta }).map( (response: Response) => response.json().data);
  }

}
