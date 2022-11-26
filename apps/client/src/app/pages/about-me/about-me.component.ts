import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'portfolio-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements AfterViewInit {
    logos: { title: string }[] = [
        { title: 'TypeScript' },
        { title: 'Angular' },
        { title: 'Node.js' },
        { title: 'MongoDB' },
        { title: 'GraphQl' },
        { title: 'Jest' },
    ];

    constructor(
        private readonly element: ElementRef,
        private readonly globalService: GlobalService
    ) {}

    ngAfterViewInit(): void {
        const sectionElements =
            this.element.nativeElement.querySelectorAll('.hidden');
        const observer = this.globalService.createObserver();

        sectionElements.forEach((el: Element) => observer.observe(el));
    }
}
