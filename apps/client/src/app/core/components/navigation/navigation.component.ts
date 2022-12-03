import { Component } from '@angular/core';
import { Link } from '@portfolio/interfaces';
import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'portfolio-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    darkMode = false;
    navList: Link[];

    constructor(private readonly globalService: GlobalService) {
        this.navList = [
            {
                title: 'About Me',
                routerLink: 'about-me',
                class: 'navLink'
            },
            {
                title: 'Projects',
                routerLink: 'projects',
                class: 'navLink'
            },
            {
                title: 'Contact',
                routerLink: '#',
                class: 'navLink'
            }
        ];
    }

    onThemeToggle(darkMode: boolean): void {
        this.darkMode = !darkMode;
        this.globalService.setColorTheme(this.darkMode);
        localStorage.setItem('theme', JSON.stringify(this.darkMode));
    }
}
