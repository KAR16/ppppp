import { Component, OnInit } from '@angular/core';
import { fetchQuery } from '../_Helpers/fetch';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css']
})
export class PartesComponent implements OnInit {

  expresion1 : {
    inversa: boolean;
    logaritmica: boolean;
    aritmetica: boolean;
    trigonometrica: boolean;
    exponencial: boolean;
  } ={
    inversa: true,
    logaritmica: false,
    aritmetica: false,
    trigonometrica: false,
    exponencial: false
  };

  expresion2 : {
    inversa: boolean;
    logaritmica: boolean;
    aritmetica: boolean;
    trigonometrica: boolean;
    exponencial: boolean;
  } ={
    inversa: true,
    logaritmica: false,
    aritmetica: false,
    trigonometrica: false,
    exponencial: false
  };

  u : {
    original: string;
    derivada: string;
  } = {
    original: '',
    derivada: ''
  };

  dv : {
    original: string;
    integral: string;
  } = {
    original: '',
    integral: ''
  };

  respuesta :string = '';

  constructor() { }

  ngOnInit(): void {
  }

  todoNegativo1(){
    this.expresion1 = {
      inversa: false,
      logaritmica: false,
      aritmetica: false,
      trigonometrica: false,
      exponencial: false
    };
    return true;
  }

  todoNegativo2(){
    this.expresion2 = {
      inversa: false,
      logaritmica: false,
      aritmetica: false,
      trigonometrica: false,
      exponencial: false
    };
    return true;
  }

  showResult : boolean = false;

  async calcular(){    
    let original1 = (<HTMLInputElement>document.getElementById("input1")).value;
    let original2 = (<HTMLInputElement>document.getElementById("input2")).value;
    if(original1 == null || original1 == ''){
      alert("Debe ingresar el primer termino.");
      return;
    }
    if(original2 == null || original2 == ''){
      alert("Debe ingresar el segundo termino.");
      return;
    }
    //quien es u y dv
    let nivel1 = this.expresion1.inversa 
                ? 5
                : this.expresion1.logaritmica
                ? 4
                : this.expresion1.aritmetica
                ? 3
                : this.expresion1.trigonometrica
                ? 2
                : 1; 
    let nivel2 = this.expresion2.inversa 
                ? 5
                : this.expresion2.logaritmica
                ? 4
                : this.expresion2.aritmetica
                ? 3
                : this.expresion2.trigonometrica
                ? 2
                : 1; 
    /* debugger; */
    if(nivel1 == nivel2){
      alert("Los dos terminos no pueden ser del mismo tipo.")
      return;
    }

    if(nivel1 > nivel2){
      this.u.original = original1;
      this.dv.original = original2;
    }else{
      this.u.original = original2;
      this.dv.original = original1;
    }

    

    await fetchQuery('https://newton.vercel.app/api/v2/derive/' + this.u.original, 'GET', undefined)
    .then((result:any) =>{
      this.u.derivada = result.result;
      }
    ).catch(error=>{
      alert("No se pudo calcular la derivada de " + this.u.original);
    });
    
    await fetchQuery('https://newton.vercel.app/api/v2/integrate/' + this.dv.original, 'GET', undefined)
    .then((result:any) =>{
      this.dv.integral = result.result;
      }
    ).catch(error=>{
      alert("No se pudo calcular la integral de " + this.dv.original);
    });
    
    this.respuesta = "(" + this.u.original + ") ⋅ (" + this.dv.integral + ") ∫(" + this.dv.integral + ") ⋅ (" + this.u.derivada + ")dx";
    this.showResult = true;
  }

  cancelar(){
    this.showResult = false;
    (<HTMLInputElement>document.getElementById("input1")).value = '';
    (<HTMLInputElement>document.getElementById("input2")).value = '';
  }
}
