import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../../../jwt-request.service';
import { Capacitacion } from './capacitacion';

@Injectable()
export class RegistroCapacitacionService {

  static readonly URL: string = "registro-capacitacion";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(RegistroCapacitacionService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina, jurisdiccion: obj.id_jurisdiccion, tipo_programacion: obj.id_tipo}).map( (response: Response) => response.json().data);
	}

  buscar_detalle(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(RegistroCapacitacionService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

	lista(pagina:number = 1, resultados_por_pagina:number =20, obj:any): Observable<any>{
		return this.jwtRequest.get(RegistroCapacitacionService.URL,null,{page: pagina, per_page: resultados_por_pagina, anio: obj.anio, jurisdiccion:obj.jurisdiccion, tema: obj.tema}).map( (response: Response) => response.json().data);
  }

  carga_catalogos(obj:any): Observable<any>{
		return this.jwtRequest.get('catalogos-programacion',null,{jurisdiccion: obj.jurisdiccion, tema: obj.tema}).map( (response: Response) => response.json().data);
  }

  elimina(id:any): Observable<any>{
    return this.jwtRequest.delete(RegistroCapacitacionService.URL,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var registro = jsonData as any;
        
        return registro;
      }) as Observable<any>;
  }

}
