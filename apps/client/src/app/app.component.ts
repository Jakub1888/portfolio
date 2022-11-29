import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { fader } from './route-animations';

@Component({
    selector: 'portfolio-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fader]
})
export class AppComponent implements AfterViewInit {
    darkMode = true;
    resizeTimer: string | number | NodeJS.Timeout | undefined;

    constructor(private readonly http: HttpClient, private elem: ElementRef) {
        if (localStorage.getItem('theme')) {
            this.darkMode = JSON.parse(localStorage.getItem('theme') || '');
        }

        this.http.get('api/ping').subscribe((resp) => console.log(resp));
    }

    ngAfterViewInit(): void {
        window.addEventListener('resize', () => {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
        });

        const cursor = this.elem.nativeElement.querySelector('.cursor');

        document.addEventListener('mousemove', (e) => {
            cursor.setAttribute(
                'style',
                'top: ' + (e.pageY - 28) + 'px; left: ' + (e.pageX - 28) + 'px;'
            );
        });

        document.addEventListener('click', () => {
            cursor.classList.add('expand');

            setTimeout(() => {
                cursor.classList.remove('expand');
            }, 500);
        });
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    onThemeToggle(): void {
        this.darkMode = !this.darkMode;
        localStorage.setItem('theme', JSON.stringify(this.darkMode));
    }
}
