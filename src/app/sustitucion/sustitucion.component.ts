import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { fetchQuery } from '../_Helpers/fetch';

@Component({
  selector: 'app-sustitucion',
  templateUrl: './sustitucion.component.html',
  styleUrls: ['./sustitucion.component.css']
})
export class SustitucionComponent implements OnInit {

  
  valor1 : string = '';
  valor2 : string = '';
  showError : {error: boolean; errorMessage: string} = {
    error: false, 
    errorMessage: ""
  };

  u : string = '';
  uDerivada : string = '';
  simple: string="";
  resultadoSimple: string = "";
  resultado : string = "";

  showResultado : boolean = false;


  constructor() { }

  ngOnInit(): void {
    //this.getResultado();
  }

  async calcular(){
    this.showError = {
      error: false, 
      errorMessage: ""
    };
    let completo = (<HTMLInputElement>document.getElementById("input1")).value;
    let u = (<HTMLInputElement>document.getElementById("input2")).value;

    if(completo == '' || u == ''){
      this.showError.error = true;
      this.showError.errorMessage = 'Debe ingresar la entrada y la U propuesta.';
      return;      
    }

    let derivada = "";
    await fetchQuery('https://newton.vercel.app/api/v2/derive/' + this.limpiarTexto(u), 'GET', undefined)
    .then((result:any) =>{
      derivada = result.result;
      }
    ).catch(error=>{
      alert("No se pudo calcular la derivada de 1" );
    });

    await fetchQuery('https://newton.vercel.app/api/v2/simplify/' + this.limpiarTexto(derivada), 'GET', undefined)
    .then((result:any) =>{
      derivada = result.result;
      }
    ).catch(error=>{
      alert("No se pudo calcular la derivada de 2" );
    });


    console.log(completo.replaceAll(" ",""));
    if(!completo.replaceAll(" ","").includes(derivada.replaceAll(" ",""))) {
      this.showError.error = true;
      this.showError.errorMessage = 'No se encontro la sustitucion.';
      return;      
    }
    
    this.u = completo;
    this.uDerivada = derivada;
    //aca se hacen los reemplazos
    let nuevo = completo.replaceAll(" ", "").replaceAll(derivada.replaceAll(" ",""),"1").replaceAll(u.replaceAll(" ",""),"x");
    this.simple = nuevo.replaceAll("x","u") + "du";
    
    await fetchQuery('https://newton.vercel.app/api/v2/integrate/' + this.limpiarTexto(nuevo), 'GET', undefined)
    .then((result:any) =>{
      this.resultadoSimple = result.result.replaceAll("x","u");
      }
    ).catch(error=>{
      alert("No se pudo calcular la derivada de 3" );
    });
    
    //aca se regresa el replace
    this.resultado = this.resultadoSimple.replaceAll("u", "(" + u + ")");
    this.showResultado = true;
  }

  limpiarTexto(texto:string){
    return texto.replaceAll("+","%2B").replaceAll("/","%2F");
  }

}
