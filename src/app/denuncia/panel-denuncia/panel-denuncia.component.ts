import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl, NgModel, ReactiveFormsModule   } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DenunciaService } from '../denuncia.service';
import { Mensaje } from '../../mensaje';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-panel-denuncia',
  templateUrl: './panel-denuncia.component.html',
  styleUrls: ['./panel-denuncia.component.css']
})
export class PanelDenunciaComponent implements OnInit {

  seguimientoModule: FormGroup;
  cargando:boolean = false;
  folio:string = "";

  verBuscarFolio:boolean = false;

  // # SECCION: Esta sección es para mostrar mensajes
  mensajeError: Mensaje = new Mensaje();
  mensajeExito: Mensaje = new Mensaje();

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private denunciaService: DenunciaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { 
    this.seguimientoModule = this.fb.group({
      folio: ['', [Validators.required]]
    });
    this.title.setTitle("Denuncias");
    this.mensajeError = new Mensaje();
    this.mensajeExito = new Mensaje();
  }

  buscarFolio():void  
  {
    this.cargando = true;
    this.denunciaService.seguimiento_denuncia(this.seguimientoModule.value).subscribe(
    respuesta => {
      
      this.cargando = false;
      console.log(respuesta);
      if(respuesta == null)
      {
        this.mensajeError = new Mensaje(true);
        this.mensajeError.texto = "NO SE ENCUENTRA SU FOLIO REGISTRADO,<br> POR FAVOR VERIFIQUE SU FOLIO";
        this.mensajeError.mostrar = true;  
      }else{
        this.router.navigateByUrl("denuncia/seguimiento/"+respuesta.codigo);
      }
    },
    error => {
      this.cargando = false;
      let e = error.json();
      this.mensajeError = new Mensaje(true);
      this.mensajeError.texto = e.error;
      this.mensajeError.mostrar = true;      
      
      try {
        let e = error.json();
        if (error.status == 401 ){
          this.mensajeError.texto = "No tiene permiso para hacer esta operación.";
        }
        // Problema de validación
        if (error.status == 409){
          this.mensajeError.texto = "Por favor verfique los campos marcados en rojo.";
          
        }
      } catch(e){
                    
        if (error.status == 500 ){
          this.mensajeError.texto = "500 (Error interno del servidor)";
        } else {
          this.mensajeError.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir.";
        }            
      }

    }
  );
  }

}
