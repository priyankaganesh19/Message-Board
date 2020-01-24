import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:63145/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private router: Router) {}

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get tokenHeader() {
        let header = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem(this.TOKEN_KEY));
        return {headers:header};
    }

    login(loginData) {
        this.http.post(this.BASE_URL+'/login', loginData).subscribe(res => {
            this.authenticate(res);
        });
    }

    registerUser(user) {
        delete user.confirmPassword;
        this.http.post(this.BASE_URL+'/register',user).subscribe(res => {
            this.authenticate(res);
        });
    }

    logout() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }

    authenticate(res) {
        let authResponse = res;
        if(!authResponse.token)
            return;
        else {
            localStorage.setItem(this.TOKEN_KEY,authResponse.token.toString());
            localStorage.setItem(this.NAME_KEY,authResponse.firstName.toString());
            this.router.navigate(['/']);
        }
    }
}