import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../jwt-request.service';
import { Programacion } from './programacion';

@Injectable()
export class MetasService {
  
  static readonly URL: string = "programacion";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(MetasService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina, jurisdiccion: obj.id_jurisdiccion, tipo_programacion: obj.id_tipo}).map( (response: Response) => response.json().data);
	}

  buscar_detalle(term: string, pagina:number = 1, resultados_por_pagina:number =20 , id_tipo_progamacion:number ): Observable<any>{
    return this.jwtRequest.get(MetasService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }

	lista(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(MetasService.URL,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  carga_catalogos(): Observable<any>{
		return this.jwtRequest.get('catalogos-programacion',null,{}).map( (response: Response) => response.json().data);
  }
  
  agregar_programacion(programacion: Programacion): Observable<Programacion> {
    return this.jwtRequest.post(MetasService.URL,programacion).map( (response: Response) => response.json().data) as Observable<Programacion>;
  }

  elimina_programacion(id:any): Observable<any>{
    return this.jwtRequest.delete(MetasService.URL,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }

  editar_programacion(id:any, programacion: Programacion): Observable<Programacion> {
    return this.jwtRequest.put(MetasService.URL,id, programacion).map( (response: Response) => response.json().data) as Observable<Programacion>;
  }
}
