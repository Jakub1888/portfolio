import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './modules/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './modules/components.module';
import { JwtInterceptor } from './interceptors/jwt.inteceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { GlobalService } from '@portfolio/ui-components';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        ComponentsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent],
    providers: [
        GlobalService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class AppModule {}
