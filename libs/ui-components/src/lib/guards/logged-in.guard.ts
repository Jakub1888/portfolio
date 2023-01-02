import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    isNotLoggedIn = true;

    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    canActivate(): boolean {
        this.authService.isUserLoggedIn().subscribe((resp: boolean) => {
            if (resp) {
                this.router.navigateByUrl('');
            }
            this.isNotLoggedIn = !resp;
        });

        return this.isNotLoggedIn;
    }
}
