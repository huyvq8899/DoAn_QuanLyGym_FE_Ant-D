import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    private subjectNotification = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    changeEmittedNotification$ = this.subjectNotification.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
    // emitChangeNotification(change: any) {
    //     this.subjectNotification.next(change);
    // }
}
