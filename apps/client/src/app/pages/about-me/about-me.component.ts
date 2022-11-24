import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'portfolio-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements AfterViewInit {
    constructor(private readonly element: ElementRef) {}

    ngAfterViewInit(): void {
        const sectionElements =
            this.element.nativeElement.querySelectorAll('.hidden');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('show', entry.isIntersecting);
            });
        });

        sectionElements.forEach((el: Element) => observer.observe(el));
    }
}
