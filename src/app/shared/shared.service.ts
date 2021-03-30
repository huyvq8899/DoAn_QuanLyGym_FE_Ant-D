import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
    isAddNew = new BehaviorSubject<boolean>(true);
    currentAddNew = this.isAddNew.asObservable();

    changeAddNew(message) {
        this.isAddNew.next(message);
    }

    isView = new BehaviorSubject<boolean>(true);
    currentView = this.isView.asObservable();
    changeView(message) {
        this.isView.next(message);
    }

    isChiTiet = new BehaviorSubject<boolean>(true);
    currentChiTiet = this.isChiTiet.asObservable();
    changeChiTiet(message) {
        this.isChiTiet.next(message);
    }

    data = new BehaviorSubject<any>({});
    currentData = this.data.asObservable();
    sendData(pushdata) {
        this.data.next(pushdata);
    }

    stt = new BehaviorSubject<number>(0);
    currentStt = this.stt.asObservable();
    changeStt(stt) {
        this.stt.next(stt);
    }
}
