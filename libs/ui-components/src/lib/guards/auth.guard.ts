import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { UserTokens } from '@portfolio/interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly toastr: ToastrService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly http: HttpClient
    ) {}

    async canActivate(): Promise<boolean> {
        let isAuthenticated = false;
        this.authService.isUserLoggedIn().subscribe((resp: boolean) => {
            isAuthenticated = resp;
        });

        if (isAuthenticated) {
            return isAuthenticated;
        }

        const isRefreshSuccess = await this.refreshingTokens();

        if (!isRefreshSuccess) {
            this.toastr.error('You are not authenicated');
            this.router.navigateByUrl('/projects/authentication');
        }

        return isRefreshSuccess;
    }

    private async refreshingTokens(): Promise<boolean> {
        const { userId, refreshToken } = this.authService.userTokens || {};

        if (!refreshToken) {
            return false;
        }
        let isRefreshSuccess: boolean;

        try {
            const response = await lastValueFrom(this.http.post('/api/auth/refreshToken', { refreshToken }));
            const tokenModel = { userId, refreshToken, accessToken: (<UserTokens>response).accessToken };
            this.authService.setUserTokens(tokenModel);
            isRefreshSuccess = true;
        } catch (ex) {
            console.log(ex);
            isRefreshSuccess = false;
        }

        return isRefreshSuccess;
    }
}
