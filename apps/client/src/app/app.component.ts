import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, GlobalService } from '@portfolio/ui-components';
import { slider } from './route-animations';

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
            </main>
        </div>
    `
})
export class AppComponent implements AfterViewInit {
    darkMode = false;
    resizeTimer: string | number | NodeJS.Timeout | undefined;

    constructor(private readonly globalService: GlobalService, private readonly authService: AuthService) {
        if (localStorage.getItem('theme')) {
            this.darkMode = JSON.parse(localStorage.getItem('theme') || '');
            this.globalService.setColorTheme(this.darkMode);
        }

        this.globalService.colorTheme$.subscribe((theme: boolean) => {
            this.darkMode = theme;
        });

        this.authService.refreshToken().subscribe();
    }

    ngAfterViewInit(): void {
        this.preventAnimationsOnWindowResize();
    }

    private preventAnimationsOnWindowResize(): void {
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
