import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {


  isExpanded: boolean = false;
  smallView: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isDarkMode: boolean= false;

  
  constructor(private observer: BreakpointObserver,   private router: Router, private cd: ChangeDetectorRef) {
    
  }

  

  toggleNav(){
    if(!this.smallView){
      this.isExpanded = !this.isExpanded;

      return;
    }
    if(this.sidenav.opened){
      this.sidenav.close();
    }else{
      this.sidenav.open();
    }

  }

  ngOnInit() {
  }

  


  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
       
      if (res.matches) {
        this.smallView = true;
        this.sidenav.close();
        this.isExpanded = true;
        this.sidenav.mode = "over";
      } else{
        this.smallView = false;
        this.isExpanded = false;
        this.sidenav.open();
        this.sidenav.mode = "side";
      }
      
      });
  }

	
  public GoTo(ruta: string): void {
    this.router.navigate([ruta]);
  }  
  
}