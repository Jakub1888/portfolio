import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    createObserver(): IntersectionObserver {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('show', entry.isIntersecting);
            });
        });

        return observer;
    }
}
