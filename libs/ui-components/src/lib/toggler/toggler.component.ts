import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'portfolio-toggler',
    template: `
        <input
            (ngModelChange)="onThemeToggle()"
            [(ngModel)]="model"
            type="checkbox"
            id="switch"
        /><label for="switch">Toggle</label>
    `,
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
