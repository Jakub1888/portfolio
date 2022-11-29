import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'portfolio-toggler',
    templateUrl: './toggler.component.html',
    styleUrls: ['./toggler.component.scss']
})
export class TogglerComponent {
    @Input() model = false;
    @Output() themeToggle = new EventEmitter<boolean>();

    constructor() {
        if (localStorage.getItem('theme')) {
            this.model = JSON.parse(localStorage.getItem('theme') || '');
        }
    }

    onThemeToggle(): void {
        this.themeToggle.emit(this.model);
    }
}
