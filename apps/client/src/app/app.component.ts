import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { fader } from './route-animations';
import { GlobalService } from './services/global.service';

@Component({
    selector: 'portfolio-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fader]
})
export class AppComponent implements AfterViewInit {
    darkMode = false;
    resizeTimer: string | number | NodeJS.Timeout | undefined;

    constructor(private readonly http: HttpClient, private readonly globalService: GlobalService) {
        if (localStorage.getItem('theme')) {
            this.darkMode = JSON.parse(localStorage.getItem('theme') || '');
            this.globalService.setColorTheme(this.darkMode);
        }

        // this.http.get('api/ping').subscribe((resp) => console.log(resp));
    }

    ngAfterViewInit(): void {
        window.addEventListener('resize', () => {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
        });
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    onThemeToggle(darkMode: boolean): void {
        this.darkMode = !darkMode;
        this.globalService.setColorTheme(this.darkMode);
        localStorage.setItem('theme', JSON.stringify(this.darkMode));
    }
}
