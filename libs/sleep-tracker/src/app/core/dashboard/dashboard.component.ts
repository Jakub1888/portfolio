import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'st-home',
    template: `
        <section class="sleep-tracker">
            <div class="wrapper">
                <st-navigation></st-navigation>
                <div class="tracker-intro" *ngIf="!viewingChildRoute">
                    <h1 class="tracker-heading">Sleep Tracker App</h1>

                    <p class="tracker-intro">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat sem eu enim sagittis
                        laoreet.
                    </p>

                    <button button color="primary" type="button" [routerLink]="[{ outlets: { st: ['form'] } }]">
                        How did you sleep tonight?
                    </button>
                </div>

                <router-outlet name="st"></router-outlet>
            </div>
        </section>
    `,
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    viewingChildRoute!: boolean;

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        this.viewingChildRoute = this.router.url.search('st:') !== -1;

        this.router.events.subscribe((event: Event): void => {
            if (event instanceof NavigationEnd) {
                const url = event.url;
                this.viewingChildRoute = url.search('st:') !== -1;
            }
        });
    }
}
