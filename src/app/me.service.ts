import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators'

/**
 * This service gets various information and titles about "me"
 * (Aadam Zocolo) from probably various APIs.
 */
@Injectable({
  providedIn: 'root'
})
export class MeService {

  constructor() {

  }

  getCurrentTitle(): Observable<string> {
    return of("Software Developer").pipe(
      shareReplay(1),
    );
  }

  /**
   * This will probably remain hard-coded, but I stick
   * with async style here for conformity and consistency.
   */
  legalName(): Observable<string> {
    return of("Aadam Zocolo").pipe(
      shareReplay(1)
    );
  }
}
