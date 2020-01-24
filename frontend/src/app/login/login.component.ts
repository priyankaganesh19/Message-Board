import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'login',
    template: `
        <mat-card>
        <mat-form-field>
            <input matInput style='width:350px;' [(ngModel)]='loginData.email' placeholder="Email" type='email'>
        </mat-form-field>
        <mat-form-field>
            <input matInput style='width:350px;' [(ngModel)]='loginData.password' placeholder="Password" type='password'>
        </mat-form-field>
        <br>
        <button mat-raised-button color='primary' (click) = 'login()'>Login</button>
        </mat-card>
    `
})

export class LoginComponent {
    constructor(private auth: AuthService) {}

    loginData = {
        email:'',
        password: ''
    }

    login() {
        this.auth.login(this.loginData);
    }
}