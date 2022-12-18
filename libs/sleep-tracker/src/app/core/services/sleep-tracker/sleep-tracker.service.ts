import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SleepData } from '@portfolio/interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SleepTrackerService {
    constructor(private readonly http: HttpClient) {}

    postSleepData(sleepData: any): Observable<void> {
        return this.http.post('/api/sleepData/create', sleepData).pipe(map((data) => console.log(data)));
    }
}
