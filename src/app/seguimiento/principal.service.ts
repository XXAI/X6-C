import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtRequestService } from '../jwt-request.service';
import { Seguimiento } from './seguimiento';

@Injectable()
export class PrincipalService {

  static readonly URL: string = "registro_verificacion";
  static readonly URL_DICTAMEN: string = "registro_dictamen";
  static readonly URL_RESOLUCION: string = "registro_resolucion";
  static readonly URL_NOTIFICACION: string = "registro_notificacion";
  static readonly URL_LICENCIA: string = "registro_licencia";
  static readonly URL_AVISO: string = "registro_aviso";
  static readonly URL_PUBLICIDAD: string = "registro_publicidad";

  constructor(private http: Http,   private jwtRequest:JwtRequestService) { }

  buscar(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina, jurisdiccion: obj.id_jurisdiccion, tipo_programacion: obj.id_tipo}).map( (response: Response) => response.json().data);
	}

  buscar_verificacion(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PrincipalService.URL,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_area_operativa: obj.areaoperativa, id_giro: obj.giro}).map( (response: Response) => response.json().data);
  }

	lista_verificacion(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  catalogos_seguimiento(tipo_acta:number): Observable<any>{
		return this.jwtRequest.get('catalogos-seguimiento' ,null,{id_tipo: tipo_acta }).map( (response: Response) => response.json().data);
  }
  
  agregar_verificacion(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.post(PrincipalService.URL,seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  ver_verificacion(id:number): Observable<any> {
    return this.jwtRequest.get(PrincipalService.URL,id).map( (response: Response) => response.json().data) as Observable<any>;
  }

  editar_verificacion(id:any, seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.put(PrincipalService.URL,id, seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  elimina_verificacion(id:any): Observable<any>{
    return this.jwtRequest.delete(PrincipalService.URL,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }

  //Dictamen
  buscar_dictamen(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PrincipalService.URL_DICTAMEN,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_area_operativa: obj.areaoperativa, id_giro: obj.giro}).map( (response: Response) => response.json().data);
  }

	lista_dictamen(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL_DICTAMEN,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  agregar_dictamen(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.post(PrincipalService.URL_DICTAMEN,seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  ver_dictamen(id:number): Observable<any> {
    return this.jwtRequest.get(PrincipalService.URL_DICTAMEN,id).map( (response: Response) => response.json().data) as Observable<any>;
  }

  editar_dictamen(id:any, seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.put(PrincipalService.URL_DICTAMEN,id, seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  elimina_dictamen(id:any): Observable<any>{
    return this.jwtRequest.delete(PrincipalService.URL_DICTAMEN,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }
  //Fin Dictamen

  //Resolucion
  buscar_resolucion(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PrincipalService.URL_RESOLUCION,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_area_operativa: obj.areaoperativa, id_giro: obj.giro}).map( (response: Response) => response.json().data);
  }

	lista_resolucion(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL_RESOLUCION,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  agregar_resolucion(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.post(PrincipalService.URL_RESOLUCION,seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  ver_resolucion(id:number): Observable<any> {
    return this.jwtRequest.get(PrincipalService.URL_RESOLUCION,id).map( (response: Response) => response.json().data) as Observable<any>;
  }

  editar_resolucion(id:any, seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.put(PrincipalService.URL_RESOLUCION,id, seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  elimina_resolucion(id:any): Observable<any>{
    return this.jwtRequest.delete(PrincipalService.URL_RESOLUCION,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }
  //Fin Resolucion

  //Notificacion
  buscar_notificacion(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PrincipalService.URL_NOTIFICACION,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_area_operativa: obj.areaoperativa, id_procedimiento_notificacion: obj.procedimiento}).map( (response: Response) => response.json().data);
  }

	lista_notificacion(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL_NOTIFICACION,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  agregar_notificacion(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.post(PrincipalService.URL_NOTIFICACION,seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  ver_notificacion(id:number): Observable<any> {
    return this.jwtRequest.get(PrincipalService.URL_NOTIFICACION,id).map( (response: Response) => response.json().data) as Observable<any>;
  }

  editar_notificacion(id:any, seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.put(PrincipalService.URL_NOTIFICACION,id, seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  elimina_notificacion(id:any): Observable<any>{
    return this.jwtRequest.delete(PrincipalService.URL_NOTIFICACION,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }
  //Fin notificacion

  //Licencia
  buscar_licencia(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PrincipalService.URL_LICENCIA,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_dictamen: obj.dictamen, id_giro: obj.giro}).map( (response: Response) => response.json().data);
  }

	lista_licencia(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL_LICENCIA,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  agregar_licencia(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.post(PrincipalService.URL_LICENCIA,seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  ver_licencia(id:number): Observable<any> {
    return this.jwtRequest.get(PrincipalService.URL_LICENCIA,id).map( (response: Response) => response.json().data) as Observable<any>;
  }

  editar_licencia(id:any, seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.put(PrincipalService.URL_LICENCIA,id, seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  elimina_licencia(id:any): Observable<any>{
    return this.jwtRequest.delete(PrincipalService.URL_LICENCIA,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }
  //FIn licencia

  //Aviso
  buscar_aviso(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PrincipalService.URL_AVISO,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_dictamen: obj.dictamen, id_giro: obj.giro}).map( (response: Response) => response.json().data);
  }

	lista_aviso(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL_AVISO,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  agregar_aviso(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.post(PrincipalService.URL_AVISO,seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  ver_aviso(id:number): Observable<any> {
    return this.jwtRequest.get(PrincipalService.URL_AVISO,id).map( (response: Response) => response.json().data) as Observable<any>;
  }

  editar_aviso(id:any, seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.put(PrincipalService.URL_AVISO,id, seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  elimina_aviso(id:any): Observable<any>{
    return this.jwtRequest.delete(PrincipalService.URL_AVISO,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }
  //FIn Aviso

  //Publicidad
  buscar_publicidad(term: string, obj:any, pagina:number = 1, resultados_por_pagina:number =20 ): Observable<any>{
    return this.jwtRequest.get(PrincipalService.URL_PUBLICIDAD,null,{q: term, page: pagina, per_page: resultados_por_pagina, id_resolucion: obj.resolucion}).map( (response: Response) => response.json().data);
  }

	lista_publicidad(pagina:number = 1, resultados_por_pagina:number =20, id_tipo_progamacion:number ): Observable<any>{
		return this.jwtRequest.get(PrincipalService.URL_PUBLICIDAD,null,{page: pagina, per_page: resultados_por_pagina, id_tipo: id_tipo_progamacion}).map( (response: Response) => response.json().data);
  }
  
  agregar_publicidad(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.post(PrincipalService.URL_PUBLICIDAD,seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  ver_publicidad(id:number): Observable<any> {
    return this.jwtRequest.get(PrincipalService.URL_PUBLICIDAD,id).map( (response: Response) => response.json().data) as Observable<any>;
  }

  editar_publicidad(id:any, seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.jwtRequest.put(PrincipalService.URL_PUBLICIDAD,id, seguimiento).map( (response: Response) => response.json().data) as Observable<Seguimiento>;
  }

  elimina_publicidad(id:any): Observable<any>{
    return this.jwtRequest.delete(PrincipalService.URL_PUBLICIDAD,id,{}).map( (response: Response) => {
       let jsonData = response.json().data;
       var programacion = jsonData as any;
        
        return programacion;
      }) as Observable<any>;
  }
  //FIn Publicidad

}
