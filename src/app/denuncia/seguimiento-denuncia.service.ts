import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../jwt-request.service';
import { Denuncia } from './denuncia';

@Injectable()
export class SeguimientoDenunciaService {

  static readonly URL: string = "seguimiento-denuncia";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(SeguimientoDenunciaService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina, jurisdiccion: obj.id_jurisdiccion, tipo_programacion: obj.id_tipo}).map( (response: Response) => response.json().data);
	}

  buscar_detalle(term: string, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(SeguimientoDenunciaService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina}).map( (response: Response) => response.json().data);
  }

	lista(pagina:number = 1, resultados_por_pagina:number =20, lista:any): Observable<any>{
    console.log(lista);
		return this.jwtRequest.get(SeguimientoDenunciaService.URL,null,{page: pagina, per_page: resultados_por_pagina, text:lista.texto_filtro, estatus: lista.estatus_filtro}).map( (response: Response) => response.json().data);
  }

  seguimiento_denuncia(form: any): Observable<any> {
    return this.jwtRequest.get(SeguimientoDenunciaService.URL,form.folio).map( (response: Response) => response.json().data) as Observable<any>;
  }

  registrar_seguimiento(id:any, seguimiento: any): Observable<any> {
    return this.jwtRequest.put(SeguimientoDenunciaService.URL,id, seguimiento).map( (response: Response) => response.json().data) as Observable<any>;
  }

  elimina(id:any): Observable<any>{
    return this.jwtRequest.delete(SeguimientoDenunciaService.URL,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var registro = jsonData as any;
        
        return registro;
      }) as Observable<any>;
  }

}
