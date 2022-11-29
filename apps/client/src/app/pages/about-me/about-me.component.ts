import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Book, Logo } from '@portfolio/interfaces';
import { GlobalService } from '../../services/global.service';
import { books, logos } from '../static-lists';

@Component({
    selector: 'portfolio-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements AfterViewInit {
    logos: Logo[];
    books: Book[];

    constructor(
        private readonly element: ElementRef,
        private readonly globalService: GlobalService
    ) {
        this.logos = logos;
        this.books = books;
    }

    ngAfterViewInit(): void {
        const sectionElements =
            this.element.nativeElement.querySelectorAll('.hidden');
        const observer = this.globalService.createObserver();

        sectionElements.forEach((el: Element) => observer.observe(el));
    }
}
