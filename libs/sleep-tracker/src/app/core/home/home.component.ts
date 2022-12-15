import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'st-home',
    template: `
        <section>
            <div class="wrapper">
                <st-navigation></st-navigation>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam neque at finibus faucibus.
                    Quisque ut libero dui. Aenean sed dignissim ipsum, eget ultrices ipsum. Nulla leo leo, faucibus
                    vitae dui eget, auctor sagittis nibh. Donec dignissim a est in tincidunt. Integer pharetra ante
                    pulvinar efficitur sollicitudin. Vivamus sollicitudin ex et nibh mollis sagittis.
                </p>
                <!-- <button [routerLink]="[{ outlets: { sleepTracker: ['test'] } }]">xd</button> -->

                <router-outlet name="sleepTracker"></router-outlet>
            </div>
        </section>
    `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
