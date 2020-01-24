import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'new-message',
    template: `
                <mat-card class='card'>
                    <mat-card-content>
                        <mat-form-field>
                            <textarea matInput placeholder="Message" [(ngModel)]='message.text'></textarea>
                        </mat-form-field>
                        <mat-card-actions>
                            <button mat-button color='primary' (click)='post()'>POST</button>
                        </mat-card-actions>
                    </mat-card-content>
                </mat-card>
    `
})

export class NewMessageComponent {

    constructor(private webService: WebService, private auth:AuthService) {}

    message = {
        text: '',
        name: this.auth.name
    }

    post() {
        this.webService.postMessage(this.message);
    }

}