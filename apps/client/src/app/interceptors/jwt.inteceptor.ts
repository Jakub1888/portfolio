import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const tokens = this.authService.userTokens;
        console.log(request);
        if (tokens) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokens.accessToken}`
                }
            });
        }
        return next.handle(request);
    }
}
