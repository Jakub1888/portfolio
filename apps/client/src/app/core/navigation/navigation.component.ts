import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '@portfolio/interfaces';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'portfolio-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    darkMode = false;
    navList: Link[];

    constructor(
        private readonly globalService: GlobalService,
        private readonly authService: AuthService,
        private readonly toastr: ToastrService,
        private readonly router: Router
    ) {
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

    logout(): void {
        if (this.authService.userTokens) {
            this.authService.logout().subscribe((resp) => {
                this.toastr.success(resp.message);
                this.router.navigateByUrl('/projects');
            });
        }
    }

    onThemeToggle(darkMode: boolean): void {
        this.darkMode = !darkMode;
        this.globalService.setColorTheme(this.darkMode);
        localStorage.setItem('theme', JSON.stringify(this.darkMode));
    }
}
