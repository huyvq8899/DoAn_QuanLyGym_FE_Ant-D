import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    loadCountUnOpenYet = new BehaviorSubject<boolean>(false);
    loadCountUnOpenYet$ = this.loadCountUnOpenYet.asObservable();
    loadData = new BehaviorSubject<any>(null);
    loadData$ = this.loadData.asObservable();

    sendLoadCountUnOpenYet(status: boolean) {
        this.loadCountUnOpenYet.next(status);
    }

    sendLoadData(status: boolean) {
        this.loadData.next(status);
    }
}
