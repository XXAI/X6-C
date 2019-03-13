import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Denuncia } from './denuncia';

@Injectable()
export class DenunciaService {
  
  static readonly URL: string = "denuncia";

  constructor(private http: Http, private router:Router, private jwtHelper: JwtHelper ) { }


  carga_catalogos(): Observable<any>{
		return this.get('catalogo-estados',null,{}).map( (response: Response) => response.json().data);
  }
  
  carga_municipio(idEstado:number): Observable<any>{
    return this.get('catalogo-municipio',null,{idEntidad: idEstado}).map( (response: Response) => response.json().data);
  }

  carga_localidad(datos:any): Observable<any>{
    console.log(datos);
    return this.get('catalogo-localidad',null,{idEntidad: datos.entidad, idMunicipio: datos.municipio}).map( (response: Response) => response.json().data);
  }

  nueva_denuncia(denuncia: Denuncia): Observable<Denuncia> {
    return this.post(DenunciaService.URL,denuncia).map( (response: Response) => response.json().data) as Observable<Denuncia>;
  }
  
  seguimiento_denuncia(form: any): Observable<any> {
    return this.get(DenunciaService.URL,form.folio).map( (response: Response) => response.json().data) as Observable<any>;
  }

  get(url:string, id:any = null, params: any = null ):Observable<any>{
    
    var data = this.request('get', url, id, params);
    if( id != null ){
      return data as Observable<any>;
    } else {
      return data as Observable<any[]>;
    }
    
  }

  post(url:string, params: any = null):Observable<any>{

    var data = this.request('post', url, null, params);
    return data as Observable<any>;
    
  }

  put(url:string,id:any = null, params: any = null):Observable<any>{

    var data = this.request('put', url, id, params);
    return data as Observable<any>;
    
  }

  delete(url:string,id:any = null, params: any = null):Observable<any>{

    var data = this.request('delete', url, id);
    return data as Observable<any>;
    
  }

  private request(method: string, url: string,  id:any = null, params: any = {} ):Observable<any>{
    var headersJson = {'Content-Type': 'application/json'};
    var headers = new Headers(headersJson);
    
    var data = new Observable(observer => {

      if (method == 'get'){
        let urlSearchParams = new URLSearchParams()
        if(params  != null){
          for (var key in params) {
            if (params.hasOwnProperty(key)){
              urlSearchParams.set(key, params[key]);
             }
            
          }
        }
        if (id == null){                 
          this.http.get(`${environment.API_URL}/${url}`,{ headers: headers, search: urlSearchParams })
          .subscribe( 
            data => {
              observer.next(data)
            },
            error => {observer.error(error)}
          );
        } else {          
          this.http.get(`${environment.API_URL}/${url}/${id}`,{ headers: headers, search: {ID:'UNO'}  })
            .subscribe( 
              data => {
                observer.next(data)
              },
              error => {observer.error(error)}
            );
          }
      }
      

      if (method == 'post' ){
        this.http.post(`${environment.API_URL}/${url}`,params,{ headers: headers })
          .subscribe( 
            data => {
              observer.next(data)
            },
            error => {observer.error(error)}
          );
      }

      if (method == 'put' && id != null){
        this.http.put(`${environment.API_URL}/${url}/${id}`,params,{ headers: headers })
          .subscribe( 
            data => {
              observer.next(data)
            },
            error => {observer.error(error)}
          );
      }

      if (method == 'delete' && id != null){
        this.http.delete(`${environment.API_URL}/${url}/${id}`,{ headers: headers })
          .subscribe( 
            data => {
              observer.next(data)
            },
            error => {observer.error(error)}
          );
      }
    });
    return data ;
  }
  
  

}
