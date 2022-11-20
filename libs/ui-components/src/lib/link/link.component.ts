import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { Link } from '@portfolio/interfaces';

@Component({
    selector: 'portfolio-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
    @Input() link!: Link;
}
