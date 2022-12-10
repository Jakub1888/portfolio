import { Component, ViewEncapsulation, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonProps } from '@portfolio/interfaces';

@Component({
    selector: 'button[button], a[button]',
    standalone: true,
    imports: [CommonModule],
    template: `
        <span class="button__wrapper" [class.button__wrapper__icon-left]="iconAlign === 'left'">
            <ng-content></ng-content>
            <ng-content select="icon"></ng-content>
        </span>
    `,
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements ButtonProps {
    @Input() iconAlign: 'left' | 'right' = 'left';

    @Input() color!: 'primary' | 'secondary';

    @Input()
    set outline(value: boolean) {
        this._outline = value !== null && `${value}` !== 'false';
    }

    @HostBinding('class.button')
    _button = true;

    @HostBinding('class.button--outline')
    _outline = false;

    @HostBinding('class.button--primary')
    get light(): boolean {
        return this.color === 'primary';
    }

    @HostBinding('class.button--secondary')
    get dark(): boolean {
        return this.color === 'secondary';
    }
}
