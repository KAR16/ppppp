import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { RectilineoComponent } from './rectilineo/rectilineo.component';
import { PartesComponent } from './partes/partes.component';
import { SustitucionComponent } from './sustitucion/sustitucion.component';

const routes: Routes = [
  {
    path: '',                        
    component: HomeLayoutComponent,
    children:[
      {
        path: 'Rectilineo',
        component: RectilineoComponent  
      },
      {
        path: 'Partes',
        component: PartesComponent
      },
      {
        path: 'Sustitucion',
        component: SustitucionComponent
      }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
