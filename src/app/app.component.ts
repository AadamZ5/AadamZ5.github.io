import { AfterViewInit, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MeService } from './me.service';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';
import { SidenavHook } from './sidenav-hook';
import { defer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'My Website';
  //nav_open: boolean = false;

  navWantOpen: boolean = false;
  navWantOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  navPinned$: Observable<boolean>;
  navType$: Observable<"over" | "side">;

  currentPositionTitle: Observable<string>;
  legalName: Observable<string>;

  constructor(
    private bpo: BreakpointObserver,
    private meService: MeService,
    private sidenavHook: SidenavHook,
  ) {

    this.currentPositionTitle = this.meService.getCurrentTitle();
    this.legalName = this.meService.legalName();
    this.navType$ = this.bpo.observe('(max-width: 800px)').pipe(
      map((match) => {
        return (match.matches ? "over" : "side") as "over" | "side";
      }),
      shareReplay(1),
    );
    this.navPinned$ = this.bpo.observe('(max-width: 1300px)').pipe(
      map((match) => {
        return !match.matches
      }),
      tap((isPinned) => {
        if (isPinned) {
          //this.nav_open = false;
        }
      }),
      shareReplay(1),
    );

  }

  ngAfterViewInit(): void {

    this.navWantOpen$.subscribe((open) => {
      this.navWantOpen = open;
    })

    combineLatest([
      this.sidenavHook.sidenavInstance$,
      this.sidenavHook.sidenavOpen$,
      this.navPinned$,
      this.navType$,
      this.navWantOpen$,
    ]).subscribe(([sidenav, isOpen, pinned, type, wantOpen]) => {

      this.navWantOpen = isOpen;

      console.log([
        sidenav,
        isOpen,
        pinned,
        type,
        wantOpen
      ]);

      if (pinned) {
        sidenav?.open('program');
      }

      if (sidenav) {

        sidenav.mode = type;

        if (!pinned) {
          if (wantOpen) {
            sidenav.open();
          } else {
            sidenav.close();
          }
        }

      }

    });
  }

  toggleNav() {
    this.navWantOpen$.next(!this.navWantOpen);
  }

}
