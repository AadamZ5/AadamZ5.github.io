import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Website';

  nav_open: boolean = false;
  
  constructor(private bpo: BreakpointObserver){
    
  }

  get_nav_mode(){
    return this.bpo.isMatched('(max-width: 999px)') ? "over" : "side";
  }

}
