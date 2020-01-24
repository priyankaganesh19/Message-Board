import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'nav',
    template: `
        <mat-toolbar color='primary'>
            <button mat-button routerLink='/'> Message Board</button>
            <button mat-button routerLink='/messages'>Messages</button>
            <span style='flex: 1 1 auto'></span>
            <button mat-button routerLink='/login' *ngIf='!auth.isAuthenticated'>Login</button>
            <button mat-button routerLink='/register' *ngIf='!auth.isAuthenticated'>Register</button>
            <button mat-button routerLink='/user' *ngIf='auth.isAuthenticated'>Welcome {{auth.name}}</button>
            <button mat-button *ngIf='auth.isAuthenticated' (click)='auth.logout()'>Logout</button>
            </mat-toolbar>
    `
})

export class NavComponent {
    constructor(private auth:AuthService) {}

}