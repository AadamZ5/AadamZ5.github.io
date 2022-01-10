import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { MeService } from '../me.service';
import { SidenavHook } from '../sidenav-hook';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements AfterViewInit {

  title = 'My Website';
  nav_open: boolean = false;

  currentPositionTitle: Observable<string>;
  legalName: Observable<string>;

  @ViewChild('rootSidenav')
  rootSidenav: MatSidenav | undefined;

  constructor(
    private bpo: BreakpointObserver,
    private meService: MeService,
    private sidenavHook: SidenavHook,
  ) {
    this.currentPositionTitle = this.meService.getCurrentTitle();
    this.legalName = this.meService.legalName();
  }

  ngAfterViewInit(): void {
    console.log(this.rootSidenav)
    if (!this.rootSidenav) {
      this.sidenavHook.hookSidenav(null);
    } else {
      this.sidenavHook.hookSidenav(this.rootSidenav);
    }
  }

}
