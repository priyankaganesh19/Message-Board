import { Component } from '@angular/core';
import { WebService } from '../services/web.service';

@Component({
    selector: 'user',
    template: `
            <mat-card class='card'>
            <mat-card-content>
                <mat-form-field>
                    <input matInput placeholder="First Name" [(ngModel)]='model.firstName'>
                </mat-form-field>
                <mat-form-field>
                    <input matInput placeholder="Last Name" [(ngModel)]='model.lastName'>
                </mat-form-field>
                <mat-card-actions>
                    <button mat-button color='primary' (click)='post()'>POST</button>
                </mat-card-actions>
            </mat-card-content>
        </mat-card>
    `
})

export class UserComponent {

    constructor(private webService: WebService) {}

    model = {
        firstName: '',
        lastName: ''
    }

    ngOnInit() {
        this.webService.getUser().subscribe( (res:any) => {
            this.model.firstName = res.firstName;
            this.model.lastName = res.lastName;
        });
    }

    post() {
        this.webService.saveUser(this.model).subscribe();
    }

}