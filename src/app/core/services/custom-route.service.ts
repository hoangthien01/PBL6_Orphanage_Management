import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomRouteService {

    // Use this observable at ngOnInit to subscribe the last url
    public currentUrl$ = new ReplaySubject<string>(1);

    constructor() {
    }
}
