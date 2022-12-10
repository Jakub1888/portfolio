import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    private readonly _colorThemeSource = new BehaviorSubject<boolean>(false);
    colorTheme$ = this._colorThemeSource.asObservable();

    setColorTheme(darkTheme: boolean): void {
        this._colorThemeSource.next(darkTheme);
    }

    createObserver(): IntersectionObserver {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('show', entry.isIntersecting);
            });
        });

        return observer;
    }
}
