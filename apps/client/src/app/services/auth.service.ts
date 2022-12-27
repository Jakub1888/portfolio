import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth, UserTokens } from '@portfolio/interfaces';
import { map, Observable, of, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = '/api/auth';
    private _currentUserSource = new ReplaySubject<UserTokens>(1);
    currentUser$ = this._currentUserSource.asObservable();

    constructor(private readonly http: HttpClient) {}

    register(userCredentials: UserAuth): Observable<void> {
        return this.http.post<UserTokens>(this.authUrl + '/register', userCredentials).pipe(
            map((userTokens: UserTokens) => {
                if (userTokens) {
                    this.setUserTokens(userTokens);
                }
            })
        );
    }

    login(userCredentials: UserAuth): Observable<void> {
        return this.http.post<UserTokens>(this.authUrl + '/login', userCredentials).pipe(
            map((userTokens: UserTokens) => {
                if (userTokens) {
                    this.setUserTokens(userTokens);
                }
            })
        );
    }

    refreshToken(token: string): Observable<any> {
        return this.http.post(this.authUrl + '/refreshToken', token);
    }

    logout(): Observable<any> {
        if (this.userTokens) {
            localStorage.removeItem('user');
        }
        return this.http.delete(this.authUrl + '/logout');
    }

    setUserTokens(userTokens: UserTokens): void {
        localStorage.setItem('user', JSON.stringify(userTokens));
        this._currentUserSource.next(userTokens);
    }

    isUserLoggedIn(): Observable<boolean> {
        const isExpired = this.tokenExpired();

        if (!isExpired) {
            return of(true);
        }

        return of(false);
    }

    private tokenExpired(): boolean {
        const tokens = this.userTokens;

        if (tokens) {
            const expiry = JSON.parse(window.atob(tokens?.accessToken.split('.')[1])).exp;
            return Math.floor(new Date().getTime() / 1000) >= expiry;
        }
        return true;
    }

    get userTokens(): UserTokens {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
    }
}
