import { AfterViewInit, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MeService } from './me.service';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SidenavHook } from './sidenav-hook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'My Website';
  //nav_open: boolean = false;

  navOpen: boolean = false;
  navOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

    this.navOpen$.subscribe((open) => {
      this.navOpen = open;
    })

    let sidenavOpenSubscription: Subscription | undefined;
    combineLatest([
      this.sidenavHook.sidenavInstance,
      this.navPinned$,
      this.navType$,
      this.navOpen$,
    ]).subscribe(([sidenav, pinned, type, open]) => {

      sidenavOpenSubscription?.unsubscribe();

      console.log([
        sidenav,
        pinned,
        type,
        open
      ]);

      if (pinned) {
        sidenav?.open('program');
      } else if (open) {
        this.navOpen$.next(false);
      }

      if (sidenav) {

        sidenavOpenSubscription = sidenav.openedChange.subscribe((open) => {
          this.navOpen = open;
        })

        sidenav.mode = type;

        if (!pinned) {
          if (open) {
            sidenav.open();
          } else {
            sidenav.close();
          }
        }

      }

    });
  }

  toggleNav() {
    this.navOpen$.next(!this.navOpen);
  }

}
