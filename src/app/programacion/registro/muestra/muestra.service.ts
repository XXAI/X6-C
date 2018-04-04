import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../../../jwt-request.service';
import { Muestra } from './muestra';

@Injectable()
export class MuestraService {

  static readonly URL: string = "modulo-muestra";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(MuestraService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina, jurisdiccion: obj.id_jurisdiccion, tipo_programacion: obj.id_tipo}).map( (response: Response) => response.json().data);
	}

  buscar_detalle(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(MuestraService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

	lista(pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(MuestraService.URL,null,{page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }
  
  carga_catalogos(): Observable<any>{
		return this.jwtRequest.get('catalogos-programacion',null,{}).map( (response: Response) => response.json().data);
  }

}
