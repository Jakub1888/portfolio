import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { fader } from './route-animations';

@Component({
    selector: 'portfolio-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fader],
})
export class AppComponent {
    darkMode = true;

    constructor(private readonly http: HttpClient) {
        if (localStorage.getItem('theme')) {
            this.darkMode = JSON.parse(localStorage.getItem('theme') || '');
        }

        this.http.get('/api').subscribe((resp) => console.log(resp));
    }

    prepareRoute(outlet: RouterOutlet) {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData['animation']
        );
    }

    onThemeToggle(): void {
        this.darkMode = !this.darkMode;
        localStorage.setItem('theme', JSON.stringify(this.darkMode));
    }
}
