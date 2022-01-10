import { Provider } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav"
import { BehaviorSubject, Observable } from "rxjs"

export class SidenavHook {

    private _sidenavInstance: BehaviorSubject<MatSidenav | null> = new BehaviorSubject<MatSidenav | null>(null);
    get sidenavInstance(): Observable<MatSidenav | null> {
        return this._sidenavInstance.asObservable();
    }

    hookSidenav(sidenavInstance: MatSidenav | null) {
        this._sidenavInstance.next(sidenavInstance);
    }

}

export const SIDENAV_HOOK_PROVIDER: Provider = {
    provide: SidenavHook,
    useValue: new SidenavHook(),
};
