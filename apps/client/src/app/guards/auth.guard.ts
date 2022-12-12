import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isAuthenticated = false;

    constructor(
        private readonly toastr: ToastrService,
        private readonly router: Router,
        private readonly authService: AuthService
    ) {}

    canActivate(): boolean {
        this.authService.isUserLoggedIn().subscribe((resp: boolean) => {
            this.isAuthenticated = resp;
            console.log(this.isAuthenticated);
        });
        if (!this.isAuthenticated) {
            this.toastr.error('You are not authenicated');
            this.router.navigateByUrl('/projects/authentication');
        }
        return this.isAuthenticated;
    }
}
