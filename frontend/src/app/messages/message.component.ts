import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'messages',
    template: `
    <div *ngFor="let message of webService.messages | async">
        <mat-card class='card'>
            <mat-card-header>
               <mat-card-title style='cursor:pointer' [routerLink]="['/messages', message.name]"> {{message.name}} </mat-card-title> 
            </mat-card-header>
            <mat-card-content>
                {{message.text}}
            </mat-card-content>
        </mat-card>
    </div>`
})

export class MessageComponent {

    constructor(private webService: WebService, private route: ActivatedRoute) {}

    ngOnInit() {
        let user = this.route.snapshot.params.name;
        this.webService.getMessages(user);
        this.webService.getUser().subscribe();
    }

}