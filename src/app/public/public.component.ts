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

  /**The current position title of me */
  currentPositionTitle: Observable<string>;
  /**My legal name (Observable isn't really logically necessary here at all) */
  legalName: Observable<string>;

  /**The sidenav for the public module / component */
  @ViewChild('rootSidenav')
  rootSidenav: MatSidenav | undefined;

  constructor(
    private meService: MeService,
    private sidenavHook: SidenavHook,
  ) {
    this.currentPositionTitle = this.meService.getCurrentTitle();
    this.legalName = this.meService.legalName();
  }

  ngAfterViewInit(): void {

    /**
     * This is to prevent the dreaded
     * "Expression changed after it has been checked"
     * error.
     */
    setTimeout(() => {
      if (!this.rootSidenav) {
        this.sidenavHook.hookSidenav(null);
      } else {
        this.sidenavHook.hookSidenav(this.rootSidenav);
      }
    });

  }

}
