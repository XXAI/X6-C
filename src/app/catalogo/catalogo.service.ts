import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../jwt-request.service';
import { Tema } from './tema';

@Injectable()
export class CatalogoService {

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  lista_tema(pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get('tema',null,{page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  buscar(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get('tema',null,{q: term, page: pagina, per_page: resultados_por_pagina, jurisdiccion: obj.id_jurisdiccion, tipo_programacion: obj.id_tipo}).map( (response: Response) => response.json().data);
	}

  buscar_detalle(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get('tema',null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

  elimina_tema(id:any): Observable<any>{
    return this.jwtRequest.delete('tema',id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }

  carga_catalogos(): Observable<any>{
		return this.jwtRequest.get('catalogos-programacion',null,{}).map( (response: Response) => response.json().data);
  }

  agregar_tema(tema: Tema): Observable<Tema> {
    return this.jwtRequest.post('tema',tema).map( (response: Response) => response.json().data) as Observable<Tema>;
  }

  editar_tema(id:any, tema: Tema): Observable<Tema> {
    return this.jwtRequest.put('tema',id, tema).map( (response: Response) => response.json().data) as Observable<Tema>;
  }

}
