import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'portfolio-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
    constructor(
        private readonly element: ElementRef,
        private readonly globalService: GlobalService
    ) {}

    ngAfterViewInit(): void {
        const sectionElements = this.element.nativeElement.querySelectorAll('.hidden');
        const observer = this.globalService.createObserver();

        sectionElements.forEach((el: Element) => observer.observe(el));
    }
}
