import { Component } from '@angular/core';

export const socials = [
    {
        link: 'https://github.com/Jakub1888',
        label: 'GitHub'
    },
    {
        link: 'https://www.linkedin.com/in/jakub-kras%C5%88an-802a04248/',
        label: 'LinkedIn'
    },
    {
        link: 'https://medium.com/@krasnan.jk',
        label: 'Medium'
    },
    {
        link: 'https://www.instagram.com/',
        label: 'Instagram'
    }
];

@Component({
    selector: 'portfolio-socials',
    templateUrl: './socials.component.html',
    styleUrls: ['./socials.component.scss']
})
export class SocialsComponent {
    socials;
    constructor() {
        this.socials = socials;
    }
}
