import { Provider } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav"
import { BehaviorSubject, Observable, Subscription } from "rxjs"

export class SidenavHook {

    private _sidenavOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    get sidenavOpen$(): Observable<boolean> {
        return this._sidenavOpen$.asObservable();
    }

    private _sidenavInstance: BehaviorSubject<MatSidenav | null> = new BehaviorSubject<MatSidenav | null>(null);
    get sidenavInstance$(): Observable<MatSidenav | null> {
        return this._sidenavInstance.asObservable();
    }

    constructor() {
        let sidenavSubscription: Subscription | undefined;
        this.sidenavInstance$.subscribe((sidenav) => {
            sidenavSubscription?.unsubscribe();
            sidenavSubscription = undefined;
            if (sidenav) {
                sidenavSubscription = sidenav.openedChange.subscribe((open) => {
                    this._sidenavOpen$.next(open);
                });
            } else {
                this._sidenavOpen$.next(false);
            }
        })
    }

    hookSidenav(sidenavInstance: MatSidenav | null) {
        this._sidenavInstance.next(sidenavInstance);
    }

}

export const SIDENAV_HOOK_PROVIDER: Provider = {
    provide: SidenavHook,
    useValue: new SidenavHook(),
};
