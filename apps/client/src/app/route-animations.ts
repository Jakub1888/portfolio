import {
    animate,
    group,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', opacity: 1 }), {
            optional: true,
        }),
        group([
            query(
                ':enter',
                [
                    style({ opacity: 0 }),
                    animate('1200ms ease-in-out', style({ opacity: 1 })),
                ],
                { optional: true }
            ),
            query(
                ':leave',
                [
                    style({ opacity: 1 }),
                    animate('800ms ease-in-out', style({ opacity: 0 })),
                ],
                { optional: true }
            ),
        ]),
    ]),
]);
