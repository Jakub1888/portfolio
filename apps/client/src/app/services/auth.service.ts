import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@portfolio/interfaces';
import { catchError, map, Observable, of, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = '/api/auth';
    private currentUserSource = new ReplaySubject<any>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private readonly http: HttpClient) {}

    register(model: IUser): Observable<void> {
        return this.http.post(this.authUrl + '/register', model).pipe(
            map((user) => {
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        );
    }

    login(model: IUser): Observable<void> {
        return this.http.post(this.authUrl + '/login', model).pipe(
            map((user) => {
                if (user) {
                    this.setCurrentUser(user);
                }
            }),
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        );
    }

    setCurrentUser(user: any): void {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
    }

    getCurrentUserToken() {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.token : null;
        console.log(token);
        this.currentUserSource.next(token);
    }
}
