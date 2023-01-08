import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    navigationExtras!: NavigationExtras;
    constructor(private router: Router, private toastr: ToastrService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error) {
                    switch (error.status) {
                        case 400:
                            if (error.error.error.message !== 'Invalid refresh token') {
                                if (typeof error.error === 'object') {
                                    this.toastr.error(error.statusText, error.status);
                                } else {
                                    this.toastr.error(error.error, error.status);
                                }
                            }
                            break;
                        case 401:
                        case 500:
                            console.log(error);
                            this.toastr.error(error.error.message, `${error.status}: ${error.statusText}`);
                            break;
                        case 404:
                            if (error.error.message !== 'Sleep data for selected date was not found.')
                                this.router.navigateByUrl('/not-found');
                            break;
                        case 409:
                            this.toastr.error(error.error.message, `${error.status}: ${error.statusText}`);
                            break;
                        case 422:
                            this.toastr.error(`${error.error.error.details[0].message}`);
                            break;
                        default:
                            this.toastr.error('Something unexpected went wrong');
                            console.log(error);
                            break;
                    }
                }
                return throwError(() => new Error(error));
            })
        );
    }
}
