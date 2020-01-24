import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable()
export class WebService {
    constructor(private http:HttpClient, private sb: MatSnackBar, private auth:AuthService) {
        this.getMessages();
    }

    BASE_URL = 'http://localhost:63145/api';
    
    private messageStore:any = [];

    private messageSubject = new Subject();

    messages = this.messageSubject.asObservable();

    getMessages(user?) {
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL+'/messages'+user).subscribe(response => {
            this.messageStore = response;
            this.messageSubject.next(this.messageStore);
        }, error => {
            this.handleError('Unable to get messages');
        });
    }

    async postMessage(message){
        try {
            let response = await this.http.post(this.BASE_URL+'/messages', message).toPromise();
            this.messageStore.push(response);
            this.messageSubject.next(this.messageStore);
        } catch (error) {
            this.handleError('Unable to post any message');
        }
    }

    getUser() {
        let options = this.auth.tokenHeader;
        return this.http.get(this.BASE_URL+'/users/me',options);
    }

    saveUser(userData) {
        let options = this.auth.tokenHeader;
        return this.http.post(this.BASE_URL+'/users/me',userData,options);
    }

    private handleError(error) {
        this.sb.open(error,'close',{duration:2000});
    }
}