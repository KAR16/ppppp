import { HtmlAstPath } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rectilineo',
  templateUrl: './rectilineo.component.html',
  styleUrls: ['./rectilineo.component.css']
})
export class RectilineoComponent implements OnInit {

  showDataInputs : boolean = false;
  showError : {error: boolean; errorMessage: string} = {
    error: false, 
    errorMessage: ""
  };
  showError2 : {error: boolean; errorMessage: string} = {
    error: false, 
    errorMessage: ""
  };
  showResultado : boolean = false;

  resultadoImagen : string = '';
  resultadoDespeje : string = '';
  resultadoRespuesta : string = '0';

  listaEcuaciones : Array<{
    calcular: string;
    necesarios: Array<string>;
    funcion: Function;
    original : string;
    despeje: string;
  }> = [
    {
      calcular: "VF",
      necesarios: ["VI","A","T"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => VI + A * T,
      original: '../../assets/f1.png',
      despeje: 'VF = VI + A*T'
    },
    {
      calcular: "VI",
      necesarios: ["VF","A","T"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => VF - A * T,
      original: '../../assets/f1.png',
      despeje: 'VI = VF - A*T'
    },
    {
      calcular: "A",
      necesarios: ["VF","VI","T"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (VF - VI) / T,
      original: '../../assets/f1.png',
      despeje: 'A = (VF - VI) / T'
    },
    {
      calcular: "T",
      necesarios: ["VF","VI","A"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (VF - VI) / A,
      original: '../../assets/f1.png',
      despeje: 'T = (VF - VI) / A'
    },
    {
      calcular: "D",
      necesarios: ["VI","VF","T"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => ((VI + VF) / 2) * T,
      original: '../../assets/f2.png',
      despeje: 'D = ((VI + VF) / 2) * T'
    },
    {
      calcular: "T",
      necesarios: ["VI","VF","D"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (2 * D) / (VI + VF),
      original: '../../assets/f2.png',
      despeje: 'T = (2 * D) / (VI + VF)'
    },
    {
      calcular: "VI",
      necesarios: ["T","VF","D"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => ((2 * D) / T ) - VF,
      original: '../../assets/f2.png',
      despeje: 'VI = ((2 * D) / T ) - VF'
    },
    {
      calcular: "VF",
      necesarios: ["T","VI","D"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => ((2 * D) / T ) - VI,
      original: '../../assets/f2.png',
      despeje: 'VF = ((2 * D) / T ) - VI'
    },
    {
      calcular: "D",
      necesarios: ["VI","T","A"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (VI * T) + ((A * T ** 2) / 2),
      original: '../../assets/f3.png',
      despeje: 'D = (VI * T) + ((a * T ^ 2) / 2)'
    },
    {
      calcular: "VI",
      necesarios: ["D","T","A"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (D - ((A * T ** 2) / 2)) / T,
      original: '../../assets/f3.png',
      despeje: 'VI = (D - (A T^2) / 2) / T'
    },
    {
      calcular: "A",
      necesarios: ["D","VI","T"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (D - 2 * VI * T ) / (T ** 2),
      original: '../../assets/f3.png',
      despeje: 'A = (D - 2 VI T ) / (T ^ 2)'
    },
    {
      calcular: "VF",
      necesarios: ["VI","A","D"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (VI ** 2 + (2 * A * D)) ** (1 / 2),
      original: '../../assets/f4.png',
      despeje: 'VF = (VI^2 + (2 A D)) ^ (1 / 2)'
    },
    {
      calcular: "VI",
      necesarios: ["VF","A","D"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => (VF ** 2 + (2 * A * D)) ** (1 / 2),
      original: '../../assets/f4.png',
      despeje: 'VI = (VF^2 + (2 A D)) ^ (1 / 2)'
    },
    {
      calcular: "A",
      necesarios: ["VF","VI","D"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => ((VF ** 2) - (VI ** 2)) / ( 2 * D),
      original: '../../assets/f4.png',
      despeje: 'A = (VF^2 - VI^2) / ( 2 D)'
    },
    {
      calcular: "D",
      necesarios: ["VF","VI","A"],
      funcion: (VI:number, VF:number, A:number, T:number, D:number) => ((VF ** 2) - (VI ** 2)) / ( 2 * A),
      original: '../../assets/f4.png',
      despeje: 'D = (VF^2 - VI^2) / ( 2 A)'
    },
  ];

  lasQueTengo : {
    VF: boolean;
    VI: boolean;
    A: boolean;
    T: boolean;
    D: boolean;
  } = {
    VF: false,
    VI: false,
    A: false,
    T: false,
    D: false
  };

  laQueBusco: {
    VF: boolean;
    VI: boolean;
    A: boolean;
    T: boolean;
    D: boolean;
  } = {
    VF: false,
    VI: false,
    A: false,
    T: false,
    D: false
  };

  constructor() { }

  ngOnInit(): void {
  }


  todoNegativo(){
    this.laQueBusco.VI = false;
    this.laQueBusco.VF = false;
    this.laQueBusco.A = false;
    this.laQueBusco.T = false;
    this.laQueBusco.D = false;
    return true;
  }

  pedirDatos(){
    this.showError.error = false;
    this.showError.errorMessage = "";
    this.showDataInputs = false;
    if(!this.lasQueTengo.VI && !this.lasQueTengo.VF 
      && !this.lasQueTengo.A && !this.lasQueTengo.D
      && !this.lasQueTengo.T){
        this.showError.error = true;
        this.showError.errorMessage = "[ERROR]: Se debe de tener al menos un dato.";
        return;
      }
    if(!this.laQueBusco.VI && !this.laQueBusco.VF 
      && !this.laQueBusco.A && !this.laQueBusco.D
      && !this.laQueBusco.T){
        this.showError.error = true;
        this.showError.errorMessage = "[ERROR]: Se debe especificar el dato a buscar.";
        return;
      }
    this.showDataInputs = true;
  }

  calcular(){
    this.showError2.errorMessage = '';
    this.showError2.error = false;
    //definir que se necesita
    let queBusco = this.laQueBusco.VI ? "VI" : 
                    this.laQueBusco.VF ? "VF" : 
                    this.laQueBusco.A ? "A" : 
                    this.laQueBusco.T ? "T" : "D"; 
    let queTengo = [];
    if(this.lasQueTengo.VI) queTengo.push("VI");
    if(this.lasQueTengo.VF) queTengo.push("VF");
    if(this.lasQueTengo.A) queTengo.push("A");
    if(this.lasQueTengo.T) queTengo.push("T");
    if(this.lasQueTengo.D) queTengo.push("D");
     

    //buscar la funcion que se utilizara
    let encontrado: {
      calcular: string;
      necesarios: Array<string>;
      funcion: Function;
      original : string;
      despeje: string;
    };
    let seEncontro : boolean = false;
    for(let i = 0; i < this.listaEcuaciones.length; i++){
      if(queBusco == this.listaEcuaciones[i].calcular 
        && queTengo.sort().join(',') == this.listaEcuaciones[i].necesarios.sort().join(',')){
          encontrado = this.listaEcuaciones[i];
          seEncontro = true;
          break;
        }
    }

    let auxVI = document.getElementById("inputVI");
    let auxVF = document.getElementById("inputVF");
    let auxA = document.getElementById("inputA");
    let auxT = document.getElementById("inputT");
    let auxD = document.getElementById("inputD");
    if(!seEncontro) {
      this.showError2.error = true;
      this.showError2.errorMessage = "[ERROR]: No se encontro formula con esos parametros.";
      return;
    }
    let VI = (document.getElementById("inputVI")) != null ? parseFloat((<HTMLInputElement>document.getElementById("inputVI")).value) : 0;
    let VF = (document.getElementById("inputVF")) != null ? parseFloat((<HTMLInputElement>document.getElementById("inputVF")).value) : 0;
    let A = (document.getElementById("inputA")) != null ?parseFloat((<HTMLInputElement>document.getElementById("inputA")).value) : 0;
    let T = (document.getElementById("inputT")) != null ?parseFloat((<HTMLInputElement>document.getElementById("inputT")).value) : 0;
    let D = (document.getElementById("inputD")) != null ?parseFloat((<HTMLInputElement>document.getElementById("inputD")).value) : 0;

    this.resultadoImagen = encontrado!.original;
    this.resultadoDespeje = encontrado!.despeje;
    this.resultadoRespuesta = encontrado!.funcion(VI,VF,A,T,D).toString();

    this.showResultado = true;
  }

  cancelar(){
    this.showDataInputs = false;
    this.showResultado = false;
    this.showError2.error = false;
    this.showError.error = false;
    this.showError.errorMessage = '';
    this.showError2.errorMessage = '';
  }

}
