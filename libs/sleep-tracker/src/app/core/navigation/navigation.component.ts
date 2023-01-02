import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'st-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    viewingChildRoute = false;

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
