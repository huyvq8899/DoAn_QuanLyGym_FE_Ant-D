import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EnvService } from '../env.service';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    public hubConnection: signalR.HubConnection;

    constructor(
        private env: EnvService,
        private authService: AuthService,
        private router: Router) { }
    startConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(`${this.env.apiUrl}/signalr`, { accessTokenFactory: () => localStorage.getItem('tokenKey') })
            .build();

        this.hubConnection.start().then(() => {
            console.log('Connected!');
        }).catch((err) => {
            console.log('error connect');
            // this.stopConnection();
            // setTimeout(() => this.startConnection(), 1000);
        });

        this.hubConnection.onclose(() => {
            console.log('disconnected');
            // this.stopConnection();
            // setTimeout(() => this.startConnection(), 1000);
        });
    }

    stopConnection() {
        this.hubConnection.stop().then(() => {
            console.log('Stop Connection!');
            localStorage.removeItem('tokenKey');
            this.authService.decodedToken = null;
            // const apiURL = location.origin + '/dang-nhap';
            // const link = document.createElement('a');
            // link.href = apiURL;
            // link.click();
        }).catch((err) => {
            console.log('error stop');
        });
    }

    sendMessage(params: any) {
        this.hubConnection.invoke('sendMessage', params)
            .catch(err => console.error(err));
    }

    receiveCanhBao(okCallBack: (value: any) => any) {
        this.hubConnection.on('receiveCanhBao', (res: any) => {
            okCallBack(res);
        });
    }

    receiveTotalCountNotOpenYetNotify(okCallBack: (value: any) => any) {
        this.hubConnection.on('receiveTotalCountNotOpenYetNotify', (res: any) => {
            okCallBack(res);
        });
    }


    receiveTotalCountHoaDon(okCallBack: (value: any) => any) {
        this.hubConnection.on('receiveTotalCountHoaDon', (res: any) => {
            okCallBack(res);
        });
    }
    public SendNotificationHopDong(user: any, donHangId: string) {
        const actionUser = JSON.parse(localStorage.getItem('currentUser'));
        this.hubConnection.invoke("SendNotificationDonHang", user, donHangId, actionUser).catch(function (err) {
          console.error(err.toString());
        });
      }
}
