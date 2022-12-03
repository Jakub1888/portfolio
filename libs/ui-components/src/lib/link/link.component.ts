import { Component, Input } from '@angular/core';
import { Link } from '@portfolio/interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule, CommonModule],
    selector: 'portfolio-link',
    styleUrls: ['./link.component.scss'],
    template: `
        <a
            *ngIf="link.routerLink"
            routerLink="{{ link.routerLink }}"
            class="link {{ link.class }}"
            routerLinkActive="active-route"
        >
            {{ link.title }}
        </a>

        <a
            *ngIf="link.href"
            href="{{ link.href }}"
            class="link {{ link.class }}"
            target="_blank"
            rel="noopener noreferrer"
        >
            {{ link.title }}
        </a>
    `
})
export class LinkComponent {
    @Input() link!: Link;
}
