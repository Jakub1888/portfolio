import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';
import { GlobalService } from './services/global.service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'portfolio-root',
    styleUrls: ['./app.component.scss'],
    animations: [slider],
    template: `
        <div class="overlay">
            <main class="content {{ darkMode ? 'dark-mode' : 'light-mode' }}">
                <portfolio-navigation></portfolio-navigation>

                <!--[@routeAnimations]="prepareRoute(outlet)" -->
                <router-outlet #outlet="outlet"></router-outlet>
                <portfolio-socials></portfolio-socials>
                <hr />
            </main>
        </div>
    `
})
export class AppComponent implements AfterViewInit {
    darkMode = false;
    resizeTimer: string | number | NodeJS.Timeout | undefined;

    constructor(
        private readonly http: HttpClient,
        private readonly globalService: GlobalService,
        private readonly authService: AuthService
    ) {
        if (localStorage.getItem('theme')) {
            this.darkMode = JSON.parse(localStorage.getItem('theme') || '');
            this.globalService.setColorTheme(this.darkMode);
        }

        this.globalService.getColorTheme().subscribe((theme: boolean) => {
            this.darkMode = theme;
        });
    }

    ngAfterViewInit(): void {
        this.preventAnimationsOnWindowResize();
    }

    preventAnimationsOnWindowResize(): void {
        window.addEventListener('resize', () => {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
        });
    }

    prepareRoute(outlet: RouterOutlet): void {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
