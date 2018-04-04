import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Rol }       from '../../roles/rol';


@Component({
  selector: 'panel-control-usuarios-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  @Input() roles: Rol[];
  @Input() temas: any[];
  @Input() jurisdiccion: any[];
  @Input() usuario:FormGroup;

  @Input()  respuestaRequerida:boolean;
  @Input()  usuarioRepetido:boolean;
  @Input()  usuarioInvalido:boolean;
  @Input()  cargando: boolean;
  @Input()  cargandoRoles: boolean;
  @Input()  cargandoMedicos: boolean;
  @Input()  mostrarCambiarPassword:boolean;

  @Output() onEnviar = new EventEmitter<void>();
  @Output() onRegresar = new EventEmitter<void>();
  @Output() onToggleCambiarPassword = new EventEmitter<void>();
  @Output() onCargarRoles = new EventEmitter<void>();
  @Output() onCargarMedicos = new EventEmitter<void>();

  // # Esto es solo para listar las unidades medicas que ya estan relacionadas
  // al usuario, en el modulo de edicion
  @Input() temasEdicion = null;

  tab:number = 1;
  temasAgregados: any[] = [];
  temasAgragadas: string[] = [];
  unidadMedicaSeleccionada = null;



  idsAlmacenesSeleccionados: string[] = [];

  /**
   * Método que inicializa y obtiene valores para el funcionamiento del componente.
   */
  ngOnInit() {
    
    //var ums:FormArray = this.usuario.get('unidades_medicas') as FormArray;
    //var almacenes:FormArray = this.usuario.get('almacenes') as FormArray;
    console.log(this.usuario.get('jurisdiccion_id'))
    //this.usuario.get('jurisdiccion_id');


    /*this.cluesAgregadas = ums.value;

    this.idsAlmacenesSeleccionados = almacenes.value;*/

    
  }

  enviar() {
    this.onEnviar.emit();
  }
  cargarRoles(){
     this.onCargarRoles.emit();
  }
  cargarMedicos(){
    this.onCargarMedicos.emit();
 }

  regresar() {
    this.onRegresar.emit();
  }

  toggleCambiarPassword() {
    this.onToggleCambiarPassword.emit();
  }



  agregarTema(tema){
    let ban:number = 0;
    for(var i in this.temas){
      
      if(this.temas[i].id == tema){
        for(var j in this.temasAgregados){
          if(this.temasAgregados[j].id == tema){
            ban++;
          }

        }
        if(ban == 0)
        {
          this.temasAgregados.push(this.temas[i]);
          this.temasAgragadas.push(tema);
          this.usuario.controls['temas'].setValue(this.temasAgragadas);  
        }
        //this.temasAgregados.push(this.temas[i]);
        //this.cluesAgregadas.push(clues);
        //this.usuario.controls['temas'].setValue(tema);
      }
    }
    
  }

  eliminarTema(event,item,index){
    event.preventDefault();
    event.stopPropagation();
  }

  toggleAlmacen(item){
    var bandera = false;
    for(var i = 0; i < this.idsAlmacenesSeleccionados.length; i++){
      if(this.idsAlmacenesSeleccionados[i]== item.id){
        this.idsAlmacenesSeleccionados.splice(i,1);
        item.seleccionado = false;
        bandera = true;
        break;
      }
    }
    if(!bandera) {
      this.idsAlmacenesSeleccionados.push(item.id)
      item.seleccionado = true;
    }

    this.usuario.controls['almacenes'].setValue(this.idsAlmacenesSeleccionados);

  }





}
