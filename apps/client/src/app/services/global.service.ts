import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    private readonly _colorTheme = new BehaviorSubject<boolean>(false);    

    getColorTheme(): Observable<boolean> {
        return this._colorTheme.asObservable();
    }

    setColorTheme(darkTheme: boolean) {
        this._colorTheme.next(darkTheme);
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
