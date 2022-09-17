import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

export interface CanComponentDeactivate {
    canDeactivate(
        currentRoute?: ActivatedRouteSnapshot,
        currentState?: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
    providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    private _pageDataChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    canDeactivate(
        component?: CanComponentDeactivate,
        currentRoute?: ActivatedRouteSnapshot,
        currentState?: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate ? component.canDeactivate(currentRoute, currentState, nextState) : true;
    }

    get pageDataChanged$(): Observable<boolean> {
        return this._pageDataChanged$.asObservable();
    }

    setPageDataChanged(user: boolean) {
        this._pageDataChanged$.next(user);
    }

    get isPageDataChanged(): boolean {
        return this._pageDataChanged$.getValue();
    }
}
