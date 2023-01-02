import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { GlobalService } from '@portfolio/ui-components';

@Component({
    selector: 'portfolio-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    darkTheme = false;

    constructor(private readonly globalService: GlobalService, private readonly cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.globalService.colorTheme$.subscribe((theme: boolean) => {
            this.darkTheme = theme;
        });

        this.cdr.detectChanges();
    }
}
