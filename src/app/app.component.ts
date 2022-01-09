import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MeService } from './me.service';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Website';
  nav_open: boolean = false;

  nav_pinned: Observable<boolean>;
  nav_type: Observable<"over" | "side">;

  currentPositionTitle: Observable<string>;
  legalName: Observable<string>;

  constructor(
    private bpo: BreakpointObserver,
    private meService: MeService,
  ) {
    this.currentPositionTitle = this.meService.getCurrentTitle();
    this.legalName = this.meService.legalName();
    this.nav_type = this.bpo.observe('(max-width: 800px)').pipe(
      map((match) => {
        return (match.matches ? "over" : "side") as "over" | "side";
      }),
      shareReplay(1),
    );
    this.nav_pinned = this.bpo.observe('(max-width: 1300px)').pipe(
      map((match) => {
        return !match.matches
      }),
      tap((isPinned) => {
        if (isPinned) {
          this.nav_open = false;
        }
      }),
      shareReplay(1),
    );
  }

}
