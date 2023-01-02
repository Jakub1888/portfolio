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
    refreshTokenTimeout!: any;

    constructor(private readonly http: HttpClient) {}

    get userTokens(): UserTokens {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
    }

    register(userCredentials: UserAuth): Observable<void> {
        return this.http.post<UserTokens>(this.authUrl + '/register', userCredentials).pipe(
            map((userTokens: UserTokens) => {
                if (userTokens) {
                    this.setUserTokens(userTokens);
                    this.startRefreshTokenTimer();
                }
            })
        );
    }

    login(userCredentials: UserAuth): Observable<void> {
        return this.http.post<UserTokens>(this.authUrl + '/login', userCredentials).pipe(
            map((userTokens: UserTokens) => {
                if (userTokens) {
                    this.setUserTokens(userTokens);
                    this.startRefreshTokenTimer();
                }
            })
        );
    }

    refreshToken(): Observable<unknown> {
        const tokens = this.userTokens;
        if (!tokens) {
            return of({});
        }

        return this.http.post(this.authUrl + '/refreshToken', { refreshToken: tokens?.refreshToken }).pipe(
            map((token: any) => {
                const { userId, refreshToken } = this.userTokens || {};
                const tokenModel = { userId, refreshToken, accessToken: token.accessToken };

                this.setUserTokens(tokenModel);
                this.startRefreshTokenTimer();
                return token;
            })
        );
    }

    logout(): Observable<any> {
        if (this.userTokens) {
            localStorage.removeItem('user');
        }
        this.stopRefreshTokenTimer();
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

    private startRefreshTokenTimer(): void {
        const tokens = this.userTokens;
        const expiry = JSON.parse(window.atob(tokens?.accessToken.split('.')[1])).exp;

        const expires = new Date(expiry * 1000);
        const timeout = expires.getTime() - Date.now() - 60 * 1000;
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer(): void {
        clearTimeout(this.refreshTokenTimeout);
    }
}
