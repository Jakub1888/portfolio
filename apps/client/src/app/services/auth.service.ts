import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@portfolio/interfaces';
import { map, Observable, of, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = '/api/auth';
    private _currentUserSource = new ReplaySubject<any>(1);
    currentUser$ = this._currentUserSource.asObservable();

    constructor(private readonly http: HttpClient) {}

    register(userCredentials: User): Observable<void> {
        return this.http.post(this.authUrl + '/register', userCredentials).pipe(
            map((user) => {
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        );
    }

    login(userCredentials: User): Observable<void> {
        return this.http.post(this.authUrl + '/login', userCredentials).pipe(
            map((user) => {
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        );
    }

    setCurrentUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
        this._currentUserSource.next(user);
    }

    isUserLoggedIn(): Observable<boolean> {
        const token = this.getCurrentUserToken();
        const isExpired = this.tokenExpired(token);

        if (!isExpired) {
            return of(true);
        }

        return of(false);
    }

    getCurrentUserToken(): any {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.token : null;
        this._currentUserSource.next(token);
        return token;
    }

    private tokenExpired(token: string): boolean {
        if (token) {
            const expiry = JSON.parse(atob(token?.split('.')[1])).exp;
            return Math.floor(new Date().getTime() / 1000) >= expiry;
        }
        return true;
    }
}
