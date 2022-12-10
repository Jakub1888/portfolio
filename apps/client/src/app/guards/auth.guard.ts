import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private readonly toastr: ToastrService, private readonly router: Router) {}

    private tokenExpired(token: string) {
        if (token) {
            const expiry = JSON.parse(atob(token?.split('.')[1])).exp;
            return Math.floor(new Date().getTime() / 1000) >= expiry;
        }
        return true;
    }

    canActivate(): Observable<boolean> {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.token : null;
        const isExpired = this.tokenExpired(token);

        if (!isExpired) {
            return of(true);
        }

        this.toastr.error('You are not authenicated');
        this.router.navigateByUrl('/projects/authentication');
        return of(false);
    }
}
