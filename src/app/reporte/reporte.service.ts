import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../jwt-request.service';

@Injectable()
export class ReporteService {

  static readonly URL: string = "reporte-proyecto";
  static readonly URL_AMBITO: string = "reporte-ambito-riesgo";
  static readonly URL_EJECUTIVO: string = "reporte-ejecutivo";
  static readonly URL_JURISDICCION: string = "reporte-jurisdiccional";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  lista(id_tema:number): Observable<any>{
		return this.jwtRequest.get(ReporteService.URL,null,{tema: id_tema}).map( (response: Response) => response.json().data);
  }

  lista_ambito(id_ambito:number): Observable<any>{
		return this.jwtRequest.get(ReporteService.URL_AMBITO,null,{ambito: id_ambito}).map( (response: Response) => response.json().data);
  }

  lista_ejecutivo(id_ejecutivo:number): Observable<any>{
		return this.jwtRequest.get(ReporteService.URL_EJECUTIVO,null,{ejecutivo: id_ejecutivo}).map( (response: Response) => response.json().data);
  }

  lista_jurisdiccion(id_tema:number): Observable<any>{
		return this.jwtRequest.get(ReporteService.URL_JURISDICCION,null,{tema: id_tema}).map( (response: Response) => response.json().data);
  }

  carga_catalogos(): Observable<any>{
		return this.jwtRequest.get('catalogos-programacion',null,{}).map( (response: Response) => response.json().data);
  }

}
