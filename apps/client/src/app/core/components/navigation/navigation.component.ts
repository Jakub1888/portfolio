import { Component } from '@angular/core';
import { Link } from '@portfolio/interfaces';

@Component({
    selector: 'portfolio-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    navList: Link[];

    constructor() {
        this.navList = [
            {
                title: 'About Me',
                routerLink: 'about-me',
                class: 'navLink',
            },
            {
                title: 'Projects',
                routerLink: 'projects',
                class: 'navLink',
            },
            {
                title: 'Experiences',
                routerLink: '#',
                class: 'navLink',
            },
            {
                title: 'Contact',
                routerLink: '#',
                class: 'navLink',
            },
        ];
    }
}
